"use client";

import Image from "next/image";
import type { PlayCardData } from "@/lib/play-cards";
import type { CardState } from "@/context/OverlayContext";

type PlayCardProps = {
  card: PlayCardData;
  state: CardState;
  isActive: boolean;
  zoom: number;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  onDragStart: (event: React.PointerEvent) => void;
};

export function PlayCard({
  card,
  state,
  isActive,
  zoom,
  onHover,
  onLeave,
  onClick,
  onDragStart,
}: PlayCardProps) {
  const isExpanded = state === "expand";
  const isMinimized = state === "minimize";
  const isMoving = state === "move";
  const isHovered = state === "hover";

  const scale = isExpanded ? 1.05 : isMinimized ? 0.85 : 1;
  const opacity = isMinimized ? 0.6 : 1;

  return (
    <article
      className={`absolute cursor-grab select-none overflow-hidden rounded bg-[#141414] shadow-lg transition-[transform,opacity,box-shadow] duration-300 active:cursor-grabbing ${
        isExpanded ? "z-30 ring-1 ring-white/20" : isHovered ? "z-20" : "z-10"
      } ${isMoving ? "shadow-2xl" : ""}`}
      style={{
        left: card.x * zoom,
        top: card.y * zoom,
        width: card.width * zoom,
        height: isMinimized ? 64 * zoom : card.height * zoom,
        transform: `scale(${scale})`,
        opacity,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      onPointerDown={onDragStart}
      aria-expanded={isExpanded}
    >
      {!isMinimized && (
        <>
          <header className="flex items-center justify-between px-3 py-2">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wide text-[#989898]">
                {card.category}
              </p>
              <p className="text-[11px] text-[#ccc]">{card.tools}</p>
            </div>
            <button
              type="button"
              aria-label="Expand card"
              className="flex size-6 items-center justify-center rounded-sm text-white/60 hover:bg-white/10 hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                onClick();
              }}
            >
              +
            </button>
          </header>

          <div className="relative mx-3 mb-3 flex-1 overflow-hidden rounded-sm bg-[#202020]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      )}

      <footer
        className={`flex items-center gap-3 px-3 ${isMinimized ? "py-3" : "pb-3"}`}
      >
        {!isMinimized && (
          <div className="size-8 shrink-0 rounded bg-white/10" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{card.title}</p>
          {!isMinimized && (
            <>
              <p className="truncate text-xs text-[#989898]">{card.subtitle}</p>
              <p className="mt-1 font-mono text-[9px] uppercase text-[#ccc]">
                {card.author}
              </p>
            </>
          )}
        </div>
        {isActive && !isMinimized && (
          <button
            type="button"
            aria-label="Minimize card"
            className="shrink-0 font-mono text-[9px] uppercase text-white/50 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}
          >
            −
          </button>
        )}
      </footer>
    </article>
  );
}
