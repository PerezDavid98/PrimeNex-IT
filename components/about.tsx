"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

export function About({ about }: { about: Dictionary["about"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="03" label={about.label} title={about.title} />

        <div className="grid12 mt-14 gap-4 gap-y-4 md:mt-20">
          {[
            { label: about.missionLabel, body: about.mission },
            { label: about.visionLabel, body: about.vision },
          ].map((block, i) => (
            <Reveal
              key={block.label}
              delay={i * 0.08}
              className={`card col-span-12 md:col-span-6 ${i === 1 ? "md:col-start-7" : ""}`}
            >
              <p className="t-mono">{block.label}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink md:text-[1.125rem]">
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid12 mt-24 md:mt-32">
          <div className="col-span-12 lg:col-span-3">
            <p className="t-mono border-t border-ink pt-5">{about.objectivesLabel}</p>
            <p className="t-body mt-5 max-w-xs">{about.objectivesLede}</p>
          </div>

          <ul className="col-span-12 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {about.objectives.map((objective, i) => {
              const isOpen = open === i;
              return (
                <li key={objective.title} className="border-t border-rule last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`objective-${i}`}
                    className="row group flex min-h-11 w-full items-baseline gap-4 px-2 py-6 text-left"
                  >
                    <span className="t-num">0{i + 1}</span>
                    <span
                      className={`t-h3 flex-1 transition-colors ${
                        isOpen ? "text-ink" : "text-ink-mid group-hover:text-ink"
                      }`}
                    >
                      {objective.title}
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-1 grid h-4 w-4 shrink-0 place-items-center"
                    >
                      <span className="absolute h-px w-3.5 bg-ink" />
                      <span
                        className={`absolute h-3.5 w-px bg-ink transition-transform duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>

                  <div id={`objective-${i}`} className="disclosure" data-open={isOpen}>
                    <div>
                      <p className="t-body max-w-xl pb-7 pl-10">{objective.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal delay={0.08}>
          <blockquote className="card-deep mt-24 p-8 md:mt-32 md:p-14">
            <p className="t-h2 max-w-4xl text-paper">{about.commitment}</p>
            <footer className="t-mono mt-8 text-paper/60">PrimeNex IT</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
