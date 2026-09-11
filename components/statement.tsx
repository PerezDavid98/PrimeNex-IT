import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Reveal } from "./ui/reveal";

/**
 * Reverse block. The rhythm break the page needs, and the one place the
 * supplied logo — drawn light-on-dark — is used at full size as intended.
 */
export function Statement({ statement }: { statement: Dictionary["statement"] }) {
  return (
    <section className="bg-ink text-paper">
      <div className="shell grid12 gap-y-12 py-20 md:py-28">
        <p className="t-mono col-span-12 border-t border-white/25 pt-5 text-white/60 lg:col-span-3">
          {statement.label}
        </p>

        <Reveal className="col-span-12 lg:col-span-8 lg:col-start-5" y={16}>
          <p className="text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.35] tracking-[-0.02em] text-paper">
            {statement.body}
          </p>
        </Reveal>

        <div className="col-span-12 flex justify-end lg:col-span-8 lg:col-start-5">
          <Image
            src="/logo.png"
            alt=""
            width={943}
            height={392}
            className="h-10 w-auto opacity-90 md:h-12"
          />
        </div>
      </div>
    </section>
  );
}
