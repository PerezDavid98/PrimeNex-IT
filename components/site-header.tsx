"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS, site } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { Wordmark } from "./ui/wordmark";
import { LocaleSwitcher } from "./ui/locale-switcher";

export function SiteHeader({
  locale,
  nav,
  cta,
  a11y,
  phone,
  email,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  cta: Dictionary["cta"];
  a11y: Dictionary["a11y"];
  phone: string;
  email: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items = SECTION_IDS.map((id) => ({ id, label: nav[id] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      /* Dark over the dark hero, paper once past it — otherwise a white bar
         sits on top of a near-black band and reads as a mistake. */
      data-solid={scrolled}
      className="site-header fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <a href={`/${locale}`} aria-label={a11y.home} className="flex min-h-11 shrink-0 items-center">
          <Wordmark onNight={!scrolled} />
        </a>

        <nav aria-label={a11y.mainNav} className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="header-link flex min-h-11 min-w-11 items-center justify-center"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher
            active={locale}
            label={a11y.language}
            changeLabel={a11y.changeLanguage}
          />

          <a href="#contact" className="btn btn-solid hidden lg:inline-flex">
            {cta.startProject}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            className="header-link flex min-h-11 min-w-11 items-center justify-end gap-2 lg:hidden"
          >
            <span className="hidden min-[380px]:inline">{open ? a11y.close : a11y.menu}</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-all duration-200 ${
                  open ? "top-1 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-all duration-200 ${
                  open ? "top-1 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        data-open={open}
        aria-hidden={!open}
        /* text-ink explicitly: the drawer lives inside the header, and the
           header is white-on-transparent over the hero, so without this the
           links inherit white and vanish on their own pale background. */
        className="drawer fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-rule bg-paper text-ink md:top-[4.5rem] lg:hidden"
      >
        <nav aria-label={a11y.mobileNav} className="shell flex flex-col py-4">
          {items.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className={`flex min-h-11 items-center px-4 py-5 ${i % 2 === 0 ? "bg-band" : ""}`}
            >
              <span className="t-h3">{item.label}</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            className="btn btn-solid mt-6"
          >
            {cta.startProject}
          </a>
          <p className="t-body mt-8 text-[0.9375rem]">
            {site.location}
            <br />
            {phone}
            <br />
            {email}
          </p>
        </nav>
      </div>
    </header>
  );
}
