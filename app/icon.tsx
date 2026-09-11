import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The mark, reduced to what survives at 16px.
 *
 * The full logo is an isometric hexagon with an extruded P inside it; at
 * favicon size the P is mud. So this is the hexagon alone, in the steel cyan
 * sampled from the logo itself, with the void at its centre — recognisably the
 * same mark, legible in a browser tab.
 */
export default function Icon() {
  const hexagon = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fbfcfc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 62,
            background: "#4890a8",
            clipPath: hexagon,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 30,
              height: 33,
              background: "#fbfcfc",
              clipPath: hexagon,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
