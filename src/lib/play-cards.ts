import { assets } from "./assets";

export type PlayCardData = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  tools: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const playCards: PlayCardData[] = [
  {
    id: "cc-type",
    title: "CC Type Social Launch",
    subtitle: "Brand Identity Experimentation",
    author: "ANDREW VAN HYFTE, KOTO LA",
    category: "Vibe Coding",
    tools: "Claude Code, Google AI Studio",
    image: assets.playCard1,
    x: 80,
    y: 180,
    width: 320,
    height: 280,
  },
  {
    id: "ikea",
    title: "IKEA Pitch - AR Assembly Mode",
    subtitle: "Digital Product Experimentation",
    author: "LUCY SI, KOTO LA",
    category: "Image Gen",
    tools: "Weavy, Veo3, Midjourney",
    image: assets.playCard2,
    x: 420,
    y: 120,
    width: 280,
    height: 360,
  },
  {
    id: "creamery",
    title: "Anti-Moo Creamery - Website",
    subtitle: "Website – Dairy Free Experimentation",
    author: "LUCY SI, KOTO LA",
    category: "Image Gen",
    tools: "Gemini Nano Banana Pro",
    image: assets.playCard3,
    x: 720,
    y: 200,
    width: 300,
    height: 320,
  },
  {
    id: "wtf",
    title: "WTFOMGBBQLOL - Visual Experiment",
    subtitle: "Motion Design Experimentation",
    author: "ANDREW VAN HYFTE, KOTO LA",
    category: "Vibe Coding",
    tools: "Claude Code, Google AI Studio",
    image: assets.playCard4,
    x: 980,
    y: 160,
    width: 260,
    height: 300,
  },
  {
    id: "shopify",
    title: "Shopify Pitch",
    subtitle: "E-commerce Experimentation",
    author: "ANDREW VAN HYFTE, KOTO LA",
    category: "Vibe Coding",
    tools: "Claude Code",
    image: assets.playCard5,
    x: 1180,
    y: 100,
    width: 240,
    height: 260,
  },
  {
    id: "nook",
    title: "Nook",
    subtitle: "Website Interaction",
    author: "LUCY SI, KOTO LA",
    category: "Image Gen",
    tools: "Midjourney",
    image: assets.playCard5,
    x: 300,
    y: 480,
    width: 260,
    height: 240,
  },
];
