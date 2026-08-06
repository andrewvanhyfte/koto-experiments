"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { exposedNavLinks } from "@/lib/nav-items";
import { useOverlay } from "@/context/OverlayContext";
import { DashboardClock } from "./DashboardClock";

export function TopBarExposed() {
  const { openNavFromExposed, goHome } = useOverlay();

  return (
    <>
      <header className="absolute left-4 top-4 z-40 flex h-12 items-center gap-9 pr-4">
        <button
          type="button"
          onClick={goHome}
          className="relative block h-full w-20 shrink-0 transition-opacity hover:opacity-80"
          aria-label="Koto home"
        >
          <Image
            src={assets.kotoLogoSmile}
            alt="Koto"
            fill
            className="object-contain"
            priority
          />
        </button>
        <nav className="flex h-2 items-center gap-9 mix-blend-color-dodge">
          {exposedNavLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() =>
                openNavFromExposed(
                  "highlightsWork" in link && link.highlightsWork
                    ? "Work"
                    : link.label,
                )
              }
              className="text-overline-large text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </header>
      <div className="absolute right-4 top-4 z-40">
        <DashboardClock />
      </div>
    </>
  );
}
