import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { HexMark } from "./ui/rule";

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
    <section id="top" className="pt-24 pb-8 md:pt-32">
      <div className="shell">
        <div className="grid12 items-center gap-y-10">
          {/* ---------- the argument ---------- */}
          <div className="col-span-12 lg:col-span-6">
            <Reveal y={10}>
              <p className="badge t-mono">
                <HexMark className="h-2 w-2 shrink-0 bg-azure" />
                {site.name} — {hero.kicker}
              </p>
            </Reveal>

            <h1 className="t-display mt-7 md:mt-8">
              <Headline text={hero.headline} accent={hero.accent} />
            </h1>

            <Reveal delay={0.1}>
              <p className="t-lede mt-7 max-w-xl">{hero.lede}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* ---------- the photograph ---------- */}
          <Reveal
            delay={0.16}
            y={16}
            className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pl-6"
          >
            <figure className="plate plate-zoom relative aspect-[4/3] w-full">
              <Image
                src="/img/analysis.jpg"
                alt="Two colleagues reviewing reports and dashboards on a laptop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>

        {/* ---------- the four practices, as a row ---------- */}
        <nav aria-label={a11y.practiceAreas} className="mt-12 md:mt-16">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {practiceIndex.map((label, i) => (
              <Reveal as="li" key={label} delay={0.05 * i} y={10}>
                <a href="#services" className="card card-hover flex h-full items-start gap-4 py-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.875rem] bg-wash font-mono text-[0.6875rem] text-ink-soft">
                    0{i + 1}
                  </span>
                  <span className="t-h4 pt-1.5 text-balance">{label}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </nav>

        {/* ---------- the facts ---------- */}
        <dl className="grid12 mt-14 gap-y-8 border-t border-rule pt-7 md:mt-20">
          {facts.map((fact) => (
            <div key={fact.label} className="col-span-6 lg:col-span-3">
              <dt className="t-mono">{fact.label}</dt>
              <dd className="t-h4 mt-2 text-balance">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
