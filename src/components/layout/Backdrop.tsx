"use client";

import { useOverlay } from "@/context/OverlayContext";

export function Backdrop() {
  const { mainNavOpen, widgetOpen, closeAllOverlays, closeMainNav } =
    useOverlay();

  if (!mainNavOpen && !widgetOpen) return null;

  const handleClick = () => {
    if (mainNavOpen) {
      closeMainNav();
      return;
    }
    closeAllOverlays();
  };

  return (
    <button
      type="button"
      aria-label="Close overlay"
      className={`fixed inset-0 z-40 ${
        widgetOpen
          ? // Solid dim only — backdrop-filter freezes animated GIFs/videos
            // in Chromium while the widget menu is open.
            "bg-black/60"
          : "bg-black/40 backdrop-blur-sm"
      }`}
      onClick={handleClick}
    />
  );
}
