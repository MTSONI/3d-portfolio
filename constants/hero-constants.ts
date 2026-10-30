import { type Stat } from "@/types/portfolio-types";

/**
 * Hero & Identity Constants.
 * Central place to customize the personal brand and stats.
 */
export const HERO_NAME = "Alex Rivers";

export const HERO_ROLE = "Creative Developer & 3D Engineer";

export const HERO_LOCATION = "San Francisco, CA";

export const HERO_TAGLINE =
  "I build interactive 3D web experiences and performant frontend architectures with React, Next.js, and Three.js.";

export const FLIP_WORDS = ["Creative", "Performant", "Immersive"];

export const STATS: Stat[] = [
  { value: "5+", label: "Years building for web" },
  { value: "20+", label: "Shipped 3D & web apps" },
  { value: "99+", label: "Performance score target" },
  { value: "100%", label: "Client satisfaction" },
];
