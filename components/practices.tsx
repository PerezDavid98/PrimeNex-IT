import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The four practices as photographed tiles — the workhorse pattern on the
 * reference site, and the reason its pages feel substantial rather than empty.
 *
 * The photographs are decorative: each tile's heading names the practice and
 * the line under it says what it covers, so the image adds nothing a reader
 * needs. That is why alt is empty — announcing "two people looking at a
 * warehouse" before the words "ERP and supply chain" would be noise, not
 * information.
 */
const MEDIA = [
  { src: "/img/analysis.jpg", position: "object-center" },
  { src: "/img/advisory.jpg", position: "object-center" },
  { src: "/img/supply-chain.jpg", position: "object-center" },
  { src: "/img/reporting.jpg", position: "object-center" },
];

export function Practices({ services }: { services: Dictionary["services"] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="max-w-[46rem]">
          <h2 className="t-h2">{services.title}</h2>
          <p className="t-lede mt-5">{services.lede}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.groups.map((group, i) => (
            <li key={group.tab}>
              <a href="#services" className="tile h-full">
                <span className="tile__media">
                  <Image
                    src={MEDIA[i].src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover ${MEDIA[i].position}`}
                  />
                </span>
                <span className="tile__body">
                  <span className="t-h3 block">{group.tab}</span>
                  <span className="t-body mt-2.5 block text-[0.9375rem]">
                    {group.headline}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
