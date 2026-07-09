"use client";

import { useOverlay } from "@/context/OverlayContext";
import { Backdrop } from "./Backdrop";
import { MainNavigation } from "../navigation/MainNavigation";
import { TopBarCollapsed } from "../navigation/TopBarCollapsed";
import { TopBarExposed } from "../navigation/TopBarExposed";
import { WidgetMenu } from "../navigation/WidgetMenu";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { navBarMode } = useOverlay();

  return (
    <>
      {navBarMode === "exposed" ? <TopBarExposed /> : <TopBarCollapsed />}
      <Backdrop />
      <MainNavigation />
      <WidgetMenu />
      {children}
    </>
  );
}
