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

        <div className="grid12 mt-8 md:mt-12">
          <div className="col-span-12 space-y-3 lg:col-span-8">
            <div className="sk sk-display w-full" />
            <div className="sk sk-display w-[85%]" />
            <div className="sk sk-display w-[60%]" />
          </div>

          <div className="col-span-12 mt-12 lg:col-span-3 lg:col-start-10 lg:mt-2 lg:self-end">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-t border-rule py-3.5 last:border-b">
                <div className="sk sk-line w-28" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid12 mt-14 md:mt-20">
          <div className="col-span-12 space-y-2.5 lg:col-span-6 lg:col-start-4">
            <div className="sk sk-line w-full" />
            <div className="sk sk-line w-full" />
            <div className="sk sk-line w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
