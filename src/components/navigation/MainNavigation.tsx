"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { channelLinks, mainNavItems } from "@/lib/nav-items";
import { useOverlay } from "@/context/OverlayContext";

export function MainNavigation() {
  const { mainNavOpen, closeMainNav, navigate } = useOverlay();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!mainNavOpen) return null;

  return (
    <nav
      className="fixed left-4 top-4 z-50 w-[332px] overflow-hidden rounded bg-[#141414]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between py-1.5 pl-3 pr-2">
        <div className="relative h-9 w-12 shrink-0">
          <Image
            src={assets.kotoLogoSmileDark}
            alt="Koto"
            fill
            className="object-contain"
          />
        </div>
        <button
          type="button"
          onClick={closeMainNav}
          aria-label="Close navigation"
          className="flex size-6 items-center justify-center rounded-sm hover:bg-white/5"
        >
          <Image src={assets.closeIcon} alt="" width={10} height={10} />
        </button>
      </div>

      <div className="px-1.5 pb-2.5 pt-2">
        {mainNavItems.map((item) => {
          const isWorkHovered = hoveredItem === "Work" && item.label === "Work";
          const showSubmenu = isWorkHovered && item.children;

          return (
            <div key={item.label}>
              {item.href ? (
                <button
                  type="button"
                  onClick={() => navigate(item.href!)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-base text-white transition-colors hover:bg-[#202020]"
                >
                  <span>{item.label}</span>
                </button>
              ) : (
                <div
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="flex w-full items-center justify-between rounded px-2 py-1.5 text-base text-white transition-colors hover:bg-[#202020]"
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <Image
                      src={assets.chevronRight}
                      alt=""
                      width={10}
                      height={10}
                      className="opacity-80"
                    />
                  )}
                </div>
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
              <span
                key={link}
                className="font-mono text-[9px] uppercase tracking-[-0.18px] text-white"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
