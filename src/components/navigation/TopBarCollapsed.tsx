"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { useOverlay } from "@/context/OverlayContext";
import { DashboardClock } from "./DashboardClock";

export function TopBarCollapsed() {
  const { breadcrumb, openMainNav, mainNavOpen } = useOverlay();

  if (mainNavOpen) {
    return (
      <div className="absolute right-[13px] top-4 z-40">
        <DashboardClock />
      </div>
    );
  }

  return (
    <>
      <header className="absolute left-4 top-4 z-40">
        <button
          type="button"
          onClick={openMainNav}
          aria-label="Open navigation"
          className="flex w-[195px] items-center gap-6 rounded bg-[#141414] py-1.5 pl-3 pr-2 transition-colors hover:bg-[#1a1a1a]"
        >
          <div className="flex flex-1 items-center gap-6">
            <div className="relative h-9 w-12 shrink-0">
              <Image
                src={assets.kotoLogoSmileDark}
                alt="Koto"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-mono text-[11px] uppercase leading-none text-[#989898]">
              {breadcrumb}
            </span>
          </div>
          <span className="relative flex size-6 items-center justify-center rounded-sm">
            <Image src={assets.closeIcon} alt="" width={10} height={10} />
          </span>
        </button>
      </header>
      <div className="absolute right-[13px] top-4 z-40">
        <DashboardClock />
      </div>
    </>
  );
}
