"use client";

import { useCallback, useRef, useState } from "react";
import { playCards } from "@/lib/play-cards";
import { useOverlay } from "@/context/OverlayContext";
import type { CardState } from "@/context/OverlayContext";
import { PlayCard } from "./PlayCard";
import { FilterBar } from "./FilterBar";
import { ZoomControls } from "./ZoomControls";
import { RadarMinimap } from "./RadarMinimap";

export function PlayCanvas() {
  const {
    zoomLevel,
    activeCardId,
    cardStates,
    setActiveCard,
    setCardState,
    widgetOpen,
  } = useOverlay();

  const [positions, setPositions] = useState(
    Object.fromEntries(playCards.map((card) => [card.id, { x: card.x, y: card.y }])),
  );
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);

  const getCardState = useCallback(
    (id: string): CardState => cardStates[id] ?? "rest",
    [cardStates],
  );

  const handleCardClick = useCallback(
    (id: string) => {
      const current = cardStates[id] ?? "rest";
      if (current === "expand") {
        setCardState(id, "minimize");
        setActiveCard(null);
      } else if (current === "minimize") {
        setCardState(id, "rest");
      } else {
        setCardState(id, "expand");
        setActiveCard(id);
      }
    },
    [cardStates, setActiveCard, setCardState],
  );

  const handlePointerDown = useCallback(
    (id: string, event: React.PointerEvent) => {
      if ((event.target as HTMLElement).closest("button")) return;

      const pos = positions[id];
      dragRef.current = {
        id,
        startX: event.clientX,
        startY: event.clientY,
        origX: pos.x,
        origY: pos.y,
      };
      setCardState(id, "move");
      setActiveCard(id);
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    },
    [positions, setActiveCard, setCardState],
  );

  const handlePointerMove = useCallback(
    (id: string, event: React.PointerEvent) => {
      if (!dragRef.current || dragRef.current.id !== id) return;

      const dx = (event.clientX - dragRef.current.startX) / zoomLevel;
      const dy = (event.clientY - dragRef.current.startY) / zoomLevel;

      setPositions((prev) => ({
        ...prev,
        [id]: {
          x: dragRef.current!.origX + dx,
          y: dragRef.current!.origY + dy,
        },
      }));
    },
    [zoomLevel],
  );

  const handlePointerUp = useCallback(
    (id: string) => {
      if (dragRef.current?.id === id) {
        dragRef.current = null;
        const current = cardStates[id] ?? "rest";
        setCardState(id, current === "move" ? "rest" : current);
      }
    },
    [cardStates, setCardState],
  );

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-all duration-500 ${
        widgetOpen ? "scale-[0.98] blur-sm" : ""
      }`}
      style={{
        backgroundColor: "#f5e642",
        backgroundImage:
          "radial-gradient(circle, rgba(6,6,6,0.15) 1px, transparent 1px)",
        backgroundSize: `${24 * zoomLevel}px ${24 * zoomLevel}px`,
      }}
    >
      <div
        className="relative origin-top-left transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})`, width: `${100 / zoomLevel}%`, minHeight: `${100 / zoomLevel}vh` }}
      >
        {playCards.map((card) => {
          const pos = positions[card.id];
          const cardWithPos = { ...card, x: pos.x, y: pos.y };

          return (
            <div
              key={card.id}
              onPointerMove={(event) => handlePointerMove(card.id, event)}
              onPointerUp={() => handlePointerUp(card.id)}
            >
              <PlayCard
                card={cardWithPos}
                state={getCardState(card.id)}
                isActive={activeCardId === card.id}
                zoom={1}
                onHover={() => {
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
                onDragStart={(event) => handlePointerDown(card.id, event)}
              />
            </div>
          );
        })}
      </div>

      <FilterBar />
      <RadarMinimap />
      <ZoomControls />
    </div>
  );
}
