"use client";

import { LocateIcon, MinusIcon, PlusIcon } from "@/components/ui/Icons";
import {
  PLAY_ZOOM_STEP,
  clampPlayZoom,
  zoomAtPoint,
} from "@/lib/play-canvas";
import { useOverlay } from "@/context/OverlayContext";

export function ZoomControls() {
  const { zoomLevel, panOffset, setZoomLevel, setPanOffset, resetView } =
    useOverlay();

  const zoomFromCenter = (nextZoom: number) => {
    const viewportCenter = {
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    };
    const next = zoomAtPoint(
      zoomLevel,
      panOffset,
      nextZoom,
      viewportCenter.x,
      viewportCenter.y,
    );
    setZoomLevel(next.zoom);
    setPanOffset(next.pan);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 drop-shadow-lg">
      <button
        type="button"
        aria-label="Reset view"
        onClick={resetView}
        className="flex items-center justify-center rounded-sm bg-[#141414] p-[7px] text-white transition-colors hover:bg-[#202020]"
      >
        <LocateIcon />
      </button>
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() =>
            zoomFromCenter(
              clampPlayZoom(zoomLevel + PLAY_ZOOM_STEP),
            )
          }
          className="flex items-center justify-center rounded-sm bg-[#202020] p-[7px] text-white transition-colors hover:bg-[#2a2a2a]"
        >
          <PlusIcon />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() =>
            zoomFromCenter(
              clampPlayZoom(zoomLevel - PLAY_ZOOM_STEP),
            )
          }
          className="flex items-center justify-center rounded-sm bg-[#141414] p-[7px] text-white transition-colors hover:bg-[#202020]"
        >
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}
