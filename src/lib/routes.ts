export const routes = {
  home: "/",
  navigation: "/default",
  widget: "/Navigation",
  play: "/play",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export function isHomeFlow(pathname: string) {
  return (
    pathname === routes.home ||
    pathname === routes.navigation ||
    pathname === routes.widget
  );
}
