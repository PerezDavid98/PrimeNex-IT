import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";

/**
 * Capabilities as a register: what the discipline is, and what it covers.
 * Two columns, banded, read down rather than scanned across a grid of cards.
 */
export function Capabilities({
  capabilities,
}: {
  capabilities: Dictionary["capabilities"];
}) {
  return (
    <section id="capabilities" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading title={capabilities.title}>{capabilities.lede}</SectionHeading>

        <div className="mt-12 md:mt-16">
          <dl>
            {capabilities.items.map((item, i) => (
              <div
                key={item.title}
                className={`grid gap-x-10 gap-y-3 px-4 py-6 lg:grid-cols-[17rem_1fr] ${
                  i % 2 === 0 ? "bg-band" : ""
                }`}
              >
                <dt>
                  <span className="t-h3 block">{item.title}</span>
                  <span className="mt-1.5 block text-[0.9375rem] text-ink-mid">
                    {item.caption}
                  </span>
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-soft lg:pt-1">
                  {item.includes.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
