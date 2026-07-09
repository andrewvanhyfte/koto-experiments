"use client";

import { GridIcon } from "@/components/ui/Icons";
import { widgetCities } from "@/lib/nav-items";

type WidgetCityBarProps = {
  activeCity: string;
  onCityChange: (city: string) => void;
  onClose: () => void;
};

export function WidgetCityBar({
  activeCity,
  onCityChange,
  onClose,
}: WidgetCityBarProps) {
  return (
    <div className="flex h-12 w-[370px] items-center justify-between rounded-md rounded-tr-sm bg-white/5 p-1 backdrop-blur-[9.6px]">
      <div className="flex h-full min-w-0 flex-1 items-center justify-between">
        {widgetCities.map((city) => {
          const isActive = activeCity === city;
          return (
            <button
              key={city}
              type="button"
              onClick={() => onCityChange(city)}
              className={`flex h-full min-w-[45px] items-center justify-center rounded-sm px-3 font-mono text-[11px] uppercase leading-none transition-colors ${
                isActive
                  ? "bg-white/5 text-white"
                  : "text-[#989898] hover:text-white"
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close widget menu"
        className="flex h-full items-center justify-center px-4 text-white transition-colors hover:bg-white/5"
      >
        <GridIcon className="size-2.5" />
      </button>
    </div>
  );
}
