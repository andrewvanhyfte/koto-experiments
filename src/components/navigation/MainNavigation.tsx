"use client";

import { useEffect, useState } from "react";
import { assets } from "@/lib/assets";
import { channelLinks, mainNavItems } from "@/lib/nav-items";
import { routes } from "@/lib/routes";
import { useOverlay } from "@/context/OverlayContext";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";

const EXPERIMENTS_LABEL = "See our experiments";

/**
 * Global nav — koto.com structure + experiments Play / Work hover:
 * - Open: Work, Play, About, Careers, Latest, Contact
 * - Work focus: Play → "See our experiments"
 * - Careers hover: "Join the team"
 * - Channels preview on Off.Brand hover
 */
export function MainNavigation() {
  const {
    mainNavOpen,
    closeMainNav,
    navigate,
    goHome,
    highlightedNavItem,
  } = useOverlay();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedNavItem) {
      setHoveredItem(highlightedNavItem);
    }
  }, [highlightedNavItem]);

  if (!mainNavOpen) return null;

  const workFocused =
    hoveredItem === "Work" || hoveredItem === EXPERIMENTS_LABEL;

  const channelPreview = channelLinks.find(
    (link) => link.label === hoveredChannel && link.preview,
  )?.preview;

  return (
    <nav
      className="fixed left-4 top-4 z-50 flex w-[320px] flex-col overflow-hidden rounded bg-[var(--color-off-black)]"
      aria-label="Main navigation"
      onMouseLeave={() => {
        setHoveredItem(highlightedNavItem);
        setHoveredChannel(null);
      }}
    >
      <div className="flex w-full items-center justify-between rounded-t py-1.5 pl-3 pr-2">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <button
            type="button"
            onClick={goHome}
            className="relative flex h-9 w-12 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Koto home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.kotoLogoHome}
              alt="Koto"
              className="h-5 w-[42px] object-contain"
            />
          </button>
        </div>
        <button
          type="button"
          onClick={closeMainNav}
          aria-label="Close navigation"
          className="relative flex size-6 shrink-0 items-center justify-center rounded-[2px] text-[var(--color-grey)] transition-colors hover:bg-white/5 hover:text-white"
        >
          <CloseIcon className="size-2.5" />
        </button>
      </div>

      <div className="flex w-full flex-col gap-3 px-1.5 pb-2.5 pt-2">
        <div className="flex w-full flex-col items-end rounded-[2px] backdrop-blur-[9.6px]">
          {mainNavItems.map((item) => {
            const isPlay = item.label === "Play";

            // Work focus: replace Play with experiments submenu
            if (isPlay && workFocused) {
              return (
                <button
                  key={EXPERIMENTS_LABEL}
                  type="button"
                  onMouseEnter={() => setHoveredItem(EXPERIMENTS_LABEL)}
                  onClick={() => navigate(routes.play)}
                  className="flex w-full items-center justify-between rounded bg-[var(--color-darkest-grey)] py-1.5 pl-2 pr-0.5 text-left transition-colors hover:bg-[#2a2a2a]"
                >
                  <span className="whitespace-nowrap text-[16px] font-[350] leading-[1.25] text-white [font-feature-settings:'salt'_1]">
                    {EXPERIMENTS_LABEL}
                  </span>
                  <span className="size-6 shrink-0 opacity-0" aria-hidden />
                </button>
              );
            }

            const isHovered = hoveredItem === item.label;
            const label =
              isHovered && item.hoverLabel ? item.hoverLabel : item.label;

            return (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setHoveredItem(item.label)}
                onClick={() => {
                  if (item.children) {
                    setHoveredItem(item.label);
                    return;
                  }
                  if (item.href) navigate(item.href);
                }}
                className={`flex w-full items-center justify-between rounded py-1.5 pl-2 pr-0.5 text-left transition-colors ${
                  isHovered && !item.children
                    ? "bg-[var(--color-darkest-grey)]"
                    : item.children
                      ? ""
                      : "hover:bg-[var(--color-darkest-grey)]"
                }`}
              >
                <span className="whitespace-nowrap text-[16px] font-[350] leading-[1.25] text-white [font-feature-settings:'salt'_1]">
                  {label}
                </span>
                {item.showIndicator ? (
                  <span className="relative flex size-6 shrink-0 items-center justify-center rounded-[2px] text-[var(--color-grey)]">
                    <MenuIcon className="size-2.5" />
                  </span>
                ) : (
                  <span className="size-6 shrink-0 opacity-0" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex w-full flex-col items-start rounded-b border-t-[0.5px] border-[var(--color-darkest-grey)] px-1.5 py-2">
        <div className="flex w-full flex-col gap-4 p-2">
          <span className="text-overline-small text-[var(--color-grey)]">
            Channels
          </span>
          <div className="flex w-full flex-col gap-1.5 pt-1">
            {channelLinks.map((link) => {
              const dimmed =
                hoveredChannel !== null && hoveredChannel !== link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredChannel(link.label)}
                  onMouseLeave={() => setHoveredChannel(null)}
                  className={`text-overline-small transition-colors ${
                    dimmed ? "text-[var(--color-grey)]" : "text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {channelPreview && (
          <div className="pointer-events-none absolute bottom-0.5 right-0.5 size-12 overflow-hidden rounded-[2px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={channelPreview}
              alt=""
              className="size-full object-cover"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
