"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { useOverlay } from "@/context/OverlayContext";

export function DashboardClock() {
  const { toggleWidget } = useOverlay();

  return (
    <button
      type="button"
      onClick={toggleWidget}
      className="flex h-12 items-center rounded p-1 backdrop-blur-[6px] transition-colors hover:bg-white/5"
      aria-label="Open widget menu"
    >
      <div className="flex items-center gap-2 rounded bg-white/5 py-2 pl-3 pr-1 mix-blend-exclusion">
        <span className="font-mono text-[11px] uppercase leading-none text-white mix-blend-difference">
          10:03 UTC-8
        </span>
        <span className="relative flex size-6 items-center justify-center rounded-sm">
          <Image src={assets.gridIcon} alt="" width={10} height={10} />
        </span>
      </div>
    </button>
  );
}
