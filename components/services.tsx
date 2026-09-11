import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The service inventory, set as four statements of account.
 *
 * The content is a list of what is on offer under each practice, which is
 * tabular, so it is a table — headed, banded, with the reference in the first
 * column. No tabs hiding three quarters of it, and no identical rounded cards.
 */
export function Services({ services }: { services: Dictionary["services"] }) {
  return (
    <section id="services" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell grid gap-x-14 lg:grid-cols-[20rem_1fr]">
        {/* The heading holds its place while the four practices scroll past
            it, so the page reads as layered rather than as one long fall. */}
        <div className="lg:sticky lg:top-28 lg:self-start lg:pt-7">
          <h2 className="t-h2">{services.title}</h2>
          <p className="t-body mt-5">{services.lede}</p>
        </div>

        <div className="mt-12 space-y-14 lg:mt-0">
          {services.groups.map((group) => (
            <article key={group.tab}>
              <div className="rule-head pt-6">
                <div className="max-w-[40rem]">
                  <h3 className="t-h3">{group.tab}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-snug text-ink">
                    {group.headline}
                  </p>
                  <p className="t-body mt-3 text-[0.9375rem]">{group.blurb}</p>
                </div>

                <dl className="mt-7">
                  {group.items.map((item, i) => (
                    <div
                      key={item.title}
                      className={`grid gap-x-6 gap-y-2 px-4 py-4 sm:grid-cols-[14rem_1fr] ${
                        i % 2 === 0 ? "bg-band" : ""
                      }`}
                    >
                      <dt className="t-h4">{item.title}</dt>
                      <dd className="text-[0.9375rem] leading-relaxed text-ink-soft">
                        {item.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
