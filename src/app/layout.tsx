import type { Metadata } from "next";
import { OverlayProvider } from "@/context/OverlayContext";
import { AppShell } from "@/components/layout/AppShell";
import { kotoheim, kotoheimMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "experiments.koto.com",
  description: "Koto experiments — The Creative Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kotoheim.variable} ${kotoheimMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <OverlayProvider>
          <AppShell>{children}</AppShell>
        </OverlayProvider>
      </body>
    </html>
  );
}
