"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A quiet entrance: the element settles up a few pixels as it comes into view.
 *
 * Deliberately built on an IntersectionObserver and a CSS transition instead of
 * a scroll-animation library, because content must never be left hidden by a
 * trigger that did not fire:
 *   - the server renders it visible, so it reads with JS disabled;
 *   - a layout effect arms it before the first paint, so nothing flashes;
 *   - a timeout reveals it regardless if the observer never reports.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** seconds */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"ssr" | "armed" | "in">("ssr");

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("in");
      return;
    }
    setPhase("armed");
  }, []);

  useEffect(() => {
    if (phase !== "armed") return;
    const node = ref.current;
    if (!node) return;

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setPhase("in");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(node);

    const timer = window.setTimeout(reveal, 1800);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [phase]);

  const armed = phase === "armed";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: armed ? 0 : 1,
        transform: armed ? `translateY(${y}px)` : "none",
        transition:
          phase === "in"
            ? `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`
            : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
