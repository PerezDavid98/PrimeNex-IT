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
    <section className="night py-20 md:py-28">
      <div className="shell">
        <p className="max-w-[46rem] text-[clamp(1.375rem,2.3vw,2rem)] leading-[1.4] font-medium tracking-[-0.015em] text-paper">
          {statement.body}
        </p>
      </div>
    </section>
  );
}
