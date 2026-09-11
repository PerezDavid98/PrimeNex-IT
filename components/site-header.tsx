"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/lib/content";
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
  const [active, setActive] = useState("");

  const items = SECTION_IDS.map((id) => ({ id, label: nav[id] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.3, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-500 ${
        scrolled ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.75rem]">
        <a
          href={`/${locale}`}
          aria-label={a11y.home}
          className="flex min-h-11 shrink-0 items-center"
        >
          <Wordmark />
        </a>

        <nav aria-label={a11y.mainNav} className="hidden items-baseline gap-7 lg:flex">
          {items.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex min-h-11 items-center gap-2"
            >
              <span className="t-num text-[0.625rem]">0{i + 1}</span>
              <span
                className={`link text-[0.9375rem] transition-colors ${
                  active === item.id ? "text-ink" : "text-ink-soft group-hover:text-ink"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Never hidden inside the hamburger: someone who cannot read the
              current language must not have to guess where the control is. */}
          <LocaleSwitcher
            active={locale}
            label={a11y.language}
            changeLabel={a11y.changeLanguage}
          />

          <a href="#contact" className="btn btn-solid hidden px-5 py-3 lg:inline-flex">
            {cta.startProject}
          </a>

          {/* 44px minimum target: this was a 32px tap area before. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            className="t-mono flex min-h-11 min-w-11 items-center justify-end gap-2.5 text-ink lg:hidden"
          >
            {/* The word is dropped below 380px, where the row simply has no
                room for it; the icon keeps its full 44px target and the
                accessible name comes from aria-label either way. */}
            <span className="hidden min-[380px]:inline">{open ? a11y.close : a11y.menu}</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  open ? "top-1 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
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
        className="drawer fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-rule bg-paper md:top-[4.75rem] lg:hidden"
      >
        <nav aria-label={a11y.mobileNav} className="shell flex flex-col pt-2 pb-10">
          {items.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className="flex min-h-11 items-baseline gap-4 border-b border-rule py-6"
            >
              <span className="t-num">0{i + 1}</span>
              <span className="t-h3">{item.label}</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            className="btn btn-solid mt-8 justify-between"
          >
            {cta.startProject}
            <Arrow />
          </a>
          <dl className="mt-10 space-y-2">
            <div className="flex gap-3">
              <dt className="t-mono w-20">{a11y.language}</dt>
              <dd className="text-[0.9375rem]">{phone}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="t-mono w-20">@</dt>
              <dd className="text-[0.9375rem] break-all">{email}</dd>
            </div>
          </dl>
        </nav>
      </div>
    </header>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
