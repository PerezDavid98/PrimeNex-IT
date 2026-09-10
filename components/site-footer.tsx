import { nav, services, site } from "@/lib/content";
import { Wordmark } from "./ui/wordmark";

const social = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
  { label: "Facebook", href: site.facebook },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink">
      <div className="shell">
        {/* closing line */}
        <a href="#contact" className="group block py-16 md:py-24">
          <p className="t-mono">Ready when you are</p>
          <p className="t-display mt-5 flex items-baseline gap-6">
            <span className="transition-colors duration-500 group-hover:text-cyan-deep">
              Start a project
            </span>
            <span
              aria-hidden
              className="text-[0.35em] transition-transform duration-500 group-hover:translate-x-3"
            >
              →
            </span>
          </p>
        </a>

        {/* directory */}
        <div className="grid12 gap-y-10 border-t border-rule py-12">
          <div className="col-span-12 lg:col-span-3">
            <Wordmark size="md" />
            <p className="t-body mt-5 max-w-xs">
              {site.tagline}. IT support, web platforms, data and embedded systems,
              engineered from {site.location}.
            </p>
          </div>

          <nav aria-label="Services" className="col-span-6 lg:col-span-2 lg:col-start-6">
            <p className="t-mono">Services</p>
            <ul className="mt-4 space-y-2">
              {services.map((group) => (
                <li key={group.id}>
                  <a href="#services" className="link text-[0.9375rem] text-ink-soft">
                    {group.tab}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="col-span-6 lg:col-span-2">
            <p className="t-mono">Company</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link text-[0.9375rem] text-ink-soft">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-12 lg:col-span-3">
            <p className="t-mono">Contact</p>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ink-soft">
              <li>{site.location}</li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="link">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="t-mono link normal-case"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="t-mono flex flex-col gap-2 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
