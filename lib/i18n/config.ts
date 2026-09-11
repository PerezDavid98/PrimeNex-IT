/**
 * Locale configuration.
 *
 * `label` is the endonym — the language's name in its own language. Never
 * translate these: someone who only reads German has to find "Deutsch", and
 * "German" in a Chinese interface is useless to them. This is why the selector
 * shows the same six words no matter which locale is active.
 *
 * `hreflang` is deliberately not always equal to the URL segment. The Chinese
 * copy is Simplified, so `zh-Hans` targets script rather than region and
 * reaches readers in the mainland, Singapore and Malaysia alike.
 */
export const locales = [
  { code: "en", label: "English", htmlLang: "en", hreflang: "en", dir: "ltr" },
  { code: "es", label: "Español", htmlLang: "es", hreflang: "es", dir: "ltr" },
  { code: "de", label: "Deutsch", htmlLang: "de", hreflang: "de", dir: "ltr" },
  { code: "fr", label: "Français", htmlLang: "fr", hreflang: "fr", dir: "ltr" },
  { code: "pt", label: "Português", htmlLang: "pt-BR", hreflang: "pt", dir: "ltr" },
  { code: "zh", label: "中文", htmlLang: "zh-Hans", hreflang: "zh-Hans", dir: "ltr" },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const localeCodes = locales.map((l) => l.code) as readonly Locale[];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (localeCodes as readonly string[]).includes(value);
}

export function localeMeta(code: Locale) {
  return locales.find((l) => l.code === code) ?? locales[0];
}
