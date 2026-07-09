import { routes } from "./routes";

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const mainNavItems: NavItem[] = [
  {
    label: "Work",
    children: [{ label: "See our experiments", href: routes.play }],
  },
  { label: "Play", href: routes.play },
  { label: "About", href: routes.navigation },
  { label: "Services", href: routes.navigation },
  { label: "Latest", href: routes.navigation },
  { label: "Careers", href: routes.navigation },
  { label: "Contact", href: routes.navigation },
];

export const channelLinks = [
  { label: "Instagram", href: "https://www.instagram.com/koto" },
  { label: "Off.Live", href: "https://off.live" },
  { label: "Off.Brand", href: "https://offbrand.com" },
  { label: "SEASONED", href: "https://seasoned.koto.com" },
] as const;

export const exposedNavLinks = [
  { label: "Work", opensNav: true, highlightsWork: true },
  { label: "About", opensNav: true },
  { label: "Latest", opensNav: true },
  { label: "Careers", opensNav: true },
  { label: "Contact", opensNav: true },
] as const;

export const widgetCities = [
  "Los Angeles",
  "NYC",
  "LDN",
  "BER",
  "SYD",
] as const;

export const widgetNewsItems = [
  {
    title: "OFF Social arrives to New York",
    description: "Our invite-only dinner series visits NYC",
    category: "Events",
    href: "https://koto.com/latest",
    imageKey: "widgetNews1" as const,
  },
  {
    title: "Best music app of 2024",
    description: "Deezer, one the best streaming platforms",
    category: "Press",
    href: "https://koto.com/latest",
  },
  {
    title: "Off.Newsletter #04",
    description: "Brand evolution or revolution?",
    category: "Opinions",
    href: "https://koto.com/latest",
    imageKey: "widgetNews3" as const,
  },
] as const;
