"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type NavBarMode = "exposed" | "collapsed";
export type CardState = "rest" | "hover" | "expand" | "move" | "minimize";

type OverlayContextValue = {
  navBarMode: NavBarMode;
  mainNavOpen: boolean;
  widgetOpen: boolean;
  filterOpen: boolean;
  zoomLevel: number;
  activeCardId: string | null;
  cardStates: Record<string, CardState>;
  breadcrumb: string;
  openMainNav: () => void;
  closeMainNav: () => void;
  toggleMainNav: () => void;
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
  toggleFilter: () => void;
  closeAllOverlays: () => void;
  setZoomLevel: (level: number) => void;
  setActiveCard: (id: string | null) => void;
  setCardState: (id: string, state: CardState) => void;
  navigate: (href: string) => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

function getRouteDefaults(pathname: string) {
  if (pathname === "/") {
    return { navBarMode: "exposed" as const, widgetOpen: false, breadcrumb: "home" };
  }
  if (pathname === "/default") {
    return { navBarMode: "collapsed" as const, widgetOpen: false, breadcrumb: "home" };
  }
  if (pathname === "/Navigation") {
    return { navBarMode: "collapsed" as const, widgetOpen: true, breadcrumb: "home" };
  }
  if (pathname === "/play") {
    return { navBarMode: "collapsed" as const, widgetOpen: false, breadcrumb: "play" };
  }
  return { navBarMode: "collapsed" as const, widgetOpen: false, breadcrumb: "home" };
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routeDefaults = getRouteDefaults(pathname);

  const [mainNavOpen, setMainNavOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(routeDefaults.widgetOpen);
  const [filterOpen, setFilterOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});

  useEffect(() => {
    const defaults = getRouteDefaults(pathname);
    setWidgetOpen(defaults.widgetOpen);
    setMainNavOpen(false);
    setFilterOpen(false);
  }, [pathname]);

  const closeAllOverlays = useCallback(() => {
    setMainNavOpen(false);
    setWidgetOpen(false);
    setFilterOpen(false);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      closeAllOverlays();
      router.push(href);
    },
    [closeAllOverlays, router],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllOverlays();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeAllOverlays]);

  const setCardState = useCallback((id: string, state: CardState) => {
    setCardStates((prev) => ({ ...prev, [id]: state }));
  }, []);

  const value = useMemo<OverlayContextValue>(
    () => ({
      navBarMode: routeDefaults.navBarMode,
      mainNavOpen,
      widgetOpen,
      filterOpen,
      zoomLevel,
      activeCardId,
      cardStates,
      breadcrumb: routeDefaults.breadcrumb,
      openMainNav: () => setMainNavOpen(true),
      closeMainNav: () => setMainNavOpen(false),
      toggleMainNav: () => setMainNavOpen((open) => !open),
      openWidget: () => setWidgetOpen(true),
      closeWidget: () => setWidgetOpen(false),
      toggleWidget: () => setWidgetOpen((open) => !open),
      toggleFilter: () => setFilterOpen((open) => !open),
      closeAllOverlays,
      setZoomLevel,
      setActiveCard: setActiveCardId,
      setCardState,
      navigate,
    }),
    [
      routeDefaults,
      mainNavOpen,
      widgetOpen,
      filterOpen,
      zoomLevel,
      activeCardId,
      cardStates,
      closeAllOverlays,
      navigate,
      setCardState,
    ],
  );

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within OverlayProvider");
  }
  return context;
}
