/**
 * Locale-independent facts. Everything a human reads lives in lib/i18n/*.json;
 * what stays here is what does not change with language — the company's
 * identity, its contact channels and its URLs.
 */

export const site = {
  name: "PrimeNex IT",
  domain: "primenexit.net",
  url: "https://www.primenexit.net",
  location: "Cartago, Costa Rica",
  phone: "+506 6485-7076",
  phoneHref: "+50664857076",
  email: "contacto@primenexit.com",
  linkedin: "https://www.linkedin.com/company/primenex-it",
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
} as const;

/**
 * Click-to-chat. No API, no Meta account, no per-message cost: wa.me opens the
 * visitor's own WhatsApp with the conversation already addressed to us.
 *
 * Digits only, country code first, no plus sign or spaces.
 */
export const whatsappNumber = "50664857076";

/** The prefilled message is translated, so the link is built per locale. */
export function whatsappHref(prefill: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefill)}`;
}

/** Section indices, shared by the nav, the headings and the service tabs. */
export const SECTION_IDS = ["services", "capabilities", "about", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];
