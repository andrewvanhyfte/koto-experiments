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
import { isHomeFlow, routes } from "@/lib/routes";

export type NavBarMode = "exposed" | "collapsed";
export type CardState =
  | "rest"
  | "hover"
  | "expand"
  | "move"
  | "minimize"
  | "side-panel";
export type PanOffset = { x: number; y: number };

type OverlayContextValue = {
  navBarMode: NavBarMode;
  mainNavOpen: boolean;
  widgetOpen: boolean;
  filterOpen: boolean;
  zoomLevel: number;
  panOffset: PanOffset;
  activeCardId: string | null;
  cardStates: Record<string, CardState>;
  breadcrumb: string;
  highlightedNavItem: string | null;
  openMainNav: (highlight?: string) => void;
  closeMainNav: () => void;
  toggleMainNav: () => void;
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
  toggleFilter: () => void;
  closeAllOverlays: () => void;
  goHome: () => void;
  openNavFromExposed: (highlight?: string) => void;
  setZoomLevel: (level: number) => void;
  setPanOffset: (offset: PanOffset) => void;
  resetView: () => void;
  setActiveCard: (id: string | null) => void;
  setCardState: (id: string, state: CardState) => void;
  navigate: (href: string) => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

function getRouteDefaults(pathname: string) {
  if (pathname === routes.home) {
    return {
      navBarMode: "exposed" as const,
      widgetOpen: false,
      breadcrumb: "home",
    };
  }
  if (pathname === routes.navigation) {
    return {
      navBarMode: "collapsed" as const,
      widgetOpen: false,
      breadcrumb: "home",
    };
  }
  if (pathname === routes.widget) {
    return {
      navBarMode: "collapsed" as const,
      widgetOpen: true,
      breadcrumb: "home",
    };
  }
  if (pathname === routes.play) {
    return {
      navBarMode: "collapsed" as const,
      widgetOpen: false,
      breadcrumb: "play",
    };
  }
  return {
    navBarMode: "collapsed" as const,
    widgetOpen: false,
    breadcrumb: "home",
  };
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routeDefaults = getRouteDefaults(pathname);

  const [mainNavOpen, setMainNavOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(routeDefaults.widgetOpen);
  const [filterOpen, setFilterOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState<PanOffset>({ x: 0, y: 0 });
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});
  const [highlightedNavItem, setHighlightedNavItem] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const defaults = getRouteDefaults(pathname);
    setWidgetOpen(defaults.widgetOpen);
    setMainNavOpen(false);
    setFilterOpen(false);
    setHighlightedNavItem(null);
  }, [pathname]);

  const closeAllOverlays = useCallback(() => {
    setMainNavOpen(false);
    setFilterOpen(false);
    setHighlightedNavItem(null);
    if (pathname === routes.widget) {
      router.push(routes.navigation);
    } else {
      setWidgetOpen(false);
    }
  }, [pathname, router]);

  const navigate = useCallback(
    (href: string) => {
      setMainNavOpen(false);
      setFilterOpen(false);
      setHighlightedNavItem(null);
      router.push(href);
    },
    [router],
  );

  const goHome = useCallback(() => {
    navigate(routes.home);
  }, [navigate]);

  const openMainNav = useCallback(
    (highlight?: string) => {
      if (pathname === routes.home) {
        router.push(routes.navigation);
      }
      setMainNavOpen(true);
      setHighlightedNavItem(highlight ?? null);
    },
    [pathname, router],
  );

  const openNavFromExposed = useCallback(
    (highlight?: string) => {
      setMainNavOpen(true);
      setHighlightedNavItem(highlight ?? null);
      if (pathname === routes.home) {
        router.push(routes.navigation);
      }
    },
    [pathname, router],
  );

  const closeMainNav = useCallback(() => {
    setMainNavOpen(false);
    setHighlightedNavItem(null);
  }, []);

  const toggleMainNav = useCallback(() => {
    if (mainNavOpen) {
      closeMainNav();
    } else {
      openMainNav();
    }
  }, [closeMainNav, mainNavOpen, openMainNav]);

  const openWidget = useCallback(() => {
    if (isHomeFlow(pathname)) {
      router.push(routes.widget);
    } else {
      setWidgetOpen(true);
    }
  }, [pathname, router]);

  const closeWidget = useCallback(() => {
    if (pathname === routes.widget) {
      router.push(routes.navigation);
    } else {
      setWidgetOpen(false);
    }
  }, [pathname, router]);

  const toggleWidget = useCallback(() => {
    if (widgetOpen || pathname === routes.widget) {
      closeWidget();
    } else {
      openWidget();
    }
  }, [closeWidget, openWidget, pathname, widgetOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (mainNavOpen) {
        closeMainNav();
        return;
      }
      if (widgetOpen || pathname === routes.widget) {
        closeWidget();
        return;
      }
      if (filterOpen) {
        setFilterOpen(false);
        return;
      }

      const sidePanelId = Object.entries(cardStates).find(
        ([, state]) => state === "side-panel",
      )?.[0];
      if (sidePanelId) {
        setCardStates((prev) => ({ ...prev, [sidePanelId]: "minimize" }));
        setActiveCardId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    cardStates,
    closeMainNav,
    closeWidget,
    filterOpen,
    mainNavOpen,
    pathname,
    widgetOpen,
  ]);

  const setCardState = useCallback((id: string, state: CardState) => {
    setCardStates((prev) => {
      const next: Record<string, CardState> = { ...prev, [id]: state };

      // One advanced preview / deep dive at a time across the canvas.
      if (state === "expand" || state === "side-panel") {
        for (const key of Object.keys(next)) {
          if (key === id) continue;
          if (next[key] === "expand") {
            next[key] = "rest";
          }
          if (state === "side-panel" && next[key] === "side-panel") {
            next[key] = "minimize";
          }
        }
      }

      return next;
    });
  }, []);

  const resetView = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const value = useMemo<OverlayContextValue>(
    () => ({
      navBarMode: routeDefaults.navBarMode,
      mainNavOpen,
      widgetOpen,
      filterOpen,
      zoomLevel,
      panOffset,
      activeCardId,
      cardStates,
      breadcrumb: routeDefaults.breadcrumb,
      highlightedNavItem,
      openMainNav,
      closeMainNav,
      toggleMainNav,
      openWidget,
      closeWidget,
      toggleWidget,
      toggleFilter: () => setFilterOpen((open) => !open),
      closeAllOverlays,
      goHome,
      openNavFromExposed,
      setZoomLevel,
      setPanOffset,
      resetView,
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
      panOffset,
      activeCardId,
      cardStates,
      highlightedNavItem,
      openMainNav,
      closeMainNav,
      toggleMainNav,
      openWidget,
      closeWidget,
      toggleWidget,
      closeAllOverlays,
      goHome,
      openNavFromExposed,
      resetView,
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
