import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";

/**
 * The hero opens with the most characteristic thing in this subject's world.
 *
 * Not a stock photograph and not a diagram: the procure-to-pay chain, set as
 * the document it actually is. Five rows, banded, with the document code in
 * the first column and the stage in the last. It is the thing this practice
 * knows that a generalist agency does not, and stating it as a ledger says so
 * without a word of self-description.
 *
 * This is also the page's one orchestrated moment — the .settle sequence runs
 * on first load here and nowhere else.
 */
export function Hero({
  hero,
  chain,
  cta,
}: {
  hero: Dictionary["hero"];
  chain: Dictionary["chain"];
  cta: Dictionary["cta"];
}) {
  return (
    <section id="top" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="shell">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[1fr_26rem] lg:items-start">
          <div className="settle min-w-0">
            <p className="t-ref">{site.location}</p>
            <h1 className="t-display mt-4">{hero.headline}</h1>
            <p className="t-lede mt-7">{hero.lede}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-solid">
                {cta.startProject}
              </a>
              <a href="#services" className="btn btn-quiet">
                {cta.services}
              </a>
            </div>
          </div>

          {/* ---- the ledger ---- */}
          <div className="min-w-0 lg:pt-3">
            {/* Focusable and named: on a 320px screen in German or French this
                row genuinely scrolls, and a keyboard-only reader has to be able
                to reach the columns that are off-screen. Without tabindex the
                hidden columns are unreachable — WCAG 2.1.1, and axe catches it
                only in the locales whose text is long enough to overflow. */}
            <div className="scroll-x" tabIndex={0} role="region" aria-label={chain.title}>
              <table className="ledger">
                <caption className="t-h3 text-ink">{chain.title}</caption>
                <thead>
                  <tr>
                    <th scope="col">{chain.head.doc}</th>
                    <th scope="col">{chain.head.step}</th>
                    <th scope="col" className="num">
                      {chain.head.stage}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chain.steps.map((row) => (
                    <tr key={row.doc}>
                      <td className="t-fig font-semibold text-oxblood">{row.doc}</td>
                      <td>{row.step}</td>
                      <td className="num text-ink-mid">{row.stage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">{chain.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
