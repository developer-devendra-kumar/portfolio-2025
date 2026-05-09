import type { Metadata } from "next";
import type { CSSProperties } from "react";
import SiteHeader from "@/components/SiteHeader";
import { loadSiteContentData } from "@/content/loadSiteContent";
import type { ThemeContent } from "@/types/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devendra Kumar - Portfolio",
  description: "Devendra Kumar - Portfolio",
};

function getFontStack(preset: ThemeContent["fontPreset"]): string {
  switch (preset) {
    case "sora":
      return '"Sora", "Avenir Next", "Segoe UI", "Inter", "Helvetica Neue", sans-serif';
    case "outfit":
      return '"Outfit", "Avenir Next", "Segoe UI", "Inter", "Helvetica Neue", sans-serif';
    case "space-grotesk":
    default:
      return '"Space Grotesk", "Avenir Next", "Segoe UI", "Inter", "Helvetica Neue", sans-serif';
  }
}

function buildThemeStyle(theme: ThemeContent): CSSProperties {
  return {
    "--font-site-sans": getFontStack(theme.fontPreset),
    "--font-site-mono":
      '"JetBrains Mono", "IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    "--color-background-light": theme.light.colors.background,
    "--color-foreground-light": theme.light.colors.foreground,
    "--color-card-bg-light": theme.light.colors.cardBackground,
    "--color-primary-light": theme.light.colors.primary,
    "--color-accent-light": theme.light.colors.accent,
    "--color-text-light": theme.light.colors.text,
    "--color-secondary-text-light": theme.light.colors.secondaryText,
    "--color-background-dark": theme.dark.colors.background,
    "--color-foreground-dark": theme.dark.colors.foreground,
    "--color-card-bg-dark": theme.dark.colors.cardBackground,
    "--color-primary-dark": theme.dark.colors.primary,
    "--color-accent-dark": theme.dark.colors.accent,
    "--color-text-dark": theme.dark.colors.text,
    "--color-secondary-text-dark": theme.dark.colors.secondaryText,
    "--color-gradient-light-from": theme.light.gradient.from,
    "--color-gradient-light-via": theme.light.gradient.via,
    "--color-gradient-light-to": theme.light.gradient.to,
    "--color-gradient-dark-from": theme.dark.gradient.from,
    "--color-gradient-dark-via": theme.dark.gradient.via,
    "--color-gradient-dark-to": theme.dark.gradient.to,
  } as CSSProperties;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await loadSiteContentData();
  const themeStyle = buildThemeStyle(content.theme);

  return (
    <html lang="en">
      <body className="antialiased" style={themeStyle}>
        <SiteHeader />
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
