"use client";

import { usePathname } from "next/navigation";
import { assets } from "@/lib/assets";
import { routes } from "@/lib/routes";
import { useOverlay } from "@/context/OverlayContext";
import { DashboardClock } from "./DashboardClock";

function NavLogo({ src, className }: { src: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Koto" className={className} />
  );
}

function NavIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className="size-2.5" />
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

  if (isPlay) {
    return (
      <>
        <header className="absolute left-4 top-4 z-40">
          <div className="flex h-10 items-center gap-6 rounded-md bg-[#181818] py-1.5 pl-3 pr-3">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={goHome}
                className="flex h-8 w-9 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Koto home"
              >
                <NavLogo
                  src={assets.kotoLogoPlay}
                  className="h-3.5 w-[29px] object-contain"
                />
              </button>
              <span className="font-mono text-[10px] uppercase leading-[1.1] tracking-[0.3px] text-[#919191]">
                {breadcrumb}
              </span>
            </div>
            <button
              type="button"
              onClick={() => openMainNav()}
              aria-label="Open navigation"
              className="flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-white/5"
            >
              <NavIcon src={assets.navExpandIcon} />
            </button>
          </div>
        </header>
        <div className="absolute right-4 top-4 z-40">
          <DashboardClock />
        </div>
      </>
    );
  }

  return (
    <>
      <header className="absolute left-4 top-4 z-40">
        <div className="flex w-[195px] items-center gap-6 rounded bg-[#141414] py-1.5 pl-3 pr-2">
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <button
              type="button"
              onClick={goHome}
              className="relative flex h-9 w-12 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Koto home"
            >
              <NavLogo
                src={assets.kotoLogoHome}
                className="h-5 w-[42px] object-contain"
              />
            </button>
            <button
              type="button"
              onClick={() => openMainNav()}
              aria-label="Open navigation"
              className="rounded-sm py-0.5 transition-colors hover:opacity-80"
            >
              <span className="font-mono text-[11px] uppercase leading-none text-[#989898]">
                {breadcrumb}
              </span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => openMainNav()}
            aria-label="Open navigation menu"
            className="flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-white/5"
          >
            <NavIcon src={assets.navMenuIcon} />
          </button>
        </div>
      </header>
      <div className="absolute right-4 top-4 z-40">
        <DashboardClock />
      </div>
    </>
  );
}
