import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/content";
import { buildSchema } from "@/lib/schema";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Technology partner for digital transformation`,
    template: `%s — ${site.name}`,
  },
  description:
    "PrimeNex IT delivers cutting-edge technological solutions: IT support and digital transformation, web platforms, data analysis and embedded systems. Cartago, Costa Rica.",
  keywords: [
    "PrimeNex IT",
    "digital transformation Costa Rica",
    "embedded systems",
    "web development",
    "business intelligence",
    "CRM ERP integration",
    "nearshore software development",
    "Cartago Costa Rica",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Technology partner for digital transformation`,
    description:
      "IT support, web platforms, data analysis and embedded systems, engineered end to end from Cartago, Costa Rica.",
    },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Technology partner for digital transformation`,
    description:
      "IT support, web platforms, data analysis and embedded systems, engineered end to end.",
  },
  alternates: { canonical: site.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="btn btn-solid sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
        />
      </body>
    </html>
  );
}
