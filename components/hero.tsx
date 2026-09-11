import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";

/**
 * Headline, the claim, the two actions, and a photograph of the work itself:
 * analysts reading reports and dashboards, which is what this practice
 * actually does all day.
 *
 * This is also the page's one orchestrated moment — the .settle sequence runs
 * on first load here and nowhere else.
 */
export function Hero({
  hero,
  cta,
}: {
  hero: Dictionary["hero"];
  cta: Dictionary["cta"];
}) {
  return (
    <section id="top" className="pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="shell">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_28rem] lg:items-center">
          <div className="settle min-w-0">
            <p className="t-ref">{site.location}</p>
            <h1 className="t-display mt-4">{hero.headline}</h1>
            <p className="t-lede mt-7">{hero.lede}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-solid">
                {cta.startProject}
              </a>
              <a href="#services" className="btn btn-quiet">
                {cta.services}
              </a>
            </div>
          </div>

          <figure className="min-w-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-band">
              <Image
                src="/img/analysis.jpg"
                alt="Two colleagues reading reports and dashboards on a laptop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
