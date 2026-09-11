import Image from "next/image";
import { site } from "@/lib/content";

/**
 * The supplied logo files are both light-on-dark, so the wordmark disappears
 * on this white ground. Until a dark or vector version exists, the hexagon
 * mark is windowed out of the PNG with a fixed-width crop and the wordmark is
 * typeset live — which also keeps it crisp at any size.
 */
export function Wordmark({
  size = "sm",
  onNight = false,
  className = "",
}: {
  size?: "sm" | "md";
  onNight?: boolean;
  className?: string;
}) {
  const mark =
    size === "md"
      ? { window: "h-9 w-[34px]", image: "h-9" }
      : { window: "h-7 w-[27px]", image: "h-7" };
  const type = size === "md" ? "text-[1.0625rem]" : "text-[0.9375rem]";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className={`relative block shrink-0 overflow-hidden ${mark.window}`}>
        <Image
          src="/logo.png"
          alt=""
          width={943}
          height={392}
          priority
          className={`w-auto max-w-none ${mark.image}`}
        />
      </span>
      <span
        aria-hidden
        className={`leading-none font-bold tracking-[0.045em] ${
          onNight ? "text-paper" : "text-ink"
        } ${type}`}
      >
        PRIMENEX
        <sup className="ml-[0.15em] align-super text-[0.5em] tracking-[0.08em]">IT</sup>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
