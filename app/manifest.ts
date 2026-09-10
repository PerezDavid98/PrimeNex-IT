import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description:
      "IT support, web platforms, data analysis and embedded systems, engineered end to end from Cartago, Costa Rica.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
