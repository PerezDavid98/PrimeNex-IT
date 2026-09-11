import type { ReactNode } from "react";

/**
 * A section opens with a rule and a heading. No eyebrow label above it: the
 * heading already says what the section is, and a second tracked-out line
 * restating it in miniature is the commonest piece of template chrome there
 * is.
 */
export function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="rule-head pt-7">
      <h2 className="t-h2">{title}</h2>
      {children ? <div className="t-lede mt-5">{children}</div> : null}
    </header>
  );
}
