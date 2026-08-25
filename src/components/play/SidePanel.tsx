"use client";

import Image from "next/image";
import { getCardDeepDive, type PlayCardData } from "@/lib/play-cards";
import { MediaControls } from "./MediaControls";

type SidePanelProps = {
  card: PlayCardData;
  /** Kept for callers; close control lives on the yellow canvas strip. */
  onClose: () => void;
};

function isGifSrc(src: string) {
  return /\.gif($|\?)/i.test(src);
}

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)($|\?)/i.test(src);
}

/** Figma Panel / Desktop — 938×850 on a 1512 artboard (≈62%). */
const PANEL_MAX_WIDTH_PX = 938;

export function SidePanel({ card }: SidePanelProps) {
  const deepDive = getCardDeepDive(card);

  return (
    <aside
      className="relative z-50 flex h-full w-[min(938px,62%)] shrink-0 flex-col bg-[var(--color-black)]"
      style={{ maxWidth: PANEL_MAX_WIDTH_PX }}
      aria-label={`${card.title} deep dive`}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-[120px] overflow-y-auto px-7 py-6">
        <header className="flex w-full shrink-0 items-center justify-between gap-4 whitespace-nowrap">
          <p className="text-overline-large shrink-0 text-white">
            {card.category}
          </p>
          <p className="text-body-small truncate text-[var(--color-grey)]">
            {card.tools}
          </p>
        </header>

        <div className="flex w-full flex-col gap-9 pb-16">
          <div className="flex flex-col">
            <h1 className="text-headline-large text-white">{card.title}</h1>
            <p className="text-headline-large text-[var(--color-grey)]">
              {card.subtitle}
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-md">
            <div className="relative aspect-[882/495] w-full">
              {isVideoSrc(deepDive.heroImage) ? (
                <video
                  src={deepDive.heroImage}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={deepDive.heroImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1512px) 62vw, 938px"
                  priority
                  unoptimized={isGifSrc(deepDive.heroImage)}
                />
              )}
              <MediaControls />
            </div>
          </div>

          <section className="flex w-full flex-col gap-6">
            <div className="border-t border-white/10 pt-4">
              <div className="text-overline-large flex items-center gap-2 uppercase">
                <span className="text-white">{deepDive.sectionIndex}</span>
                <span className="text-[var(--color-grey)]">
                  {deepDive.sectionTitle}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-6 pb-9">
              <p className="text-title-large w-full text-[var(--color-grey)]">
                {deepDive.description}
              </p>
              <p className="text-body-large w-full max-w-[433px] text-[var(--color-grey)]">
                {deepDive.body}
              </p>
            </div>

            <div className="relative flex w-full gap-4 overflow-x-auto pb-2">
              <div className="pointer-events-none absolute left-[589px] top-11 z-[4] hidden items-center gap-1.5 mix-blend-difference xl:flex">
                <span className="text-overline-large text-white">next</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/side-panel-next.svg"
                  alt=""
                  className="size-2.5"
                />
              </div>

              {deepDive.gallery.map((item) => (
                <figure
                  key={item.src + item.caption}
                  className="flex w-[319px] shrink-0 flex-col gap-3"
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-md ${item.aspectClass}`}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="319px"
                      unoptimized={isGifSrc(item.src)}
                    />
                  </div>
                  <figcaption className="text-caption-mono text-[var(--color-grey)]">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
