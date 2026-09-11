import { site } from "./content";
import { getDictionary } from "./i18n/dictionaries";
import { localeMeta, type Locale } from "./i18n/config";
import { localeUrl } from "./i18n/seo";

/**
 * Structured data, per locale. One graph, so the organization, the site and the
 * service catalog reference each other instead of being three disconnected
 * blobs — and so the description Google reads is in the language of the page
 * it read it on.
 */
export function buildSchema(locale: Locale) {
  const dict = getDictionary(locale);
  const url = localeUrl(locale);
  const orgId = `${site.url}/#organization`;
  const siteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        alternateName: "PrimeNex",
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/logo.png`,
          width: 943,
          height: 392,
        },
        image: `${url}/opengraph-image`,
        email: site.email,
        telephone: site.phone,
        description: dict.about.mission,
        slogan: dict.meta.tagline,
        sameAs: [site.linkedin],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cartago",
          addressRegion: "Cartago",
          addressCountry: "CR",
        },
        areaServed: [
          { "@type": "Country", name: "Costa Rica" },
          { "@type": "Place", name: "Latin America" },
          { "@type": "Country", name: "United States" },
        ],
        knowsAbout: dict.capabilities.items.flatMap((item) => item.includes),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.services.label,
          itemListElement: dict.services.groups.map((group) => ({
            "@type": "OfferCatalog",
            name: group.tab,
            itemListElement: group.items.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item.title,
                description: item.body,
                provider: { "@id": orgId },
              },
            })),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: site.name,
        inLanguage: localeMeta(locale).htmlLang,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: dict.meta.title,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        inLanguage: localeMeta(locale).htmlLang,
        description: dict.meta.description,
      },
    ],
  };
}
