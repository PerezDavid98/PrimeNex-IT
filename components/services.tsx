"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { SectionHeading } from "./ui/section-heading";
import { HexMark } from "./ui/rule";

export function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((group) => group.id === activeId) ?? services[0];

  return (
    <section id="services" className="scroll-mt-20 py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="01" label="Services" title="What we build for you">
          We specialize in a broad range of technological services — from embedded systems
          that combine hardware and software, to interfaces that enhance user experience, to
          the databases and CRM systems that keep everything running.
        </SectionHeading>

        <div className="grid12 mt-14 md:mt-20">
          {/* vertical index of practices */}
          <div
            role="tablist"
            aria-label="Service areas"
            aria-orientation="vertical"
            className="col-span-12 lg:col-span-3"
          >
            {services.map((group) => {
              const selected = group.id === active.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${group.id}`}
                  onClick={() => setActiveId(group.id)}
                  className={`group flex w-full items-baseline gap-3 border-t py-4 text-left transition-colors last:border-b ${
                    selected ? "border-ink" : "border-rule"
                  }`}
                >
                  <span className={`t-num ${selected ? "text-ink" : ""}`}>{group.index}</span>
                  <span
                    className={`t-h4 flex-1 transition-colors ${
                      selected ? "text-ink" : "text-ink-mid group-hover:text-ink"
                    }`}
                  >
                    {group.tab}
                  </span>
                  {selected ? <HexMark className="h-2 w-2 shrink-0 bg-cyan" /> : null}
                </button>
              );
            })}
          </div>

          {/* the selected practice, set as a specification list */}
          <div className="col-span-12 mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <div
              key={active.id}
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className="panel-enter"
            >
                <h3 className="t-h2 max-w-xl">{active.headline}</h3>
                <p className="t-body mt-6 max-w-md">{active.blurb}</p>

                <dl className="mt-12">
                  {active.items.map((item, i) => (
                    <div
                      key={item.title}
                      className="grid12 group border-t border-rule py-7 last:border-b"
                    >
                      <dt className="col-span-12 flex items-baseline gap-3 md:col-span-5">
                        <span className="t-num">
                          {active.index}.{i + 1}
                        </span>
                        <span className="t-h4 text-balance">{item.title}</span>
                      </dt>
                      <dd className="col-span-12 mt-3 md:col-span-7 md:mt-0">
                        {item.body ? <p className="t-body">{item.body}</p> : null}
                        {item.bullets ? (
                          <ul className="space-y-2.5">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="t-body flex gap-3">
                                <span aria-hidden className="text-ink-mid">
                                  —
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
