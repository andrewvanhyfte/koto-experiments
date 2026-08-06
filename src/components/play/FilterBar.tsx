"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon, ShareIcon } from "@/components/ui/Icons";
import { useOverlay } from "@/context/OverlayContext";
import { playCards } from "@/lib/play-cards";

type LocationId =
  | "everywhere"
  | "north-america"
  | "los-angeles"
  | "new-york"
  | "emea"
  | "london"
  | "berlin"
  | "dubai"
  | "apac"
  | "sydney"
  | "shanghai"
  | "singapore";

type DisciplineId =
  | "all"
  | "image-gen"
  | "vibe-coding"
  | "sonic"
  | "typography"
  | "creative-technology"
  | "motion"
  | "digital-product"
  | "copywriting"
  | "strategy";

const LOCATION_REGIONS: {
  id: LocationId;
  label: string;
  cities?: { id: LocationId; label: string }[];
}[] = [
  {
    id: "north-america",
    label: "North America",
    cities: [
      { id: "los-angeles", label: "Los Angeles" },
      { id: "new-york", label: "New York" },
    ],
  },
  {
    id: "emea",
    label: "EMEA",
    cities: [
      { id: "london", label: "London" },
      { id: "berlin", label: "Berlin" },
      { id: "dubai", label: "Dubai" },
    ],
  },
  {
    id: "apac",
    label: "APAC",
    cities: [
      { id: "sydney", label: "Sydney" },
      { id: "shanghai", label: "Shanghai" },
      { id: "singapore", label: "Singapore" },
    ],
  },
];

const DISCIPLINES: { id: DisciplineId; label: string }[] = [
  { id: "image-gen", label: "image gen" },
  { id: "vibe-coding", label: "vibe coding" },
  { id: "sonic", label: "sonic" },
  { id: "typography", label: "typography" },
  { id: "creative-technology", label: "creative technology" },
  { id: "motion", label: "motion" },
  { id: "digital-product", label: "digital product" },
  { id: "copywriting", label: "copywriting" },
  { id: "strategy", label: "STRATEGY" },
];

const CLOSED_LABELS: Partial<Record<LocationId, string>> = {
  everywhere: "Everywhere",
  "north-america": "North America",
  "los-angeles": "Los Angeles",
  "new-york": "New York",
  emea: "EMEA",
  london: "London",
  berlin: "Berlin",
  dubai: "Dubai",
  apac: "APAC",
  sydney: "Sydney",
  shanghai: "Shanghai",
  singapore: "Singapore",
};

const CLOSED_COUNTS: Partial<Record<LocationId, number>> = {
  everywhere: 48,
  "north-america": 30,
  "los-angeles": 30,
  "new-york": 18,
  emea: 12,
  london: 12,
  berlin: 9,
  dubai: 4,
  apac: 7,
  sydney: 7,
  shanghai: 5,
  singapore: 3,
};

function RadioMark({ active }: { active: boolean }) {
  return (
    <span className="relative size-2.5 shrink-0 overflow-hidden" aria-hidden>
      {active ? (
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      ) : (
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-[var(--color-grey)]" />
      )}
    </span>
  );
}

function CityMark({ active }: { active: boolean }) {
  return (
    <span className="relative size-2.5 shrink-0" aria-hidden>
      {active ? (
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      ) : (
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] border-[var(--color-grey)]" />
      )}
    </span>
  );
}

