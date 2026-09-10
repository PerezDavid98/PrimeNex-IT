"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A hairline that draws itself from the left when it scrolls into view.
 * The only ornament this design allows itself.
 */
export function Rule({
  className = "",
  ink = false,
}: {
  className?: string;
  ink?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className={`rule-draw block h-px w-full ${drawn ? "in" : ""} ${
        ink ? "bg-ink" : "bg-rule"
      } ${className}`}
    />
  );
}

/** The one non-rectangular shape in the system, kept small on purpose. */
export function HexMark({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`hex inline-block ${className}`} />;
}
