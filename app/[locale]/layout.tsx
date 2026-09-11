import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Newsreader } from "next/font/google";
import { localeCodes, isLocale, localeMeta, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { alternateLanguages, localeUrl } from "@/lib/i18n/seo";
import { buildSchema } from "@/lib/schema";
import { site } from "@/lib/content";
import "../globals.css";

/**
 * One family, with range. Financial and legal documents are set in serif; a
 * consultancy in this field set in a grotesque reads like every other software
 * company. Newsreader was drawn for screen reading, so it carries body copy at
 * 17px without the fragility of a display serif.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Six locales, six prerendered documents. */
export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

/** Anything outside the six is a 404, not an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const url = localeUrl(locale);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      type: "website",
      locale: localeMeta(locale).htmlLang,
      url,
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
    },
    alternates: {
      canonical: url,
      languages: alternateLanguages(),
    },
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
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const meta = localeMeta(locale as Locale);
  const dict = getDictionary(locale as Locale);

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${newsreader.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="btn btn-solid sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          {dict.a11y.skipToContent}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildSchema(locale as Locale)),
          }}
        />
      </body>
    </html>
  );
}
