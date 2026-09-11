"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";

export function Services({
  services,
  a11y,
}: {
  services: Dictionary["services"];
  a11y: Dictionary["a11y"];
}) {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = services.groups[index];
  const count = services.groups.length;

  /**
   * A tablist that only responds to clicks is broken for keyboard users: ARIA
   * expects arrow keys to move between tabs and Tab to leave the set. Roving
   * tabindex keeps the whole group as one stop.
   */
  function onKeyDown(event: React.KeyboardEvent, from: number) {
    const moves: Record<string, number> = {
      ArrowRight: from + 1,
      ArrowDown: from + 1,
      ArrowLeft: from - 1,
      ArrowUp: from - 1,
      Home: 0,
      End: count - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;

    event.preventDefault();
    const target = (next + count) % count;
    setIndex(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <section id="services" className="scroll-mt-20 py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="01" label={services.label} title={services.title}>
          {services.lede}
        </SectionHeading>

        <div className="grid12 mt-14 md:mt-20">
          <div
            role="tablist"
            aria-label={a11y.serviceAreas}
            aria-orientation="vertical"
            className="col-span-12 lg:col-span-3"
          >
            {services.groups.map((group, i) => {
              const selected = i === index;
              return (
                <button
                  key={group.tab}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  data-selected={selected}
                  className={`row row-mark group flex min-h-11 w-full items-baseline gap-3 border-t py-4 text-left transition-colors last:border-b ${
                    selected ? "border-ink" : "border-rule"
                  }`}
                >
                  <span className={`t-num ${selected ? "text-ink" : ""}`}>
                    0{i + 1}
                  </span>
                  <span
                    className={`t-h4 flex-1 transition-colors ${
                      selected ? "text-ink" : "text-ink-mid group-hover:text-ink"
                    }`}
                  >
                    {group.tab}
                  </span>
                  {/* Shape, not just colour: the arrow only appears on the
                      selected row, so selection never rests on hue alone. */}
                  <span aria-hidden className={`t-num ${selected ? "" : "opacity-0"}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* No entrance animation on switch — see the note in globals.css.
              A user changing tabs wants the content, not a performance. */}
          <div
            role="tabpanel"
            id={`panel-${index}`}
            aria-labelledby={`tab-${index}`}
            tabIndex={0}
            className="card col-span-12 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0"
          >
            <h3 className="t-h2 max-w-xl">{active.headline}</h3>
            <p className="t-body mt-6 max-w-md">{active.blurb}</p>

            <dl className="mt-10">
              {active.items.map((item, i) => (
                <div key={item.title} className="grid12 border-t border-rule py-7 last:border-b">
                  <dt className="col-span-12 flex items-baseline gap-3 md:col-span-5">
                    <span className="t-num">
                      0{index + 1}.{i + 1}
                    </span>
                    <span className="t-h4 text-balance">{item.title}</span>
                  </dt>
                  <dd className="col-span-12 mt-3 md:col-span-7 md:mt-0">
                    <p className="t-body">{item.body}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
