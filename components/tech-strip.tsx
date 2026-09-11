import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The technology register: every platform, language and tool the CV declares.
 *
 * It was a flowing row of glyphs and words, and it read as a jumble — the
 * glyphs carried different optical weights, the .NET mark rendered as a
 * miniature ".NET" directly before the words "C# / .NET", and the items
 * wrapped into ragged steps. All of it typeset now, in fixed columns so the
 * entries align down the page instead of flowing. Order is the thing that
 * makes a list this long readable.
 *
 * Typesetting the names rather than reproducing the marks is also the safer
 * position: Simple Icons has withdrawn the Microsoft and Oracle icons at those
 * vendors' request. This states which platforms the work is done on, and
 * claims certified-partner status nowhere.
 */
export function TechStrip({ tech }: { tech: Dictionary["techStrip"] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="rule-head pt-7">
          <h2 className="t-h2">{tech.title}</h2>
        </div>

        <dl className="mt-10">
          {tech.groups.map((group, gi) => (
            <div
              key={group.label}
              className={`grid gap-x-10 gap-y-4 px-4 py-6 lg:grid-cols-[15rem_1fr] ${
                gi % 2 === 0 ? "bg-band" : ""
              }`}
            >
              <dt className="t-h4">{group.label}</dt>
              <dd className="min-w-0">
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
                  {group.items.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
