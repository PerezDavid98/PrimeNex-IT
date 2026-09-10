"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Wordmark } from "./ui/wordmark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
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
      <div className="shell flex h-16 items-center justify-between gap-8 md:h-[4.75rem]">
        <a href="#top" aria-label={`${site.name} — home`}>
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden items-baseline gap-7 lg:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-2"
            >
              <span className="t-num text-[0.625rem]">0{i + 1}</span>
              <span
                className={`link text-[0.9375rem] transition-colors ${
                  active === item.href ? "text-ink" : "text-ink-soft group-hover:text-ink"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
          <a href="#contact" className="btn btn-solid px-5 py-3">
            Start a project
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="t-mono -mr-1 flex items-center gap-2.5 px-1 py-2 text-ink lg:hidden"
        >
          {open ? "Close" : "Menu"}
          <span className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-400 ${
                open ? "top-1 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-400 ${
                open ? "top-1 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        data-open={open}
        aria-hidden={!open}
        className="drawer fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-rule bg-paper md:top-[4.75rem] lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col pt-2 pb-10">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className="flex items-baseline gap-4 border-b border-rule py-6"
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
            Start a project
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
          <dl className="mt-10 space-y-2">
            <div className="flex gap-3">
              <dt className="t-mono w-20">Phone</dt>
              <dd className="text-[0.9375rem]">{site.phone}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="t-mono w-20">Email</dt>
              <dd className="text-[0.9375rem]">{site.email}</dd>
            </div>
          </dl>
        </nav>
      </div>

    </header>
  );
}
