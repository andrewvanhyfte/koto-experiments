export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const mainNavItems: NavItem[] = [
  {
    label: "Work",
    children: [{ label: "See our experiments", href: "/play" }],
  },
  { label: "Play", href: "/play" },
  { label: "About" },
  { label: "Services" },
  { label: "Latest" },
  { label: "Careers" },
  { label: "Contact" },
];

export const channelLinks = [
  "Instagram",
  "Off.Live",
  "Off.Brand",
  "SEASONED",
];

export const exposedNavLinks = [
  "Work",
  "About",
  "Latest",
  "Careers",
  "Contact",
];

export const widgetCities = [
  "Los Angeles",
  "NYC",
  "LDN",
  "BER",
  "SYD",
];
