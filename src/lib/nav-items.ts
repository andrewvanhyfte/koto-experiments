import { routes } from "./routes";

export type NavItem = {
  label: string;
  href?: string;
  /** Shown on hover instead of label (e.g. Careers → Join the team) */
  hoverLabel?: string;
  /** Trailing active/section indicator (dot) */
  showIndicator?: boolean;
  /** Work focus replaces Play with this submenu item */
  children?: { label: string; href: string }[];
};

export const mainNavItems: NavItem[] = [
  {
    label: "Work",
    children: [{ label: "See our experiments", href: routes.play }],
  },
  { label: "Play", href: routes.play, showIndicator: true },
  { label: "About", href: routes.navigation },
  {
    label: "Careers",
    href: routes.navigation,
    hoverLabel: "Join the team",
  },
  { label: "Latest", href: routes.navigation },
  { label: "Contact", href: routes.navigation },
];

export const channelLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/koto",
    preview: null,
  },
  {
    label: "Off.Live",
    href: "https://off.live",
    preview: null,
  },
  {
    label: "Off.Brand",
    href: "https://offbrand.com",
    preview: "/widgets/channel-preview-off.png",
  },
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
