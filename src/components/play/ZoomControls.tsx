"use client";

import { useOverlay } from "@/context/OverlayContext";

export function ZoomControls() {
  const { zoomLevel, setZoomLevel } = useOverlay();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 drop-shadow-lg">
      <button
        type="button"
        aria-label="Find me"
        className="flex items-center justify-center rounded-sm bg-[#141414] p-[7px] text-[10px] text-white"
      >
        ⊕
      </button>
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 1.5))}
          className="flex items-center justify-center rounded-sm bg-[#202020] p-[7px] text-white hover:bg-[#2a2a2a]"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}
          className="flex items-center justify-center rounded-sm bg-[#141414] p-[7px] text-white hover:bg-[#202020]"
        >
          −
        </button>
      </div>
    </div>
  );
}
