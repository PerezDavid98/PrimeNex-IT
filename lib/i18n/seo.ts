import { locales, localeMeta, type Locale } from "./config";
import { site } from "@/lib/content";

export function localeUrl(locale: Locale): string {
  return `${site.url}/${locale}`;
}

/**
 * hreflang map for Next's `alternates.languages`.
 *
 * Every locale lists every other locale plus itself — reciprocity is required
 * or Google ignores the whole cluster. `x-default` points at the bare root,
 * which negotiates, so a crawler with no language preference lands somewhere
 * sensible instead of being told English is canonical for everyone.
 */
export function alternateLanguages(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l.hreflang] = localeUrl(l.code);
  map["x-default"] = site.url;
  return map;
}

export function htmlLang(locale: Locale): string {
  return localeMeta(locale).htmlLang;
}
