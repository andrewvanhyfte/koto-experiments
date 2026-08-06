export const GRID_SIZE = 24;
export const PLAY_YELLOW = "var(--color-yellow)";
export const GRID_DOT_COLOR = "var(--color-yellow-dot)";

export const PLAY_ZOOM_MIN = 0.5;
export const PLAY_ZOOM_MAX = 1.5;
export const PLAY_ZOOM_STEP = 0.1;

export type PanOffset = { x: number; y: number };

export function clampPlayZoom(zoom: number) {
  return Math.min(PLAY_ZOOM_MAX, Math.max(PLAY_ZOOM_MIN, zoom));
}

export function zoomAtPoint(
  currentZoom: number,
  currentPan: PanOffset,
  newZoom: number,
  focalX: number,
  focalY: number,
) {
  const zoom = clampPlayZoom(newZoom);
  const worldX = (focalX - currentPan.x) / currentZoom;
  const worldY = (focalY - currentPan.y) / currentZoom;

  return {
    zoom,
    pan: {
      x: focalX - worldX * zoom,
      y: focalY - worldY * zoom,
    },
  };
}

export function getInfiniteGridStyle(zoom: number, pan: PanOffset) {
  const tileSize = GRID_SIZE * zoom;

  return {
    backgroundColor: PLAY_YELLOW,
    backgroundImage: `radial-gradient(circle, ${GRID_DOT_COLOR} 1px, transparent 1px)`,
    backgroundSize: `${tileSize}px ${tileSize}px`,
    backgroundPosition: `${pan.x}px ${pan.y}px`,
  };
}
