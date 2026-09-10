import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, generated rather than designed as a bitmap so it always matches
 * the copy. Same vocabulary as the site: ink ground, one cyan hairline.
 */
export default async function OpengraphImage() {
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
          <div style={{ fontSize: 26, letterSpacing: 4, fontWeight: 600 }}>
            PRIMENEX IT
          </div>
        </div>

        <div
          style={{
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: -2.6,
            fontWeight: 500,
            maxWidth: 940,
          }}
        >
          {hero.headline}
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
            <div>EMBEDDED · WEB · DATA · INFRASTRUCTURE</div>
            <div>{site.location.toUpperCase()}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
