"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";

export function HomeHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060606]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={assets.homeBackground}
          alt=""
          fill
          className="object-cover mix-blend-screen"
          priority
        />
      </div>

      <div className="absolute left-7 top-[calc(50%+43px)] w-[427px] -translate-y-full">
        <h1 className="text-[38px] leading-[1.1] tracking-[-0.38px] text-white">
          We&apos;re Koto.
          <br />
          <span className="text-[#989898]">The Creative Company.</span>
        </h1>
      </div>
    </div>
  );
}
