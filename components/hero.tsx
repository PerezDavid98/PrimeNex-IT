import { facts, hero, practiceIndex, site } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { HexMark } from "./ui/rule";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-14 md:pt-40 md:pb-20">
      {/* the grid, made visible — the only backdrop in the system */}
      <div aria-hidden className="shell pointer-events-none absolute inset-0">
        <div className="column-rules">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      <div className="shell relative">
        <Reveal y={12}>
          <p className="t-mono flex items-center gap-3">
            <HexMark className="h-2 w-2 bg-cyan" />
            {site.name} — {hero.kicker}
          </p>
        </Reveal>

        <div className="grid12 mt-8 md:mt-12">
          <h1 className="t-display col-span-12 lg:col-span-8">{hero.headline}</h1>

          {/* practice index, set against the headline */}
          <nav
            aria-label="Practice areas"
            className="col-span-12 mt-12 lg:col-span-3 lg:col-start-10 lg:mt-2 lg:self-end"
          >
            <ul>
              {practiceIndex.map((item, i) => (
                <Reveal as="li" key={item.n} delay={0.08 * i} y={10}>
                  <a
                    href={item.href}
                    className="group flex items-baseline gap-4 border-t border-rule py-3.5 last:border-b"
                  >
                    <span className="t-num">{item.n}</span>
                    <span className="t-h4 flex-1 text-ink-soft transition-colors group-hover:text-ink">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="t-num translate-x-0 transition-transform duration-400 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid12 mt-14 md:mt-20">
          <Reveal className="col-span-12 lg:col-span-6 lg:col-start-4" delay={0.15}>
            <p className="t-lede">{hero.lede}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={hero.primaryCta.href} className="btn btn-solid">
                {hero.primaryCta.label}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                  <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-outline">
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>

        {/* factual footer row — descriptive, no invented metrics */}
        <dl className="grid12 mt-20 gap-y-8 md:mt-28">
          {facts.map((fact) => (
            <div key={fact.label} className="col-span-6 border-t border-ink pt-4 lg:col-span-3">
              <dt className="t-mono">{fact.label}</dt>
              <dd className="t-h4 mt-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
