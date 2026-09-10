import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { Rule } from "./rule";

/**
 * Section opener: mono index and label in the narrow left column,
 * headline and standfirst in the wide right column.
 */
export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header>
      <Rule ink />
      <div className="grid12 pt-5">
        <p className="t-mono col-span-12 flex items-baseline gap-3 lg:col-span-3">
          <span className="text-ink">{index}</span>
          <span>{label}</span>
        </p>

        <div className="col-span-12 mt-6 lg:col-span-9 lg:mt-0">
          <h2 className="t-h2">{title}</h2>
          {children ? (
            <Reveal delay={0.1}>
              <div className="t-lede mt-7 max-w-2xl">{children}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}
