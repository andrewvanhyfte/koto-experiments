"use client";

export function CookiesBanner() {
  return (
    <div className="absolute bottom-4 right-4 z-20 w-[min(431px,calc(100vw-2rem))] rounded bg-black/20 p-3 backdrop-blur-[40px]">
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          aria-label="Dismiss cookies"
          className="rounded p-3 hover:bg-white/5"
        >
          <span className="block size-2.5 rounded-full bg-white/40" />
        </button>
        <button
          type="button"
          aria-label="Accept cookies"
          className="rounded bg-white/5 p-3 hover:bg-white/10"
        >
          <span className="block size-2.5 rounded-full bg-white" />
        </button>
      </div>
      <p className="mt-1 text-[13px] leading-[1.25] text-white/50">
        We use essential cookies to keep things running smoothly. We&apos;d love
        to ask about analytics too.
      </p>
    </div>
  );
}
