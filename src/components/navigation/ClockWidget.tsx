"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";

export function ClockWidget() {
  return (
    <div className="relative aspect-[129/129] flex-1 overflow-hidden rounded-md bg-[#141414]">
      <div className="absolute left-1/2 top-1/2 size-[113px] -translate-x-1/2 -translate-y-1/2">
        <Image
          src={assets.widgetClockFace}
          alt=""
          fill
          className="object-contain"
          sizes="113px"
        />
      </div>
      <div className="absolute left-1 top-[53px] rounded bg-[#2d2d2d] p-[5px] font-mono text-[9px] uppercase leading-none tracking-[-0.18px] text-white">
        17:04
        <br />
        GMT
      </div>
    </div>
  );
}
