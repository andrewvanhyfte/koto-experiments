"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";

const slideCount = 3;

export function DiningCarouselWidget() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative h-[169px] w-full overflow-hidden rounded-md">
      <Image
        src={assets.widgetDiningCarousel}
        alt="Koto team dining"
        fill
        className="object-cover"
        sizes="274px"
        priority
      />

      <button
        type="button"
        aria-label="Advance dining carousel"
        className="absolute inset-0"
        onClick={() => setActiveSlide((slide) => (slide + 1) % slideCount)}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-2 mix-blend-exclusion">
        <div className="relative h-0.5 w-[120px]">
          {Array.from({ length: slideCount }).map((_, index) => (
            <div
              key={index}
              className="absolute top-0 h-full bg-white/10"
              style={{
                left: `${index * 40.67}px`,
                width: "38.67px",
              }}
            />
          ))}
          <div
            className="absolute top-0 h-full bg-white/50 transition-all duration-300"
            style={{
              left: `${activeSlide * 40.67}px`,
              width: "11px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
