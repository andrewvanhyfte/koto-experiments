"use client";

import { useOverlay } from "@/context/OverlayContext";

export function Backdrop() {
  const { mainNavOpen, widgetOpen, closeAllOverlays } = useOverlay();

  if (!mainNavOpen && !widgetOpen) return null;

  return (
    <button
      type="button"
      aria-label="Close overlay"
      className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
      onClick={closeAllOverlays}
    />
  );
}
