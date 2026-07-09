"use client";

import { useState } from "react";
import { useOverlay } from "@/context/OverlayContext";
import { SearchIcon, ShareIcon } from "@/components/ui/Icons";

const filterCities = ["Los Angeles", "NYC", "LDN", "BER", "SYD"];

export function FilterBar() {
  const { filterOpen, toggleFilter } = useOverlay();
  const [activeCity, setActiveCity] = useState("Los Angeles");

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "Koto Play", url });
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-4 rounded bg-[#141414] px-4 py-3 shadow-lg">
        <button
          type="button"
          onClick={toggleFilter}
          aria-expanded={filterOpen}
          aria-label="Toggle location filter"
          className="text-white/60 transition-colors hover:text-white"
        >
          <SearchIcon />
        </button>
        <button
          type="button"
          onClick={toggleFilter}
          className="font-mono text-[11px] uppercase text-white transition-opacity hover:opacity-80"
        >
          {filterOpen
            ? `Filter: ${activeCity}`
            : `Viewing: ${activeCity} (30)`}
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this view"
          className="text-white/60 transition-colors hover:text-white"
        >
          <ShareIcon />
        </button>
      </div>

      {filterOpen && (
        <div className="absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded bg-[#141414] p-3 shadow-xl">
          <p className="mb-2 font-mono text-[9px] uppercase text-[#989898]">
            Location
          </p>
          {filterCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setActiveCity(city);
                toggleFilter();
              }}
              className={`block w-full rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-[#202020] ${
                activeCity === city ? "text-[#f5e642]" : "text-white"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
