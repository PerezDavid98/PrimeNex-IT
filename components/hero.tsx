import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { HexMark } from "./ui/rule";
import { HexStack } from "./ui/hex-stack";

/**
 * Splits the headline so one phrase can carry the brand colour. The accent is
 * a substring stored per locale, because the emphatic phrase is not in the
 * same place in German as in Spanish — and if it ever fails to match, the
 * headline renders whole rather than breaking.
 */
function Headline({ text, accent }: { text: string; accent: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <span className="accent">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

export function Hero({
  hero,
  practiceIndex,
  facts,
  cta,
  a11y,
}: {
  hero: Dictionary["hero"];
  practiceIndex: Dictionary["practiceIndex"];
  facts: Dictionary["facts"];
  cta: Dictionary["cta"];
  a11y: Dictionary["a11y"];
}) {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20">
      <div aria-hidden className="shell pointer-events-none absolute inset-0">
        <div className="column-rules">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      <div className="shell relative">
        <div className="grid12 items-center gap-y-14">
          {/* ---------- the argument ---------- */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal y={10}>
              <p className="badge t-mono">
                <HexMark className="h-2 w-2 shrink-0 bg-cyan" />
                {site.name} — {hero.kicker}
              </p>
            </Reveal>

            <h1 className="t-display mt-7 md:mt-9">
              <Headline text={hero.headline} accent={hero.accent} />
            </h1>

            <Reveal delay={0.1}>
              <p className="t-lede mt-8 max-w-xl">{hero.lede}</p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-solid">
                  {cta.startProject}
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                    <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </a>
                <a href="#services" className="btn btn-outline">
                  {cta.services}
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---------- the object ---------- */}
          <Reveal
            delay={0.18}
            y={18}
            className="col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-5 lg:col-start-8 lg:pl-4"
          >
            <HexStack labels={practiceIndex} ariaLabel={a11y.practiceAreas} />
          </Reveal>
        </div>

        {/* ---------- the facts ---------- */}
        <dl className="grid12 mt-16 gap-y-8 border-t border-ink pt-6 md:mt-24">
          {facts.map((fact) => (
            <div key={fact.label} className="col-span-6 lg:col-span-3">
              <dt className="t-mono">{fact.label}</dt>
              <dd className="t-h4 mt-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
