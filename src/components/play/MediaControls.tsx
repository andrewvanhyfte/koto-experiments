"use client";

/** Pause + static progress ring — expand card + side-panel media. */
export function MediaControls() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] flex items-end justify-end p-3">
      <div className="relative size-[26px]">
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl p-2 backdrop-blur-[40px] mix-blend-exclusion">
          <svg
            className="size-2.5 text-white"
            viewBox="0 0 10 10"
            fill="currentColor"
            aria-hidden
          >
            <rect x="2.5" y="2" width="1.75" height="6" rx="0.2" />
            <rect x="5.75" y="2" width="1.75" height="6" rx="0.2" />
          </svg>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/media-progress.svg"
          alt=""
          className="pointer-events-none absolute inset-0 size-full mix-blend-exclusion"
        />
      </div>
    </div>
  );
}
