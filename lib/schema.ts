import { about, capabilities, services, site } from "./content";

/**
 * Structured data. One graph, so the organization, the site and the service
 * catalog reference each other instead of being three disconnected blobs.
 */
export function buildSchema() {
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
        image: `${site.url}/opengraph-image`,
        email: site.email,
        telephone: site.phone,
        description: about.mission,
        slogan: site.tagline,
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
        knowsAbout: capabilities.flatMap((item) => item.includes),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Technology services",
          itemListElement: services.map((group) => ({
            "@type": "OfferCatalog",
            name: group.tab,
            itemListElement: group.items.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item.title,
                description: item.body ?? item.bullets?.join(" "),
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
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} — ${site.tagline}`,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        description:
          "IT support and digital transformation, web platforms, data analysis and embedded systems, engineered end to end from Cartago, Costa Rica.",
      },
    ],
  };
}
