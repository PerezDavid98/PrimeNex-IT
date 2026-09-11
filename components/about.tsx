"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";

export function About({ about }: { about: Dictionary["about"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="about" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading title={about.title} />

        {/* Mission and vision read as two entries, not two cards. */}
        <div className="mt-12 grid gap-x-12 gap-y-10 md:mt-16 lg:grid-cols-2">
          {[
            { label: about.missionLabel, body: about.mission },
            { label: about.visionLabel, body: about.vision },
          ].map((block) => (
            <div key={block.label} className="rule-entry pt-5">
              <h3 className="t-h3">{block.label}</h3>
              <p className="t-body mt-4 max-w-none">{block.body}</p>
            </div>
          ))}
        </div>

        {/* Objectives are a numbered list because they are a list the company
            commits to in order, and the figures align because they are set
            with tabular numerals. */}
        <div className="mt-16 grid gap-x-12 gap-y-8 md:mt-24 lg:grid-cols-[18rem_1fr]">
          <div className="rule-entry pt-5">
            <h3 className="t-h3">{about.objectivesLabel}</h3>
            <p className="t-body mt-4 text-[0.9375rem]">{about.objectivesLede}</p>
          </div>

          <ol className="lg:pt-1">
            {about.objectives.map((objective, i) => {
              const isOpen = open === i;
              return (
                <li key={objective.title} className={i % 2 === 0 ? "bg-band" : ""}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`objective-${i}`}
                    className="flex min-h-11 w-full items-baseline gap-4 px-4 py-4 text-left"
                  >
                    <span className="t-ref t-fig shrink-0">{i + 1}.</span>
                    <span className="t-h4 flex-1">{objective.title}</span>
                    <span aria-hidden className="t-ref shrink-0 text-ink-mid">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>

                  <div id={`objective-${i}`} className="disclosure" data-open={isOpen}>
                    <div>
                      <p className="px-4 pb-5 pl-11 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {objective.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* The commitment, set as a printed pull quote. */}
        <blockquote className="rule-head mt-16 pt-8 md:mt-24">
          <p className="t-h2 max-w-[46rem] italic">{about.commitment}</p>
        </blockquote>
      </div>
    </section>
  );
}
