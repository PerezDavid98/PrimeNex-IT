import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "./ui/reveal";

/**
 * The rhythm break: a photographic band with navy laid over it, so the page
 * has one dark, full-weight moment between the light sections.
 */
export function Statement({ statement }: { statement: Dictionary["statement"] }) {
  return (
    <section className="py-6">
      <div className="shell">
        <div className="plate plate-tint relative isolate min-h-[26rem] md:min-h-[32rem]">
          <Image
            src="/img/infrastructure.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="relative z-10 grid12 gap-y-8 p-8 py-16 md:p-14 md:py-24">
            <p className="t-mono col-span-12 text-paper/60 lg:col-span-3">{statement.label}</p>

            <Reveal className="col-span-12 lg:col-span-8 lg:col-start-5" y={16}>
              <p className="text-[clamp(1.25rem,2.3vw,1.9rem)] leading-[1.4] tracking-[-0.015em] text-paper">
                {statement.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
