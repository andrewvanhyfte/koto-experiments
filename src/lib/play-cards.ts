import { assets } from "./assets";

export type PlayCardGalleryItem = {
  src: string;
  caption: string;
  /** Tailwind aspect ratio class, e.g. aspect-[562/422] */
  aspectClass: string;
};

export type PlayCardDeepDive = {
  sectionIndex: string;
  sectionTitle: string;
  description: string;
  body: string;
  heroImage: string;
  gallery: PlayCardGalleryItem[];
};

export type PlayCardData = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  tools: string;
  image: string;
  /** Optional footer/minimized thumb when different from hero */
  thumbImage?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  deepDive?: PlayCardDeepDive;
};

const defaultDeepDive = (
  card: Pick<PlayCardData, "image" | "title" | "subtitle">,
): PlayCardDeepDive => ({
  sectionIndex: "1.0",
  sectionTitle: "Section title",
  description: "A description if needed",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat sed elit eget vehicula. Aliquam ac risus purus. Aenean placerat quis quam a congue. Aenean rutrum placerat nisi, non interdum est scelerisque mollis hendrerit.",
  heroImage: card.image,
  gallery: [
    {
      src: card.image,
      caption: "Early developmental sketches and process frames",
      aspectClass: "aspect-[562/422]",
    },
    {
      src: card.image,
      caption: "Exploration studies",
      aspectClass: "aspect-[562/702]",
    },
    {
      src: card.image,
      caption: "In-context application",
      aspectClass: "aspect-[562/347]",
    },
  ],
});

export const playCards: PlayCardData[] = [
  {
    id: "cc-type",
    title: "CC Type Social Launch",
    subtitle: "Social Assets",
    author: "ANDREW VAN HYFTE, KOTO LA",
    category: "Image Gen",
    tools: "Weavy, Veo3, Midjourney",
    image: assets.playCard1,
    thumbImage: assets.playCard1Thumb,
    x: 80,
    y: 180,
    width: 320,
    height: 280,
    deepDive: {
      sectionIndex: "1.0",
      sectionTitle: "Section title",
      description: "A description if needed",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat sed elit eget vehicula. Aliquam ac risus purus. Aenean placerat quis quam a congue. Aenean rutrum placerat nisi, non interdum est scelerisque mollis hendrerit.",
      heroImage: assets.playSidePanelHero,
      gallery: [
        {
          src: assets.playSidePanelGallery1,
          caption:
            "Early developmental sketches of some characters of Albertus, by Wolpe",
          aspectClass: "aspect-[562/422]",
        },
        {
          src: assets.playSidePanelGallery2,
          caption: "Johnston printing blocks",
          aspectClass: "aspect-[562/702]",
        },
        {
          src: assets.playSidePanelGallery3,
          caption: "Albertus in Use - City of London",
          aspectClass: "aspect-[562/347]",
        },
      ],
    },
  },
  {
    id: "ikea",
    title: "IKEA Pitch - AR Assembly Mode",
    subtitle: "Digital Product Experimentation",
    author: "LUCY BI, KOTO LA",
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
    author: "LUCY BI, KOTO LA",
    category: "Image Gen",
    tools: "Higgsfield AI, Gemini Nano Banana Pro",
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
    image: assets.playCardShopify,
    x: 1180,
    y: 100,
    width: 240,
    height: 260,
  },
  {
    id: "nook",
    title: "Nook",
    subtitle: "Website Interaction",
    author: "LUCY BI, KOTO LA",
    category: "Image Gen",
    tools: "Midjourney",
    image: assets.playCardNook,
    x: 300,
    y: 480,
    width: 260,
    height: 240,
  },
];

export function getCardDeepDive(card: PlayCardData): PlayCardDeepDive {
  return card.deepDive ?? defaultDeepDive(card);
}
