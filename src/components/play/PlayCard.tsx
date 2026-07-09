"use client";

import Image from "next/image";
import type { PlayCardData } from "@/lib/play-cards";
import type { CardState } from "@/context/OverlayContext";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

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

function CardPlusButton({
  onClick,
  className = "",
}: {
  onClick: (event: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Expand card"
      className={`flex size-[26px] shrink-0 items-center justify-center rounded-sm text-white/60 backdrop-blur-[40px] transition-colors hover:bg-white/10 hover:text-white ${className}`}
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  );
}

function CardHeading({ card }: { card: PlayCardData }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 whitespace-nowrap">
      <p className="shrink-0 font-mono text-[11px] uppercase leading-none text-white">
        {card.category}
      </p>
      <p className="truncate text-[15px] leading-[1.25] text-[#989898]">
        {card.tools}
      </p>
    </div>
  );
}

function CardHeaderRow({
  card,
  onPlusClick,
}: {
  card: PlayCardData;
  onPlusClick: (event: React.MouseEvent) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className="min-w-0 flex-1">
        <CardHeading card={card} />
      </div>
      <CardPlusButton onClick={onPlusClick} />
    </div>
  );
}

function CardCopy({
  card,
  className = "",
}: {
  card: PlayCardData;
  className?: string;
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col justify-between pb-1 pr-2 pt-1 ${className}`}
    >
      <div className="min-w-0 text-[15px] leading-[1.25]">
        <p className="truncate text-white">{card.title}</p>
        <p className="truncate text-[#989898]">{card.subtitle}</p>
      </div>
      <p className="font-mono text-[9px] uppercase leading-none tracking-[-0.18px] text-[#989898]">
        {card.author}
      </p>
    </div>
  );
}

function CardImage({ src }: { src: string }) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden rounded-md bg-gradient-to-b from-[rgba(6,6,6,0.3)] to-[#060606]">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}

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
  const isRest = !isExpanded && !isMinimized;

  const cardWidth = isExpanded
    ? Math.max(card.width, 464) * zoom
    : isMinimized
      ? Math.max(card.width, 464) * zoom
      : card.width * zoom;

  const cardHeight = isExpanded
    ? Math.max(card.height + 180, 420) * zoom
    : isMinimized
      ? 92 * zoom
      : card.height * zoom;

  const shadowClass = isMoving
    ? "shadow-[-5px_8px_16px_rgba(0,0,0,0.35)]"
    : isExpanded
      ? "shadow-[-7px_4px_6px_rgba(0,0,0,0.25)]"
      : isMinimized
        ? "shadow-[-5px_3px_7.3px_rgba(0,0,0,0.25)]"
        : "shadow-[-7px_-4px_6px_rgba(0,0,0,0.25)]";

  const handlePlusClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <article
      className={`absolute cursor-grab select-none overflow-hidden rounded bg-[#141414] transition-[opacity,box-shadow] duration-300 active:cursor-grabbing ${shadowClass} ${
        isExpanded
          ? "z-30 ring-1 ring-white/20"
          : isHovered
            ? "z-20 ring-1 ring-white/10"
            : "z-10"
      }`}
      style={{
        left: card.x * zoom,
        top: card.y * zoom,
        width: cardWidth,
        height: cardHeight,
        opacity: isMinimized ? 0.85 : 1,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      onPointerDown={onDragStart}
      aria-expanded={isExpanded}
      aria-label={isRest ? `${card.category} ${card.tools}` : card.title}
    >
      {isMinimized ? (
        <div className="relative flex h-full items-center gap-4 px-4 py-4 pr-9">
          <div className="relative size-[90px] shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-[rgba(6,6,6,0.3)] to-[#060606]">
            <Image
              src={card.image}
              alt=""
              fill
              className="object-cover"
              draggable={false}
            />
          </div>
          <CardCopy card={card} className="h-16" />
          <CardPlusButton
            onClick={handlePlusClick}
            className="absolute right-4 top-4"
          />
        </div>
      ) : isExpanded ? (
        <div className="flex h-full flex-col gap-8 py-4 pl-4 pr-9">
          <CardHeaderRow card={card} onPlusClick={handlePlusClick} />
          <CardImage src={card.image} />
          <div className="relative shrink-0 rounded-md bg-[#141414] py-1.5 pl-1.5 pr-6">
            <div className="flex items-center gap-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
              <CardCopy card={card} className="h-16" />
            </div>
            {isActive && (
              <button
                type="button"
                aria-label="Minimize card"
                className="absolute right-0 top-0 flex size-[26px] items-center justify-center text-white/50 transition-colors hover:text-white"
                onClick={handlePlusClick}
              >
                <MinusIcon />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-4 py-4 pl-4 pr-9">
          <CardHeaderRow card={card} onPlusClick={handlePlusClick} />
          <CardImage src={card.image} />
        </div>
      )}
    </article>
  );
}
