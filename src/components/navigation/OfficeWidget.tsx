"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";

const officeSlides = [
  {
    image: assets.widgetOfficeBuilding,
    email: "la@koto.studio",
    label: "Say hello",
  },
] as const;

export function OfficeWidget() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = officeSlides[slideIndex];

  const goPrev = () => {
    setSlideIndex(
      (index) => (index - 1 + officeSlides.length) % officeSlides.length,
    );
  };

  const goNext = () => {
    setSlideIndex((index) => (index + 1) % officeSlides.length);
  };

  return (
    <div className="relative aspect-[562/347] w-full overflow-hidden rounded-md">
      <Image
        src={slide.image}
        alt="Koto studio"
        fill
        className="object-cover"
        sizes="370px"
        priority
      />

      <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-b from-transparent from-[58%] to-black/70 p-2">
        <a
          href={`mailto:${slide.email}`}
          className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="relative size-9 shrink-0 overflow-hidden rounded">
            <Image
              src={assets.widgetOfficeLogo}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="font-mono text-[11px] uppercase leading-none text-white">
            <p className="mb-0.5 text-[#ccc]">{slide.label}</p>
            <p>{slide.email}</p>
          </div>
        </a>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous office"
            className="flex items-center justify-center rounded-sm bg-white/10 p-2 transition-colors hover:bg-white/15"
          >
            <ChevronLeftIcon className="text-white" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next office"
            className="flex items-center justify-center rounded-sm bg-white/10 p-2 transition-colors hover:bg-white/15"
          >
            <ChevronRightIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
