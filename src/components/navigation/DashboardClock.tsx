"use client";

import { usePathname } from "next/navigation";
import { GridIcon, InteractiveIcon } from "@/components/ui/Icons";
import { routes } from "@/lib/routes";
import { useOverlay } from "@/context/OverlayContext";

type DashboardVariant = "glass" | "minimal" | "solid";

function getVariant(pathname: string): DashboardVariant {
  if (pathname === routes.play) return "solid";
  if (pathname === routes.home) return "glass";
  return "minimal";
}

const variantStyles: Record<
  DashboardVariant,
  { button: string; inner: string; text: string; icon: "grid" | "interactive" }
> = {
  glass: {
    button: "rounded p-1 backdrop-blur-[6px] hover:bg-white/5",
    inner:
      "flex items-center gap-2 rounded bg-white/5 py-2 pl-3 pr-1 mix-blend-exclusion",
    text: "font-mono text-[11px] uppercase leading-none text-white mix-blend-difference",
    icon: "grid",
  },
  minimal: {
    button: "rounded-tr-sm p-1",
    inner:
      "flex items-center gap-2 py-2 pl-3 pr-1 mix-blend-exclusion",
    text: "font-mono text-[11px] uppercase leading-none text-white/80 mix-blend-difference",
    icon: "grid",
  },
  solid: {
    button:
      "rounded rounded-tr-sm bg-[rgba(6,6,6,0.9)] p-1 hover:bg-[rgba(6,6,6,0.95)]",
    inner: "flex items-center gap-2 py-2 pl-3 pr-1 mix-blend-exclusion",
    text: "font-mono text-[11px] uppercase leading-none text-white/80 mix-blend-difference",
    icon: "interactive",
  },
};

export function DashboardClock() {
  const pathname = usePathname();
  const { toggleWidget, widgetOpen } = useOverlay();
  const isOpen = widgetOpen || pathname === routes.widget;
  const variant = getVariant(pathname);
  const styles = variantStyles[variant];

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={toggleWidget}
      aria-label="Open widget menu"
      aria-expanded={false}
      className={`flex h-12 items-center transition-colors ${styles.button}`}
    >
      <div className={styles.inner}>
        <span className={styles.text}>10:03 UTC-8</span>
        <span className="relative flex size-6 shrink-0 items-center justify-center rounded-sm mix-blend-difference">
          {styles.icon === "interactive" ? (
            <InteractiveIcon className="size-2.5 text-white" />
          ) : (
            <GridIcon className="size-2.5 text-white" />
          )}
        </span>
      </div>
    </button>
  );
}
