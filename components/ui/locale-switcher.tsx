"use client";

import { useEffect, useRef } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { LOCALE_COOKIE } from "@/proxy";

/**
 * Language switcher.
 *
 * Built on <details> holding real <a> links, for three reasons that a custom
 * dropdown or a <select> would each give up:
 *   1. Crawlers follow links, so Google discovers all six locales from any page.
 *   2. It works before hydration and with JavaScript disabled.
 *   3. <details> brings its own keyboard model and disclosure semantics, so
 *      there is no hand-rolled focus trap to get wrong.
 *
 * Escape-to-close and click-outside are progressive enhancement layered on top.
 *
 * The visitor's choice persists without needing JavaScript at click time: being
 * on /de is itself the signal, and an effect writes the cookie the proxy reads
 * at "/". Accept-Language is a hint; this is the explicit answer, and it wins.
 */
export function LocaleSwitcher({
  active,
  label,
  changeLabel,
}: {
  active: Locale;
  label: string;
  changeLabel: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const current = locales.find((l) => l.code === active) ?? locales[0];

  useEffect(() => {
    // 1 year, Lax: a language preference is not sensitive and must survive
    // arriving from an external link.
    document.cookie = `${LOCALE_COOKIE}=${active};path=/;max-age=31536000;samesite=lax`;
  }, [active]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const close = () => node.removeAttribute("open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !node.hasAttribute("open")) return;
      close();
      node.querySelector("summary")?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (node.hasAttribute("open") && !node.contains(event.target as Node)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details ref={ref} className="lang">
      <summary className="lang__trigger" aria-label={`${label}: ${current.label}. ${changeLabel}`}>
        <GlobeGlyph />
        {/* Full endonym where there is room, the code where there is not.
            Never a flag: flags are countries, and no flag stands for a
            language — Spanish is not Spain, and 中文 is not one country. */}
        <span className="lang__current-wide">{current.label}</span>
        <span className="lang__current-narrow">{current.code.toUpperCase()}</span>
        <ChevronGlyph />
      </summary>

      <ul className="lang__list">
        {locales.map((locale) => {
          const isActive = locale.code === active;
          return (
            <li key={locale.code}>
              <a
                href={`/${locale.code}`}
                hrefLang={locale.hreflang}
                lang={locale.htmlLang}
                aria-current={isActive ? "true" : undefined}
                className="lang__option"
              >
                {/* A check mark, not just a colour: status is never colour alone. */}
                <span aria-hidden className="lang__check">
                  {isActive ? "✓" : ""}
                </span>
                {/* Each language named in its own language, always. */}
                <span>{locale.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function GlobeGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      focusable="false"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9.25" />
      <path d="M2.75 12h18.5M12 2.75c2.5 2.5 3.75 5.75 3.75 9.25S14.5 18.75 12 21.25c-2.5-2.5-3.75-5.75-3.75-9.25S9.5 5.25 12 2.75z" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg
      width="9"
      height="6"
      viewBox="0 0 11 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
      focusable="false"
      className="lang__chevron shrink-0"
    >
      <path d="M1 1l4.5 4.5L10 1" />
    </svg>
  );
}
