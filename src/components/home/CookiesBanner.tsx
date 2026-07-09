"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/Icons";

export function CookiesBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="absolute bottom-4 right-4 z-20 w-[min(431px,calc(100vw-2rem))] rounded bg-black/20 p-3 backdrop-blur-[40px]">
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          aria-label="Dismiss cookies"
          onClick={() => setVisible(false)}
          className="rounded p-3 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
        >
          <CloseIcon />
        </button>
        <button
          type="button"
          aria-label="Accept cookies"
          onClick={() => setVisible(false)}
          className="rounded bg-white/5 p-3 text-white transition-colors hover:bg-white/10"
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
