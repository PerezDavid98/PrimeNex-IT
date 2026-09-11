import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";

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
      <div className="shell">
        <SectionHeading title={services.title}>{services.lede}</SectionHeading>

        <div className="mt-14 space-y-16 md:mt-20">
          {services.groups.map((group) => (
            <article key={group.tab}>
              <div className="rule-entry grid gap-x-12 gap-y-5 pt-6 lg:grid-cols-[18rem_1fr]">
                <div>
                  <h3 className="t-h3">{group.tab}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-snug text-ink">
                    {group.headline}
                  </p>
                  <p className="t-body mt-3 text-[0.9375rem]">{group.blurb}</p>
                </div>

                <dl className="lg:pt-1">
                  {group.items.map((item, i) => (
                    <div
                      key={item.title}
                      className={`grid gap-x-6 gap-y-2 px-4 py-4 sm:grid-cols-[13rem_1fr] ${
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
