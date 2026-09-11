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
  const channels = [
    { label: whatsappLabel, href: whatsappHref },
    { label: "LinkedIn", href: site.linkedin },
  ];

  return (
    <footer className="mt-6 bg-navy-900 text-paper">
      <div className="shell">
        <a href="#contact" className="group block py-16 md:py-24">
          <p className="t-mono text-paper/55">{footer.readyLabel}</p>
          <p className="t-display mt-5 flex items-baseline gap-6">
            <span className="transition-colors duration-500 group-hover:text-cyan">
              {footer.readyLine}
            </span>
            <span
              aria-hidden
              className="text-[0.35em] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3"
            >
              →
            </span>
          </p>
        </a>

        <div className="grid12 gap-y-10 border-t border-white/12 py-12">
          <div className="col-span-12 lg:col-span-3">
            <Wordmark size="md" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-paper/65">{footer.blurb}</p>
          </div>

          <nav aria-label={footer.servicesLabel} className="col-span-6 lg:col-span-2 lg:col-start-6">
            <p className="t-mono text-paper/55">{footer.servicesLabel}</p>
            <ul className="mt-4 space-y-1">
              {serviceTabs.map((tab) => (
                <li key={tab}>
                  <a
                    href="#services"
                    className="link inline-flex min-h-11 min-w-11 items-center text-[0.9375rem] text-paper/70 hover:text-paper"
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.companyLabel} className="col-span-6 lg:col-span-2">
            <p className="t-mono text-paper/55">{footer.companyLabel}</p>
            <ul className="mt-4 space-y-1">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="link inline-flex min-h-11 min-w-11 items-center text-[0.9375rem] text-paper/70 hover:text-paper"
                  >
                    {nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-12 lg:col-span-3">
            <p className="t-mono text-paper/55">{footer.contactLabel}</p>
            <ul className="mt-4 space-y-1 text-[0.9375rem] text-paper/70">
              <li className="py-1">{site.location}</li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="link inline-flex min-h-11 items-center">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link inline-flex min-h-11 items-center break-all"
                >
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-4 flex flex-wrap gap-x-5">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="t-mono link inline-flex min-h-11 min-w-11 items-center normal-case text-paper/70 hover:text-paper"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="t-mono flex flex-col gap-2 border-t border-white/12 py-6 text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
          <p lang="en">
            {site.domain} · {locale.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
