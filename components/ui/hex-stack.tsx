import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The hero object.
 *
 * The logo is an isometric hexagon with an extruded P, so the honest visual for
 * this company is that same solid taken apart: one hexagonal plate per
 * practice, stacked in the same projection. It is drawn, not decorated —
 * every plate is a real link to the service it names, so this replaces the
 * text index rather than sitting beside it as ornament.
 *
 * Flat facets, hairline edges, one tint step per layer. No gradients, no glow,
 * no fake depth: the depth comes from the geometry, which is where the logo
 * gets its own.
 */

/* gap must clear h + depth or the hexagons collide and the stack reads as a
   zigzag ribbon instead of four separate plates. */
const PLATE = { w: 172, h: 80, depth: 14, gap: 96 };

/** Flat-top hexagon at a 2:1 ratio — a regular hexagon in isometric view. */
const TOP_FACE = `${PLATE.w * 0.25},0 ${PLATE.w * 0.75},0 ${PLATE.w},${PLATE.h / 2} ${
  PLATE.w * 0.75
},${PLATE.h} ${PLATE.w * 0.25},${PLATE.h} 0,${PLATE.h / 2}`;

/** The three lower edges, extruded down — the only faces a viewer above can see. */
const SIDE_FACE = [
  `M0,${PLATE.h / 2}`,
  `L${PLATE.w * 0.25},${PLATE.h}`,
  `L${PLATE.w * 0.75},${PLATE.h}`,
  `L${PLATE.w},${PLATE.h / 2}`,
  `L${PLATE.w},${PLATE.h / 2 + PLATE.depth}`,
  `L${PLATE.w * 0.75},${PLATE.h + PLATE.depth}`,
  `L${PLATE.w * 0.25},${PLATE.h + PLATE.depth}`,
  `L0,${PLATE.h / 2 + PLATE.depth}`,
  "Z",
].join(" ");

/** Top plate lightest, bottom plate deepest: read as a solid, not four stickers. */
const TINTS = [
  { top: "#e8eef4", side: "#a8bccb" },
  { top: "#dde6ee", side: "#97aec0" },
  { top: "#cfdce6", side: "#859eb3" },
  { top: "#bed0dd", side: "#728ca3" },
];

export function HexStack({
  labels,
  href = "#services",
  ariaLabel,
}: {
  labels: Dictionary["practiceIndex"];
  href?: string;
  ariaLabel: string;
}) {
  const height = PLATE.gap * (labels.length - 1) + PLATE.h + PLATE.depth;

  return (
    <svg
      viewBox={`0 0 420 ${height + 8}`}
      className="hex-stack w-full"
      role="group"
      aria-label={ariaLabel}
    >
      {labels.map((label, i) => {
        const y = i * PLATE.gap;
        const tint = TINTS[i % TINTS.length];
        const centre = y + PLATE.h / 2;

        return (
          <a key={label} href={href} className="hex-stack__plate">
            {/* A generous invisible hit area: the visible plate is a hexagon,
                but the target should not require hitting a corner. */}
            <rect x="0" y={y} width="420" height={PLATE.h + PLATE.depth} fill="transparent" />

            <g className="hex-stack__solid">
              <path d={SIDE_FACE} transform={`translate(0 ${y})`} fill={tint.side} />
              <polygon
                points={TOP_FACE}
                transform={`translate(0 ${y})`}
                fill={tint.top}
                className="hex-stack__top"
              />
              {/* The inner hexagon echoes the void in the logo's mark. */}
              <polygon
                points={TOP_FACE}
                transform={`translate(${PLATE.w * 0.32} ${y + PLATE.h * 0.32}) scale(0.36)`}
                fill="none"
                className="hex-stack__inner"
              />
            </g>

            {/* Leader line out to the label, so the diagram reads as a drawing
                rather than as a picture with captions. */}
            <line
              x1={PLATE.w + 4}
              y1={centre}
              x2={PLATE.w + 34}
              y2={centre}
              className="hex-stack__leader"
            />

            <text x={PLATE.w + 44} y={centre - 5} className="hex-stack__num">
              0{i + 1}
            </text>
            <text x={PLATE.w + 44} y={centre + 13} className="hex-stack__label">
              {label}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
