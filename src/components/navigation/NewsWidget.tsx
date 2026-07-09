"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { widgetNewsItems } from "@/lib/nav-items";

const newsImages = {
  widgetNews1: assets.widgetNews1,
  widgetNews3: assets.widgetNews3,
} as const;

export function NewsWidget() {
  return (
    <div className="overflow-hidden rounded-md bg-[#141414] px-1 pb-1 pt-1.5">
      <div className="mb-2 flex items-center justify-between px-2 font-mono text-[11px] uppercase text-[#989898]">
        <span>Latest news</span>
        <a
          href="https://koto.com/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          [All]
        </a>
      </div>
      <div className="flex flex-col px-2">
        {widgetNewsItems.map((item, index) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex gap-4 py-3 transition-opacity hover:opacity-80 ${
              index < widgetNewsItems.length - 1
                ? "border-b border-white/5"
                : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-[1.25] text-white">{item.title}</p>
              <p className="text-sm leading-[1.25] text-[#989898]">
                {item.description}
              </p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[-0.18px] text-[#ccc]">
                {item.category}
              </p>
            </div>
            {"imageKey" in item && item.imageKey && (
              <div className="relative size-14 shrink-0">
                <Image
                  src={newsImages[item.imageKey]}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
