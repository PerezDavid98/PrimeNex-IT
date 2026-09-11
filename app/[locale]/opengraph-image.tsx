import { ImageResponse } from "next/og";
import { isLocale, localeCodes, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

export async function generateImageMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  return [
    {
      id: locale,
      size,
      contentType,
      alt: getDictionary(locale).meta.title,
    },
  ];
}

/**
 * Share card, generated rather than drawn, so it always carries the headline in
 * the language of the page that was shared.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 20,
              background: "#00a8cc",
              clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 4, fontWeight: 600 }}>PRIMENEX IT</div>
        </div>

        <div
          style={{
            fontSize: dict.hero.headline.length > 55 ? 62 : 74,
            lineHeight: 1.05,
            letterSpacing: -2.2,
            fontWeight: 500,
            maxWidth: 960,
          }}
        >
          {dict.hero.headline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ height: 1, background: "#00a8cc", width: "100%" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
              letterSpacing: 2,
              color: "#9aa4ad",
            }}
          >
            <div>{dict.practiceIndex.join("  ·  ")}</div>
            <div>{site.location}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
