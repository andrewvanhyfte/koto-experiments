"use client";

import Image from "next/image";
import type { PlayCardData } from "@/lib/play-cards";
import type { CardState } from "@/context/OverlayContext";
import {
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/ui/Icons";
import { MediaControls } from "./MediaControls";

export const DEFAULT_CARD_WIDTH = 464;
export const DEFAULT_CARD_HEIGHT = 540;
export const MINIMIZED_CARD_WIDTH = 464;
export const MINIMIZED_CARD_HEIGHT = 122;

type PlayCardProps = {
  card: PlayCardData;
  state: CardState;
  isActive: boolean;
  isDragging?: boolean;
  /** When side-panel is open, all canvas cards render minimized. */
  forceMinimized?: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  onMinimize: () => void;
  onOpenSidePanel: () => void;
  onDragStart: (event: React.PointerEvent) => void;
  onPointerUp?: (event: React.PointerEvent) => void;
};

function cardThumb(card: PlayCardData) {
  return card.thumbImage ?? card.image;
}

function isGifSrc(src: string) {
  return /\.gif($|\?)/i.test(src);
}

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)($|\?)/i.test(src);
}

function isAnimatedSrc(src: string) {
  return isGifSrc(src) || isVideoSrc(src);
}

/** Shared − / + control used in expand header and minimized row. */
function CardIconButton({
  onClick,
  label,
  children,
}: {
  onClick: (event: React.MouseEvent) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-[26px] shrink-0 items-center justify-center rounded-[2px] p-2 text-white/50 backdrop-blur-[40px] mix-blend-exclusion transition-colors hover:text-white"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function CardHeading({ card }: { card: PlayCardData }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 whitespace-nowrap">
      <p className="text-overline-large shrink-0 text-white">{card.category}</p>
      <p className="text-body-small truncate text-[var(--color-grey)]">
        {card.tools}
      </p>
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
      <div className="text-body-small min-w-0">
        <p className="truncate text-white">{card.title}</p>
        <p className="truncate text-[var(--color-grey)]">{card.subtitle}</p>
      </div>
      <p className="text-overline-small text-[var(--color-grey)]">
        {card.author}
      </p>
    </div>
  );
}

function CardImage({ src }: { src: string }) {
  return (
    <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-md bg-gradient-to-b from-[rgba(6,6,6,0.3)] to-[#060606]">
      {isVideoSrc(src) ? (
        <video
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          draggable={false}
        />
      ) : isGifSrc(src) ? (
        // Native <img> — Next/Image freezes GIFs in Chromium.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          draggable={false}
          sizes="464px"
        />
      )}
      <MediaControls />
    </div>
  );
}

function CardFooter({
  card,
  onOpenSidePanel,
}: {
  card: PlayCardData;
  onOpenSidePanel: () => void;
}) {
  return (
    <div className="relative w-full shrink-0 rounded-md bg-[var(--color-off-black)]">
      <button
        type="button"
        aria-label={`Explore ${card.title}`}
        className="group flex w-full items-center gap-3 rounded-[8px] p-1.5 text-left transition-colors hover:bg-white/[0.04]"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          onOpenSidePanel();
        }}
      >
        <div className="relative size-16 shrink-0 overflow-hidden rounded-[2px]">
          <Image
            src={cardThumb(card)}
            alt=""
            fill
            className="object-cover"
            draggable={false}
            sizes="64px"
            unoptimized={isAnimatedSrc(cardThumb(card))}
          />
        </div>
        <CardCopy card={card} className="h-16" />
        <span className="text-overline-large flex shrink-0 items-center gap-1.5 text-white/50 transition-colors group-hover:text-white">
          Explore
          <ChevronRightIcon className="size-2.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    </div>
  );
}

/** rest | hover | minimize | side-panel (forced) — compact row */
function MinimizedCardContent({
  card,
  onRestore,
  showExpandControl,
}: {
  card: PlayCardData;
  onRestore: (event: React.MouseEvent) => void;
  showExpandControl: boolean;
}) {
  return (
    <div className="flex h-full items-center gap-4 py-4 pl-4 pr-4">
      <div className="relative size-[90px] shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-[rgba(6,6,6,0.3)] to-[#060606]">
        <Image
          src={cardThumb(card)}
          alt=""
          fill
          className="object-cover"
          draggable={false}
          sizes="90px"
          unoptimized={isAnimatedSrc(cardThumb(card))}
        />
      </div>
      <CardCopy card={card} className="h-16" />
      {showExpandControl ? (
        <CardIconButton onClick={onRestore} label="Expand card">
          <PlusIcon />
        </CardIconButton>
      ) : null}
    </div>
  );
}

/** expand — advanced preview; Explore → side-panel */
function ExpandedCardContent({
  card,
  onMinimize,
  onOpenSidePanel,
}: {
  card: PlayCardData;
  onMinimize: (event: React.MouseEvent) => void;
  onOpenSidePanel: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-8 overflow-hidden py-4 pl-4 pr-4">
      <div className="flex shrink-0 items-center gap-2">
        <div className="min-w-0 flex-1">
          <CardHeading card={card} />
        </div>
        <CardIconButton onClick={onMinimize} label="Minimize card">
          <MinusIcon />
        </CardIconButton>
      </div>
      <CardImage src={card.image} />
      <CardFooter card={card} onOpenSidePanel={onOpenSidePanel} />
    </div>
  );
}

export function PlayCard({
  card,
  state,
  isActive,
  isDragging = false,
  forceMinimized = false,
  onHover,
  onLeave,
  onClick,
  onMinimize,
  onOpenSidePanel,
  onDragStart,
  onPointerUp,
}: PlayCardProps) {
  const isExpandedPreview = !forceMinimized && state === "expand";
  const showMinimized = !isExpandedPreview;
  const isHovered = state === "hover" && !forceMinimized;
  const isMinimizedFocus =
    showMinimized && !forceMinimized && (isHovered || isActive);

  const cardWidth = showMinimized ? MINIMIZED_CARD_WIDTH : DEFAULT_CARD_WIDTH;
  const cardHeight = showMinimized ? MINIMIZED_CARD_HEIGHT : DEFAULT_CARD_HEIGHT;

  const shadowClass = isDragging
    ? "shadow-[-5px_8px_16px_rgba(0,0,0,0.35)]"
    : showMinimized
      ? "shadow-[-5px_3px_7.3px_rgba(0,0,0,0.25)]"
      : "shadow-[-7px_-4px_6px_rgba(0,0,0,0.25)]";

  const handleMinimizeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onMinimize();
  };

  const handleRestoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <article
      className={`absolute cursor-grab select-none overflow-hidden rounded bg-[var(--color-off-black)] transition-[opacity,box-shadow,width,height] duration-300 active:cursor-grabbing ${shadowClass} ${
        isExpandedPreview
          ? "z-30 ring-1 ring-white/20"
          : isMinimizedFocus
            ? "z-20 ring-1 ring-white/10"
            : "z-10"
      }`}
      style={{
        left: card.x,
        top: card.y,
        width: cardWidth,
        height: cardHeight,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onPointerDown={onDragStart}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-expanded={isExpandedPreview}
      aria-label={card.title}
      data-card-state={forceMinimized ? "side-panel-canvas" : state}
    >
      {showMinimized ? (
        <MinimizedCardContent
          card={card}
          onRestore={handleRestoreClick}
          showExpandControl={!forceMinimized}
        />
      ) : (
        <ExpandedCardContent
          card={card}
          onMinimize={handleMinimizeClick}
          onOpenSidePanel={onOpenSidePanel}
        />
      )}
    </article>
  );
}
