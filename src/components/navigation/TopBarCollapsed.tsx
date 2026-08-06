"use client";

import { usePathname } from "next/navigation";
import { assets } from "@/lib/assets";
import { routes } from "@/lib/routes";
import { useOverlay } from "@/context/OverlayContext";
import { MenuIcon } from "@/components/ui/Icons";
import { DashboardClock } from "./DashboardClock";

/**
 * Compact top bar — source of truth:
 * https://www.figma.com/design/3MwgfLh2C4gAdYQTElQ6NC/koto.com?node-id=3319-1275
 * (Compact / Hover variants)
 */
function NavLogo({ src, className }: { src: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Koto" className={className} />
  );
}

export function TopBarCollapsed() {
  const pathname = usePathname();
  const { breadcrumb, openMainNav, mainNavOpen, goHome } = useOverlay();
  const isPlay = pathname === routes.play;

  if (mainNavOpen) {
    return (
      <div className="absolute right-4 top-4 z-40">
        <DashboardClock />
      </div>
    );
  }

  return (
    <>
      <header className="absolute left-4 top-4 z-40">
        <div
          className={`flex items-center justify-between rounded bg-[var(--color-off-black)] py-1.5 pl-3 pr-2 ${
            isPlay ? "min-w-0 gap-6" : "w-[320px]"
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <button
              type="button"
              onClick={goHome}
              className="relative flex h-9 w-12 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Koto home"
            >
              <NavLogo
                src={isPlay ? assets.kotoLogoPlay : assets.kotoLogoHome}
                className={
                  isPlay
                    ? "h-3.5 w-[29px] object-contain"
                    : "h-5 w-[42px] object-contain"
                }
              />
            </button>
            <button
              type="button"
              onClick={() => openMainNav()}
              aria-label="Open navigation"
              className="rounded-sm py-0.5 transition-opacity hover:opacity-80"
            >
              <span className="text-overline-large text-[var(--color-grey)]">
                {breadcrumb}
              </span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => openMainNav()}
            aria-label="Open navigation menu"
            className="relative flex size-6 shrink-0 items-center justify-center rounded-[2px] text-[var(--color-grey)] transition-colors hover:bg-white/5 hover:text-white"
          >
            <MenuIcon className="size-2.5" />
          </button>
        </div>
      </header>
      <div className="absolute right-4 top-4 z-40">
        <DashboardClock />
      </div>
    </>
  );
}
