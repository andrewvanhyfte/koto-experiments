"use client";

import { useOverlay } from "@/context/OverlayContext";

export function FilterBar() {
  const { filterOpen, toggleFilter } = useOverlay();

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <button
        type="button"
        onClick={toggleFilter}
        aria-expanded={filterOpen}
        className="flex items-center gap-4 rounded bg-[#141414] px-4 py-3 shadow-lg"
      >
        <span className="text-white/60">⌕</span>
        <span className="font-mono text-[11px] uppercase text-white">
          {filterOpen ? "Filter: Los Angeles" : "Viewing: Los Angeles (30)"}
        </span>
        <span className="text-white/60">↗</span>
      </button>

      {filterOpen && (
        <div className="absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded bg-[#141414] p-3 shadow-xl">
          <p className="mb-2 font-mono text-[9px] uppercase text-[#989898]">
            Location
          </p>
          {["Los Angeles", "NYC", "LDN", "BER", "SYD"].map((city) => (
            <button
              key={city}
              type="button"
              className="block w-full rounded px-2 py-1.5 text-left text-sm text-white hover:bg-[#202020]"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
