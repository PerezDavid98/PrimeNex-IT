/**
 * The hero's ground.
 *
 * The reference lays a faceted geometric field with a digit texture behind its
 * first screen instead of a flat colour, and that is what this is — except the
 * facets are taken from the logo rather than from them. The mark is an
 * isometric hexagon built out of flat faces, so an oversized field of the same
 * hexagon, sliced into its own faces, is the company's own geometry enlarged.
 *
 * Pure SVG: no image to download, crisp at any size, a couple of kilobytes
 * inline, and no JavaScript. Decorative, so it is hidden from assistive
 * technology, and every value is kept faint enough that the type above it
 * keeps its contrast — verified by the accessibility suite rather than by eye.
 */
export function HeroPattern() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="hero-pattern"
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* The digit texture, sparse enough to read as texture rather than as
            a wall of ones and zeroes competing with the headline. */}
        <pattern id="pnx-digits" width="210" height="66" patternUnits="userSpaceOnUse">
          <text x="0" y="16" className="hero-pattern__digits">
            01001 10110
          </text>
          <text x="96" y="46" className="hero-pattern__digits">
            1011 0100
          </text>
        </pattern>

        {/* Absent where the words are, strongest out past them. A texture that
            runs under a paragraph is noise; one that fills the space the
            paragraph leaves is a ground. */}
        <linearGradient id="pnx-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.42" stopColor="#000" />
          <stop offset="0.72" stopColor="#888" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>

        <mask id="pnx-mask">
          <rect width="1200" height="560" fill="url(#pnx-fade)" />
        </mask>

        {/* One hexagon, reused at several sizes, in the logo's proportions. */}
        <symbol id="pnx-hex" viewBox="0 0 100 116">
          <polygon points="50,0 100,29 100,87 50,116 0,87 0,29" />
        </symbol>
      </defs>

      <rect width="1200" height="560" fill="url(#pnx-digits)" mask="url(#pnx-mask)" />

      {/* The faces, overlapping the way they do on the mark itself. */}
      <g className="hero-pattern__facets">
        <use href="#pnx-hex" x="760" y="-120" width="420" height="487" opacity="0.55" />
        <use href="#pnx-hex" x="980" y="180" width="300" height="348" opacity="0.4" />
        <use href="#pnx-hex" x="640" y="230" width="230" height="267" opacity="0.3" />
        <use href="#pnx-hex" x="1080" y="-40" width="180" height="209" opacity="0.5" />
      </g>

      <g className="hero-pattern__edges">
        <use href="#pnx-hex" x="760" y="-120" width="420" height="487" />
        <use href="#pnx-hex" x="980" y="180" width="300" height="348" />
        <use href="#pnx-hex" x="640" y="230" width="230" height="267" />
      </g>
    </svg>
  );
}
