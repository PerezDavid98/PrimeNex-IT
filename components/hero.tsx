import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";
import { Symptoms } from "./symptoms";
import { HeroPattern } from "./ui/hero-pattern";

/**
 * One committed dark band at the top of the page.
 *
 * The reference site opens on near-black with white type and a single vivid
 * accent, and carries the first screen on typography rather than an image.
 * Same structure here — with the symptom line doing the work their carousel
 * does, which is the better trade: their rotation cycles claims about
 * themselves, this one cycles problems the reader recognises.
 */
export function Hero({
  hero,
  cta,
  symptoms,
}: {
  hero: Dictionary["hero"];
  cta: Dictionary["cta"];
  symptoms: Dictionary["symptoms"];
}) {
  return (
    <section id="top" className="night relative isolate overflow-hidden">
      <HeroPattern />

      <div className="shell settle relative pt-28 pb-16 md:pt-36 md:pb-20">
        <p className="t-ref">{site.location}</p>
        <h1 className="t-display mt-5 max-w-[20ch]">{hero.headline}</h1>
        <p className="t-lede mt-7 max-w-[52ch]">{hero.lede}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#contact" className="btn btn-solid">
            {cta.startProject}
          </a>
          <a href="#services" className="btn btn-onNight">
            {cta.services}
          </a>
        </div>

        <div className="mt-16 md:mt-20">
          <Symptoms symptoms={symptoms} onNight />
        </div>
      </div>
    </section>
  );
}
