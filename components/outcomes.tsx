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
    <section className="bg-band py-16 md:py-24">
      <div className="shell">
        <h2 className="t-h2 max-w-[24ch]">{outcomes.title}</h2>

        {/* Two by two rather than four stacked: the same content, read across
            as well as down. */}
        <dl className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {outcomes.items.map((item) => (
            <div key={item.title} className="border-t border-ink-mid/30 pt-5">
              <dt className="t-h3">{item.title}</dt>
              <dd className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