export function FilterBar() {
  const { filterOpen, toggleFilter } = useOverlay();
  const rootRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<LocationId>("los-angeles");
  const [discipline, setDiscipline] = useState<DisciplineId>("all");

  const closedLabel = CLOSED_LABELS[location] ?? "Los Angeles";
  const closedCount = CLOSED_COUNTS[location] ?? playCards.length;
  const showingCount =
    location === "everywhere"
      ? 48
      : location === "los-angeles"
        ? 13
        : (CLOSED_COUNTS[location] ?? playCards.length);

  useEffect(() => {
    if (!filterOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        toggleFilter();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [filterOpen, toggleFilter]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "Koto Play", url });
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  const filterRowClass =
    "flex w-full items-center gap-1.5 text-left text-overline-large uppercase transition-colors";

  if (filterOpen) {
    return (
      <div
        ref={rootRef}
        className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
      >
        {/* Open Toolbar — Figma 346:4478 */}
        <div className="relative isolate drop-shadow-[0px_8px_10px_rgba(6,6,6,0.7)]">
          <div className="relative isolate flex items-start gap-2 rounded-[6px] bg-[var(--color-off-black)] p-1">
            {/* Left summary */}
            <div className="relative z-[2] flex w-[160px] shrink-0 items-start px-3 py-4 backdrop-blur-[40px]">
              <div className="text-overline-large uppercase leading-[1.1]">
                <p className="mb-[17px] text-white/50">Showing:</p>
                <p className="text-white">
                  {showingCount} experiments
                  <br aria-hidden />
                  <br aria-hidden />
                </p>
              </div>
            </div>

            {/* Filters panel */}
            <div className="relative z-[1] flex shrink-0 gap-3 rounded bg-white/[0.05] px-6 pb-4 pt-3">
              {/* Location column */}
              <div className="flex min-w-[180px] flex-col items-start">
                <button
                  type="button"
                  onClick={() => setLocation("everywhere")}
                  className={`${filterRowClass} gap-1.5 py-2 ${
                    location === "everywhere"
                      ? "text-white"
                      : "text-[var(--color-grey)] hover:text-white"
                  }`}
                >
                  <RadioMark active={location === "everywhere"} />
                  <span>Everywhere</span>
                </button>

                <div className="flex w-full flex-col items-start">
                  {LOCATION_REGIONS.map((region) => {
                    const regionActive = location === region.id;
                    return (
                      <div
                        key={region.id}
                        className="flex w-full flex-col items-start pb-1.5 last:pb-1"
                      >
                        <button
                          type="button"
                          onClick={() => setLocation(region.id)}
                          className={`${filterRowClass} pb-2 pt-1.5 ${
                            regionActive
                              ? "text-white"
                              : "text-[var(--color-grey)] hover:text-white"
                          }`}
                        >
                          <RadioMark active={regionActive} />
                          <span>{region.label}</span>
                        </button>

                        {region.cities?.map((city) => {
                          const cityActive = location === city.id;
                          return (
                            <button
                              key={city.id}
                              type="button"
                              onClick={() => setLocation(city.id)}
                              className={`${filterRowClass} gap-1 px-4 py-1 ${
                                cityActive
                                  ? "text-white"
                                  : "text-[var(--color-grey)] hover:text-white"
                              }`}
                            >
                              <CityMark active={cityActive} />
                              <span>{city.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Discipline column */}
              <div className="flex min-w-[180px] flex-col items-start">
                <button
                  type="button"
                  onClick={() => setDiscipline("all")}
                  className={`${filterRowClass} py-2 ${
                    discipline === "all"
                      ? "text-white"
                      : "text-[var(--color-grey)] hover:text-white"
                  }`}
                >
                  <RadioMark active={discipline === "all"} />
                  <span>all</span>
                </button>

                <div className="flex w-full flex-col items-start">
                  {DISCIPLINES.map((item) => {
                    const active = discipline === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDiscipline(item.id)}
                        className={`${filterRowClass} py-1.5 ${
                          active
                            ? "text-white"
                            : "text-[var(--color-grey)] hover:text-white"
                        }`}
                      >
                        <RadioMark active={active} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
    >
      {/* Closed Toolbar — Figma 346:4594 */}
      <div className="relative isolate drop-shadow-[0px_8px_10px_rgba(6,6,6,0.7)]">
        <div className="flex h-11 w-[280px] flex-col items-center justify-center rounded-[6px] bg-[var(--color-off-black)] p-1">
          <div className="relative isolate flex h-full w-full min-w-[280px] items-center justify-between p-1 backdrop-blur-[40px]">
            <div className="relative z-[2] flex items-center">
              <button
                type="button"
                onClick={toggleFilter}
                aria-expanded={false}
                aria-label="Open location filter"
                className="flex items-center justify-center rounded-[2px] p-3 text-white backdrop-blur-[40px] transition-opacity hover:opacity-80"
              >
                <span className="flex items-center mix-blend-exclusion">
                  <SearchIcon className="size-2.5" />
                </span>
              </button>

              <button
                type="button"
                onClick={toggleFilter}
                className="flex items-center justify-center rounded-[2px] px-0.5 py-3 backdrop-blur-[40px] transition-opacity hover:opacity-80"
              >
                <span className="flex h-2.5 items-center mix-blend-exclusion">
                  <span className="text-overline-large whitespace-nowrap">
                    <span className="text-[var(--color-grey)]">VIEWING:</span>
                    <span className="text-white">{` ${closedLabel.toUpperCase()} (${closedCount})`}</span>
                  </span>
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share this view"
              className="relative z-[1] flex h-9 min-w-9 items-center justify-center rounded-[2px] bg-white/[0.05] p-3 text-white backdrop-blur-[40px] transition-colors hover:bg-white/[0.08]"
            >
              <span className="flex items-center mix-blend-exclusion">
                <ShareIcon className="size-2.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
