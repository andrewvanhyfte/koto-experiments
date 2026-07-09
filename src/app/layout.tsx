import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OverlayProvider } from "@/context/OverlayContext";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <OverlayProvider>
          <AppShell>{children}</AppShell>
        </OverlayProvider>
      </body>
    </html>
  );
}
