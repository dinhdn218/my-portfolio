import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/data/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dnd-portfolio.vercel.app";
const description =
  "Đinh Ngọc Định, fullstack developer in Hà Nội. Frontend-first with React, Next.js and TypeScript; news platforms, a national KOL portal and an event SaaS shipped to production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} · ${profile.role}`,
  description,
  authors: [{ name: profile.name, url: profile.links.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: `${profile.name} · ${profile.role}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} · ${profile.role}`, description },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f131a" },
  ],
};

/** Applies a saved theme before first paint so the page never flashes the wrong colors. */
const themeScript = `try{var t=localStorage.getItem('dnd-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
