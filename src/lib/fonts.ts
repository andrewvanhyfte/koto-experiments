import localFont from "next/font/local";

export const kotoheim = localFont({
  src: "../fonts/GT-Kotoheim-VF.ttf",
  variable: "--font-kotoheim",
  weight: "100 900",
  display: "swap",
});

export const kotoheimMono = localFont({
  src: "../fonts/GT-Kotoheim-Mono-Medium-VF.ttf",
  variable: "--font-kotoheim-mono",
  weight: "500",
  display: "swap",
});
