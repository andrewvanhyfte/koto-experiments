"use client";

import { playCards } from "@/lib/play-cards";

export function RadarMinimap() {
  return (
    <div className="fixed bottom-6 left-6 z-40 h-[82px] w-[120px] overflow-hidden rounded border border-[#141414] bg-[#202020]/80 backdrop-blur-[40px]">
      <div className="flex h-full flex-col items-center justify-center gap-1 p-2">
        {playCards.slice(0, 4).map((card, rowIndex) => (
          <div key={card.id} className="flex gap-0.5">
            {Array.from({ length: 5 + rowIndex }).map((_, colIndex) => (
              <div
                key={`${card.id}-${colIndex}`}
                className="h-[1.2px] w-[2.4px] rounded-[0.3px] bg-white"
                style={{
                  opacity: (rowIndex + colIndex) % 3 === 0 ? 0 : 1,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
