"use client";

import { useState } from "react";
import { widgetCities } from "@/lib/nav-items";
import { useOverlay } from "@/context/OverlayContext";
import { ClockWidget } from "./ClockWidget";
import { CultureAlbumWidget } from "./CultureAlbumWidget";
import { DiningCarouselWidget } from "./DiningCarouselWidget";
import { InteractiveExperimentWidget } from "./InteractiveExperimentWidget";
import { NewsWidget } from "./NewsWidget";
import { OfficeWidget } from "./OfficeWidget";
import { WidgetCityBar } from "./WidgetCityBar";

export function WidgetMenu() {
  const { widgetOpen, closeWidget } = useOverlay();
  const [activeCity, setActiveCity] = useState<string>(widgetCities[0]);

  if (!widgetOpen) return null;

  return (
    <div
      className="fixed right-4 top-4 z-50 flex flex-col items-end gap-4"
      aria-label="Widget menu"
    >
      <WidgetCityBar
        activeCity={activeCity}
        onCityChange={setActiveCity}
        onClose={closeWidget}
      />

      <div className="flex items-start gap-4">
        <div className="flex w-[274px] flex-col gap-4">
          <DiningCarouselWidget />

          <div className="flex gap-4">
            <CultureAlbumWidget />
            <ClockWidget />
          </div>

          <InteractiveExperimentWidget />
        </div>

        <div className="flex w-[370px] flex-col gap-4">
          <OfficeWidget />
          <NewsWidget />
        </div>
      </div>
    </div>
  );
}
