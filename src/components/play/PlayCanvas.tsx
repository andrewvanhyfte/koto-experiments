"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playCards } from "@/lib/play-cards";
import {
  clampPlayZoom,
  getInfiniteGridStyle,
  zoomAtPoint,
} from "@/lib/play-canvas";
import { useOverlay } from "@/context/OverlayContext";
import type { CardState } from "@/context/OverlayContext";
import { PlayCard } from "./PlayCard";
import { SidePanel } from "./SidePanel";
import { FilterBar } from "./FilterBar";
import { ZoomControls } from "./ZoomControls";
import { RadarMinimap } from "./RadarMinimap";

function getTouchDistance(touches: TouchList) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

function getTouchMidpoint(touches: TouchList, rect: DOMRect) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
    y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top,
  };
}

const CARD_DRAG_THRESHOLD_PX = 4;

export function PlayCanvas() {
  const {
    zoomLevel,
    panOffset,
    setPanOffset,
    setZoomLevel,
    activeCardId,
    cardStates,
    setActiveCard,
    setCardState,
    widgetOpen,
  } = useOverlay();

  const [positions, setPositions] = useState(
    Object.fromEntries(playCards.map((card) => [card.id, { x: card.x, y: card.y }])),
  );
  const [isPanning, setIsPanning] = useState(false);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoomLevel);
  const panRef = useRef(panOffset);
  const cardDragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    /** Card state before this pointer interaction. */
    prevState: CardState;
    /** True once movement exceeds the drag threshold. */
    didMove: boolean;
    pointerId: number;
  } | null>(null);
  const cardStatesRef = useRef(cardStates);
  cardStatesRef.current = cardStates;
  const panDragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const pinchRef = useRef<{
    startDistance: number;
    startZoom: number;
    startPan: { x: number; y: number };
    focalX: number;
    focalY: number;
  } | null>(null);

  useEffect(() => {
    zoomRef.current = zoomLevel;
  }, [zoomLevel]);

  useEffect(() => {
    panRef.current = panOffset;
  }, [panOffset]);

  const applyZoomAtPoint = useCallback(
    (newZoom: number, focalX: number, focalY: number) => {
      const next = zoomAtPoint(
        zoomRef.current,
        panRef.current,
        newZoom,
        focalX,
        focalY,
      );
      zoomRef.current = next.zoom;
      panRef.current = next.pan;
      setZoomLevel(next.zoom);
      setPanOffset(next.pan);
    },
    [setPanOffset, setZoomLevel],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;

      event.preventDefault();

      const rect = viewport.getBoundingClientRect();
      const focalX = event.clientX - rect.left;
      const focalY = event.clientY - rect.top;
      const scale = Math.exp(-event.deltaY * 0.002);

      applyZoomAtPoint(zoomRef.current * scale, focalX, focalY);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 2) return;

      const rect = viewport.getBoundingClientRect();
      const midpoint = getTouchMidpoint(event.touches, rect);

      pinchRef.current = {
        startDistance: getTouchDistance(event.touches),
        startZoom: zoomRef.current,
        startPan: { ...panRef.current },
        focalX: midpoint.x,
        focalY: midpoint.y,
      };
      panDragRef.current = null;
      cardDragRef.current = null;
      setIsPanning(false);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || !pinchRef.current) return;

      event.preventDefault();

      const distance = getTouchDistance(event.touches);
      const scale = distance / pinchRef.current.startDistance;
      const next = zoomAtPoint(
        pinchRef.current.startZoom,
        pinchRef.current.startPan,
        pinchRef.current.startZoom * scale,
        pinchRef.current.focalX,
        pinchRef.current.focalY,
      );

      zoomRef.current = next.zoom;
      panRef.current = next.pan;
      setZoomLevel(next.zoom);
      setPanOffset(next.pan);
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        pinchRef.current = null;
      }
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd);
    viewport.addEventListener("touchcancel", onTouchEnd);

    return () => {
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [applyZoomAtPoint, setPanOffset, setZoomLevel]);

  const getCardState = useCallback(
    (id: string): CardState => cardStates[id] ?? "rest",
    [cardStates],
  );

  const sidePanelCardId =
    Object.entries(cardStates).find(([, state]) => state === "side-panel")?.[0] ??
    null;
  const sidePanelOpen = sidePanelCardId !== null;
  const sidePanelCard = sidePanelCardId
    ? playCards.find((card) => card.id === sidePanelCardId)
    : undefined;

  /** Advance rest/hover/minimize → expand. Side-panel opens via Explore. */
  const advanceCardInteraction = useCallback(
    (id: string, fromState: CardState) => {
      if (sidePanelOpen) return;
      if (fromState === "expand" || fromState === "side-panel") return;

      setCardState(id, "expand");
      setActiveCard(id);
    },
    [setActiveCard, setCardState, sidePanelOpen],
  );

  const handleCardClick = useCallback(
    (id: string) => {
      // Used by minimized "+" restore — not by card-body clicks.
      advanceCardInteraction(id, getCardState(id));
    },
    [advanceCardInteraction, getCardState],
  );

  const handleOpenSidePanel = useCallback(
    (id: string) => {
      setCardState(id, "side-panel");
      setActiveCard(id);
    },
    [setActiveCard, setCardState],
  );

  const handleCloseSidePanel = useCallback(() => {
    if (!sidePanelCardId) return;
    setCardState(sidePanelCardId, "minimize");
    setActiveCard(null);
  }, [setActiveCard, setCardState, sidePanelCardId]);

  const handleCardMinimize = useCallback(
    (id: string) => {
      setCardState(id, "minimize");
      setActiveCard(null);
    },
    [setActiveCard, setCardState],
  );

  const handleCardPointerDown = useCallback(
    (id: string, event: React.PointerEvent) => {
      if (sidePanelOpen) return;
      if ((event.target as HTMLElement).closest("button")) return;

      event.stopPropagation();

      const pos = positions[id];
      const prevState = getCardState(id);
      cardDragRef.current = {
        id,
        startX: event.clientX,
        startY: event.clientY,
        origX: pos.x,
        origY: pos.y,
        prevState:
          prevState === "move" || prevState === "hover" ? "rest" : prevState,
        didMove: false,
        pointerId: event.pointerId,
      };
      setActiveCard(id);
      // Do not capture yet — capture swallows the click. Capture only after drag.
    },
    [getCardState, positions, setActiveCard, sidePanelOpen],
  );

  const handleViewportPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (pinchRef.current) return;

      if (cardDragRef.current) {
        const drag = cardDragRef.current;
        const screenDx = event.clientX - drag.startX;
        const screenDy = event.clientY - drag.startY;

        if (!drag.didMove) {
          if (Math.hypot(screenDx, screenDy) < CARD_DRAG_THRESHOLD_PX) {
            return;
          }
          drag.didMove = true;
          setDraggingCardId(drag.id);
          viewportRef.current?.setPointerCapture(drag.pointerId);
        }

        setPositions((prev) => ({
          ...prev,
          [drag.id]: {
            x: drag.origX + screenDx / zoomLevel,
            y: drag.origY + screenDy / zoomLevel,
          },
        }));
        return;
      }

      if (!panDragRef.current) return;

      setPanOffset({
        x: panDragRef.current.origX + (event.clientX - panDragRef.current.startX),
        y: panDragRef.current.origY + (event.clientY - panDragRef.current.startY),
      });
    },
    [setPanOffset, zoomLevel],
  );

  const handleViewportPointerUp = useCallback(() => {
    if (cardDragRef.current) {
      const { id, prevState, didMove, pointerId } = cardDragRef.current;
      cardDragRef.current = null;

      if (viewportRef.current?.hasPointerCapture(pointerId)) {
        viewportRef.current.releasePointerCapture(pointerId);
      }

      setDraggingCardId(null);

      if (didMove) {
        // Keep prior card state after a reposition (expand stays expand).
        setCardState(id, prevState);
      } else {
        const live = cardStatesRef.current[id] ?? prevState;
        const fromState =
          live === "hover" || live === "move" ? "rest" : live;
        advanceCardInteraction(id, fromState);
      }
    }

    panDragRef.current = null;
    setIsPanning(false);
  }, [advanceCardInteraction, setCardState]);

  const handleViewportPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (pinchRef.current) return;

      const target = event.target as HTMLElement;
      if (target.closest("article") || target.closest("button")) return;

      panDragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        origX: panOffset.x,
        origY: panOffset.y,
      };
      setIsPanning(true);
      viewportRef.current?.setPointerCapture(event.pointerId);
    },
    [panOffset.x, panOffset.y],
  );

  const gridStyle = getInfiniteGridStyle(zoomLevel, panOffset);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-all duration-500 ${
        widgetOpen ? "scale-[0.98]" : ""
      }`}
    >
      <div
        ref={viewportRef}
        className={`relative h-full touch-none select-none transition-[width] duration-500 ${
          sidePanelOpen ? "w-[38%]" : "w-full"
        } ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handleViewportPointerDown}
        onPointerMove={handleViewportPointerMove}
        onPointerUp={handleViewportPointerUp}
        onPointerCancel={handleViewportPointerUp}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={gridStyle}
          aria-hidden
        />

        <div
          className={`absolute left-0 top-0 origin-top-left will-change-transform ${
            sidePanelOpen ? "blur-[2px]" : ""
          }`}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          }}
        >
          {playCards.map((card) => {
            const pos = positions[card.id];
            const cardWithPos = { ...card, x: pos.x, y: pos.y };

            return (
              <PlayCard
                key={card.id}
                card={cardWithPos}
                state={getCardState(card.id)}
                isActive={activeCardId === card.id}
                isDragging={draggingCardId === card.id}
                forceMinimized={sidePanelOpen}
                onHover={() => {
                  if (sidePanelOpen) return;
                  if (getCardState(card.id) === "rest") {
                    setCardState(card.id, "hover");
                  }
                }}
                onLeave={() => {
                  if (getCardState(card.id) === "hover") {
                    setCardState(card.id, "rest");
                  }
                }}
                onClick={() => handleCardClick(card.id)}
                onMinimize={() => handleCardMinimize(card.id)}
                onOpenSidePanel={() => handleOpenSidePanel(card.id)}
                onDragStart={(event) => handleCardPointerDown(card.id, event)}
                onPointerUp={handleViewportPointerUp}
              />
            );
          })}
        </div>

        {sidePanelOpen ? (
          <div
            className="pointer-events-none absolute inset-0 z-40 bg-black/25"
            aria-hidden
          />
        ) : null}
      </div>

      {sidePanelCard ? (
        <SidePanel card={sidePanelCard} onClose={handleCloseSidePanel} />
      ) : null}

      {!sidePanelOpen ? <FilterBar /> : null}
      <RadarMinimap />
      <ZoomControls />
    </div>
  );
}
