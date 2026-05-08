import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";
import { BRANDING } from "@/lib/branding";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRANDING.name} — Légumes frais à Dakar`,
    template: `%s · ${BRANDING.name}`,
  },
  description:
    "Légumes et fruits livrés sur Dakar. Commandez avant minuit pour une livraison le lendemain matin.",
  icons: {
    icon: BRANDING.favicon,
    shortcut: BRANDING.favicon,
    apple: BRANDING.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body
        className="flex min-h-dvh min-h-[100dvh] flex-col bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
