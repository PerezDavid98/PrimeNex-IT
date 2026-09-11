import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${getDictionary(defaultLocale).meta.tagline}`,
    short_name: site.name,
    description: getDictionary(defaultLocale).meta.ogDescription,
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
