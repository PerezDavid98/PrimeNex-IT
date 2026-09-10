import { capabilities } from "@/lib/content";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

/**
 * Specification grid. Hairline cells, mono indices, and the actual work each
 * discipline covers — the density is the visual interest.
 */
export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 bg-wash py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="02" label="Capabilities" title="Six disciplines, one bench">
          Every engagement pulls from the same team. Hardware, software, data and the people
          who will operate it are designed together instead of handed between vendors.
        </SectionHeading>

        <ul className="mt-14 grid border-t border-ink md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.07}
              y={14}
              className="group flex flex-col border-b border-rule px-0 py-8 md:px-7 md:[&:nth-child(odd)]:pl-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:[&:nth-child(4)]:border-l-0"
            >
              <span className="t-num">0{i + 1}</span>
              <h3 className="t-h3 mt-5 text-balance">{item.title}</h3>
              <p className="t-body mt-2.5">{item.caption}</p>

              <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5">
                {item.includes.map((entry) => (
                  <li key={entry} className="t-mono normal-case">
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
