import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { alternateLanguages, localeUrl } from "@/lib/i18n/seo";

/**
 * Every locale is listed, and every entry carries the full alternates map.
 * hreflang has to be reciprocal or Google discards the cluster.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = alternateLanguages();

  return locales.map((locale) => ({
    url: localeUrl(locale.code),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages },
  }));
}
