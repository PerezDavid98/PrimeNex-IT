import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * One dark block, set as a note in the margin of an audit: the sentence that
 * separates this practice from an agency that resells implementations.
 *
 * It carried a stock photograph of a server until now. That competed with the
 * ledger for the page's one loud moment and said nothing a reader could not
 * get from the words, so it is gone — the accessory removed before leaving the
 * house.
 */
export function Statement({ statement }: { statement: Dictionary["statement"] }) {
  return (
    <section className="py-8 md:py-12">
      <div className="shell">
        <div className="entry-deep">
          <p className="max-w-[46rem] text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.45] text-paper">
            {statement.body}
          </p>
        </div>
      </div>
    </section>
  );
}
