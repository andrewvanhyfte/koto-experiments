"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";

export function CultureAlbumWidget() {
  return (
    <div className="relative aspect-[180/180] flex-1 overflow-hidden rounded-md bg-[#ffae26] p-0.5">
      <Image
        src={assets.widgetCultureAlbum}
        alt="Culture widget"
        fill
        className="rounded-sm object-cover"
        sizes="129px"
      />
    </div>
  );
}
