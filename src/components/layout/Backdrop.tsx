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
          ? "bg-black/50 backdrop-blur-[20px]"
          : "bg-black/40 backdrop-blur-sm"
      }`}
      onClick={handleClick}
    />
  );
}
