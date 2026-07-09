"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { routes } from "@/lib/routes";
import { useOverlay } from "@/context/OverlayContext";
import { ExternalLinkIcon, InteractiveIcon } from "@/components/ui/Icons";

export function InteractiveExperimentWidget() {
  const { navigate } = useOverlay();

  return (
    <button
      type="button"
      onClick={() => navigate(routes.play)}
      className="group flex h-[197px] w-full flex-col overflow-hidden rounded-md bg-[#ffe800] p-1 text-left transition-opacity hover:opacity-95"
      aria-label="Open experiments.koto.com/la"
    >
      <div className="relative flex shrink-0 items-center justify-between py-2 pl-2 pr-0">
        <span className="font-mono text-[11px] uppercase leading-none text-[#2d2d2d]">
          experiments.koto.com/la
        </span>
        <span className="flex items-center justify-center p-2 text-[#2d2d2d]">
          <ExternalLinkIcon className="size-2.5" />
        </span>
      </div>

      <div className="relative mx-1 mb-1 min-h-0 flex-1 overflow-hidden rounded-md">
        <Image
          src={assets.widgetPlasmaRally}
          alt="Interactive experiment — rally car"
          fill
          className="object-cover"
          sizes="274px"
        />
        <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-white/5 py-2 pl-3 pr-2 backdrop-blur-[40px]">
          <span className="font-mono text-[11px] uppercase leading-none text-white">
            Interactive
          </span>
          <InteractiveIcon className="size-2.5 text-white" />
        </div>
      </div>
    </button>
  );
}
