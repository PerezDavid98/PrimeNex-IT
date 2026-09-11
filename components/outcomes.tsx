import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * What the client gets, stated as outcomes rather than features.
 *
 * The reference article the client sent lists modules — invoicing, budget
 * versions, contract oversight — and never says why any of it matters. The
 * generic claims underneath it are sound though, and they are the ones here:
 * real-time control instead of a monthly reconstruction, the tools the team
 * already knows, and modules added one at a time rather than a forced
 * replacement. The fourth is ours and the CV backs it.
 */
export function Outcomes({ outcomes }: { outcomes: Dictionary["outcomes"] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="rule-head pt-7">
          <h2 className="t-h2">{outcomes.title}</h2>
        </div>

        <dl className="mt-10">
          {outcomes.items.map((item, i) => (
            <div
              key={item.title}
              className={`grid gap-x-10 gap-y-2 px-4 py-6 lg:grid-cols-[22rem_1fr] ${
                i % 2 === 0 ? "bg-band" : ""
              }`}
            >
              <dt className="t-h3">{item.title}</dt>
              <dd className="min-w-0 text-[1rem] leading-relaxed text-ink-soft">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
