"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { channelLinks, mainNavItems } from "@/lib/nav-items";
import { useOverlay } from "@/context/OverlayContext";
import { ChevronRightIcon, CloseIcon } from "@/components/ui/Icons";

export function MainNavigation() {
  const {
    mainNavOpen,
    closeMainNav,
    navigate,
    goHome,
    highlightedNavItem,
  } = useOverlay();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedNavItem) {
      setHoveredItem(highlightedNavItem);
    }
  }, [highlightedNavItem]);

  if (!mainNavOpen) return null;

  return (
    <nav
      className="fixed left-4 top-4 z-50 w-[332px] overflow-hidden rounded bg-[#141414]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between py-1.5 pl-3 pr-2">
        <button
          type="button"
          onClick={goHome}
          className="relative block h-9 w-12 shrink-0 transition-opacity hover:opacity-80"
          aria-label="Koto home"
        >
          <Image
            src={assets.kotoLogoSmileDark}
            alt="Koto"
            fill
            className="object-contain"
          />
        </button>
        <button
          type="button"
          onClick={closeMainNav}
          aria-label="Close navigation"
          className="flex size-6 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="px-1.5 pb-2.5 pt-2">
        {mainNavItems.map((item) => {
          const isHovered = hoveredItem === item.label;
          const showSubmenu = isHovered && item.children;

          return (
            <div key={item.label}>
              {item.href ? (
                <button
                  type="button"
                  onClick={() => navigate(item.href!)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(highlightedNavItem)}
                  className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-base text-white transition-colors hover:bg-[#202020]"
                >
                  <span>{item.label}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(highlightedNavItem)}
                  onClick={() => setHoveredItem(item.label)}
                  className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-base text-white transition-colors hover:bg-[#202020]"
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronRightIcon className="opacity-80" />
                  )}
                </button>
              )}

              {showSubmenu &&
                item.children!.map((child) => (
                  <button
                    key={child.label}
                    type="button"
                    onClick={() => navigate(child.href)}
                    className="flex w-full items-center justify-between rounded bg-[#202020] px-2 py-1.5 text-left text-base text-white transition-colors hover:bg-[#2a2a2a]"
                  >
                    {child.label}
                  </button>
                ))}
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#202020] px-1.5 py-2">
        <div className="flex flex-col gap-4 p-2">
          <span className="font-mono text-[9px] uppercase tracking-[-0.18px] text-[#989898]">
            Channels
          </span>
          <div className="flex flex-col gap-1.5 pt-1">
            {channelLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] uppercase tracking-[-0.18px] text-white transition-colors hover:text-[#f5e642]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
