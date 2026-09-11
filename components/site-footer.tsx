import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { SECTION_IDS, site } from "@/lib/content";
import { Wordmark } from "./ui/wordmark";

export function SiteFooter({
  locale,
  footer,
  nav,
  serviceTabs,
  whatsappHref,
  whatsappLabel,
}: {
  locale: Locale;
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
  serviceTabs: string[];
  whatsappHref: string;
  whatsappLabel: string;
}) {
  return (
    <footer className="night mt-12">
      <div className="shell">
        {/* The closing line is a sentence, not a display slab with an arrow. */}
        <div className="max-w-[40rem] py-14 md:py-20">
          <p className="t-h2">{footer.readyLine}</p>
          <p className="t-body mt-5">{footer.blurb}</p>
          <a href="#contact" className="btn btn-solid mt-7">
            {footer.readyLabel}
          </a>
        </div>

        <div className="grid gap-x-10 gap-y-9 border-t border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark size="md" onNight />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper/65">
              {site.location}
            </p>
          </div>

          <nav aria-label={footer.servicesLabel}>
            <h2 className="t-h4">{footer.servicesLabel}</h2>
            <ul className="mt-3 space-y-1">
              {serviceTabs.map((tab) => (
                <li key={tab}>
                  <a href="#services" className="link-night inline-flex min-h-11 min-w-11 items-center text-[0.9375rem]">
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.companyLabel}>
            <h2 className="t-h4">{footer.companyLabel}</h2>
            <ul className="mt-3 space-y-1">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="link-night inline-flex min-h-11 min-w-11 items-center text-[0.9375rem]">
                    {nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-h4">{footer.contactLabel}</h2>
            <ul className="mt-3 space-y-1 text-[0.9375rem] text-paper/70">
              <li>
                <a href={`tel:${site.phoneHref}`} className="link-night inline-flex min-h-11 min-w-11 items-center">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-night inline-flex min-h-11 min-w-11 items-center break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="link-night inline-flex min-h-11 min-w-11 items-center"
                >
                  {whatsappLabel}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link-night inline-flex min-h-11 min-w-11 items-center"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="border-t border-white/15 py-6 text-[0.875rem] text-paper/55">
          © {new Date().getFullYear()} {site.name}. {footer.rights} · {site.domain} ·{" "}
          <span className="t-fig">{locale}</span>
        </p>
      </div>
    </footer>
  );
}
