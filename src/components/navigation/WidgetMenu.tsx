"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { widgetCities } from "@/lib/nav-items";
import { useOverlay } from "@/context/OverlayContext";

const newsItems = [
  {
    title: "OFF Social arrives to New York",
    description: "Our invite-only dinner series visits NYC",
    category: "Events",
    image: assets.widgetNews1,
  },
  {
    title: "Best music app of 2024",
    description: "Deezer, one the best streaming platforms",
    category: "Press",
  },
  {
    title: "Off.Newsletter #04",
    description: "Brand evolution or revolution?",
    category: "Opinions",
    image: assets.widgetNews3,
  },
];

export function WidgetMenu() {
  const { widgetOpen, closeWidget } = useOverlay();

  if (!widgetOpen) return null;

  return (
    <aside
      className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[520px] flex-col overflow-hidden"
      aria-label="Widget menu"
    >
      <div className="absolute inset-0">
        <Image
          src={assets.widgetBackground}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
      </div>

      <div className="relative flex flex-1 flex-col gap-3 overflow-y-auto p-4 pt-20">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {widgetCities.map((city, index) => (
              <span
                key={city}
                className={`rounded px-2 py-1 font-mono text-[9px] uppercase tracking-wide ${
                  index === 0
                    ? "bg-white text-black"
                    : "text-white/60"
                }`}
              >
                {city}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={closeWidget}
            aria-label="Close widget menu"
            className="flex size-6 items-center justify-center rounded-sm hover:bg-white/10"
          >
            <Image src={assets.gridIcon} alt="" width={10} height={10} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative col-span-2 aspect-[562/347] overflow-hidden rounded-md">
            <Image
              src={assets.widgetOffice}
              alt="Koto LA studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-b from-transparent via-transparent to-black/70 p-2">
              <div className="font-mono text-[11px] uppercase text-white">
                <p className="text-[#ccc]">Say hello</p>
                <p>la@koto.studio</p>
              </div>
            </div>
          </div>

          <div className="aspect-square rounded-md bg-[#141414]" />

          <div className="flex aspect-square flex-col items-center justify-center rounded-md bg-[#141414]">
            <div className="relative size-16 rounded-full border border-white/20">
              <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-full bg-white" />
              <div className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 rotate-[120deg] bg-white/60" />
            </div>
            <span className="mt-2 font-mono text-[9px] uppercase text-white/60">
              17:04 GMT
            </span>
          </div>

          <Link
            href="/play"
            onClick={closeWidget}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-md bg-[#f5e642]"
          >
            <Image
              src={assets.widgetInteractive}
              alt="Interactive experiment"
              fill
              className="object-cover"
            />
            <div className="absolute left-2 top-2 font-mono text-[9px] uppercase text-black">
              experiments.koto.com/la ↗
            </div>
            <div className="absolute bottom-2 left-2 rounded-full bg-black/80 px-2 py-1 font-mono text-[9px] uppercase text-white">
              Interactive
            </div>
          </Link>

          <div className="col-span-1 rounded-md bg-[#141414] p-2">
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase text-[#989898]">
              <span>Latest news</span>
              <span>[All]</span>
            </div>
            <div className="flex flex-col gap-3">
              {newsItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 border-b border-white/5 pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.title}</p>
                    <p className="text-sm text-[#989898]">{item.description}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase text-[#ccc]">
                      {item.category}
                    </p>
                  </div>
                  {item.image && (
                    <div className="relative size-14 shrink-0">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
