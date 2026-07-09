"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { exposedNavLinks } from "@/lib/nav-items";
import { DashboardClock } from "./DashboardClock";

export function TopBarExposed() {
  return (
    <>
      <header className="absolute left-4 top-4 z-40 flex h-12 items-center gap-9 pr-4">
        <div className="relative h-full w-20 shrink-0">
          <Image
            src={assets.kotoLogoSmile}
            alt="Koto"
            fill
            className="object-contain"
            priority
          />
        </div>
        <nav className="flex h-2 items-center gap-9 mix-blend-color-dodge">
          {exposedNavLinks.map((link) => (
            <span
              key={link}
              className="font-mono text-[11px] uppercase leading-none text-white/50"
            >
              {link}
            </span>
          ))}
        </nav>
      </header>
      <div className="absolute right-0 top-4 z-40">
        <DashboardClock />
      </div>
    </>
  );
}
