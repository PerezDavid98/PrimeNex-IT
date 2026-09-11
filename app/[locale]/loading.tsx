import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Shown while a locale route is being fetched — the one genuine wait on this
 * site, since every other pixel arrives prerendered in the HTML.
 *
 * It mirrors the real hero's grid, so nothing jumps when the content lands:
 * the kicker line, three display lines, the four-row practice index. Per the
 * playbook, a skeleton must match what it replaces; a spinner here would tell
 * the user nothing about what is coming.
 */
export default async function Loading({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  const resolved = params ? await params : undefined;
  const locale = resolved && isLocale(resolved.locale) ? resolved.locale : "en";
  const dict = getDictionary(locale);

  return (
    <div className="pt-28 pb-14 md:pt-40 md:pb-20" aria-busy="true" aria-live="polite">
      <span className="sr-only">{dict.a11y.loading}</span>

      <div className="shell">
        <div className="sk sk-line w-56 max-w-full" />

        <div className="mt-8 grid gap-x-12 gap-y-10 md:mt-12 lg:grid-cols-[1fr_26rem]">
          <div className="space-y-3">
            <div className="sk sk-display w-full" />
            <div className="sk sk-display w-[85%]" />
            <div className="sk sk-display w-[60%]" />
          </div>

          <div className="sk aspect-[4/3] w-full rounded-[3px]" />
        </div>

        <div className="mt-14 md:mt-20">
          <div className="max-w-xl space-y-2.5">
            <div className="sk sk-line w-full" />
            <div className="sk sk-line w-full" />
            <div className="sk sk-line w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
