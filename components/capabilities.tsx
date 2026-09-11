import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

/**
 * Specification grid. Hairline cells, mono indices, and the actual work each
 * discipline covers — the density is the visual interest.
 */
export function Capabilities({
  capabilities,
}: {
  capabilities: Dictionary["capabilities"];
}) {
  return (
    <section id="capabilities" className="scroll-mt-20 py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="02" label={capabilities.label} title={capabilities.title}>
          {capabilities.lede}
        </SectionHeading>

        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.07}
              y={14}
              className="card card-hover flex flex-col"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[1rem] bg-navy-800 font-mono text-xs text-paper">
                0{i + 1}
              </span>
              <h3 className="t-h3 mt-6 text-balance">{item.title}</h3>
              <p className="t-body mt-2.5">{item.caption}</p>

              <ul className="mt-7 flex flex-wrap gap-1.5">
                {item.includes.map((entry) => (
                  <li
                    key={entry}
                    className="rounded-full bg-wash px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-soft"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
