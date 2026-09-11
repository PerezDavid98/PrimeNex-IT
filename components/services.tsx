import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

/**
 * All four practices, laid out in full.
 *
 * They used to sit behind a tab strip, which hid three quarters of the page's
 * substance behind a click and gave the client a row of controls to dislike.
 * Showing everything is denser, it is what the enterprise sites in the
 * reference set do, and it drops the component's client JavaScript entirely —
 * no state, no tablist, no keyboard model to get right.
 */
export function Services({ services }: { services: Dictionary["services"] }) {
  return (
    <section id="services" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading index="01" label={services.label} title={services.title}>
          {services.lede}
        </SectionHeading>

        <div className="mt-12 space-y-4 md:mt-16">
          {services.groups.map((group, gi) => (
            <Reveal key={group.tab} delay={0.04 * gi} y={14}>
              <article className="card grid12 gap-y-8">
                {/* ---- what it is ---- */}
                <header className="col-span-12 lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="t-mono text-azure">0{gi + 1}</span>
                    <h3 className="t-h3">{group.tab}</h3>
                  </div>
                  <p className="mt-5 text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-ink">
                    {group.headline}
                  </p>
                  <p className="t-body mt-4">{group.blurb}</p>
                </header>

                {/* ---- what it includes ---- */}
                <dl className="col-span-12 lg:col-span-7 lg:col-start-6">
                  {group.items.map((item, i) => (
                    <div
                      key={item.title}
                      className="border-t border-rule py-5 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <dt className="flex items-baseline gap-3">
                        <span className="t-num">
                          0{gi + 1}.{i + 1}
                        </span>
                        <span className="t-h4 text-balance">{item.title}</span>
                      </dt>
                      <dd className="t-body mt-2.5 pl-9">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
