"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const INTERVAL = 5200;

/**
 * The qualifying hook.
 *
 * The mechanism is the one on the reference site the client liked — a line
 * that changes on a timer. What is different is the content: instead of
 * cycling adjectives about ourselves, it cycles the symptoms a prospect
 * recognises in their own company. Each line is a question they answer "yes"
 * to, which is what earns the next scroll. The reference article the client
 * also sent fails precisely here: it lists what the product does and never
 * names a problem anyone has.
 *
 * Better than the reference in three ways that matter:
 *   - it can be driven by hand, so nobody has to wait for the line they were
 *     reading to come back;
 *   - it pauses while the pointer or the keyboard is on it, so it cannot
 *     change out from under someone mid-sentence;
 *   - under reduced motion it does not rotate at all — every symptom is
 *     simply listed.
 *
 * All six lines are in the DOM at all times, so a screen reader gets the whole
 * list in order and the rotation stays what it is: a visual affordance.
 */
export function Symptoms({
  symptoms,
  onNight = false,
}: {
  symptoms: Dictionary["symptoms"];
  onNight?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % symptoms.items.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [reduce, paused, symptoms.items.length]);

  /* Reduced motion: no rotation, no controls, just the list. */
  if (reduce) {
    return (
      <Frame label={symptoms.label} onNight={onNight}>
        <ul className="space-y-3">
          {symptoms.items.map((item) => (
            <li key={item} className="t-h3 font-normal">
              {item}
            </li>
          ))}
        </ul>
      </Frame>
    );
  }

  return (
    <Frame label={symptoms.label} onNight={onNight}>
      <div
        ref={region}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Stacked, not swapped: the block keeps the height of its longest
            line, so nothing below it moves when the line changes. */}
        <ul className="grid">
          {symptoms.items.map((item, i) => (
            <li
              key={item}
              className="col-start-1 row-start-1 t-h3 font-normal transition-opacity duration-500"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* 44px square each, butted together rather than spaced: six at 44
            wide is 264px, which is the most that fits the content width of a
            320px screen. The visible dot stays small; the target does not. */}
        <div className="mt-6 flex items-center">
          {symptoms.items.map((item, i) => (
            <button
              key={item}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={item}
              className="group grid h-11 w-11 place-items-center"
            >
              <span
                aria-hidden
                className={`block h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                  i === index
                    ? onNight
                      ? "bg-paper"
                      : "bg-accent"
                    : onNight
                      ? "bg-white/30 group-hover:bg-white/60"
                      : "bg-rule-strong group-hover:bg-ink-mid"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Frame({
  label,
  onNight,
  children,
}: {
  label: string;
  onNight: boolean;
  children: React.ReactNode;
}) {
  const inner = (
    <div
      className={`max-w-[46rem] border-t pt-7 ${
        onNight ? "border-white/20" : "border-ink"
      }`}
    >
      <p className={`t-h4 ${onNight ? "text-paper/70" : ""}`}>{label}</p>
      <div className="mt-6">{children}</div>
    </div>
  );

  /* On the dark band it is already inside the hero's shell. */
  if (onNight) return inner;

  return (
    <section className="py-14 md:py-20">
      <div className="shell">{inner}</div>
    </section>
  );
}
