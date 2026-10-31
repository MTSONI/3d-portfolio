import { type EngineModuleId } from "@/types/growth-engine-types";

/**
 * Growth Engine hero scene.
 * Palette, layout, intro timeline and camera for the three-module engine.
 * Timings are in seconds from the moment the canvas mounts and follow the
 * Growth_Engine_16x9 / 9x16 reference films.
 */

export const ENGINE_PALETTE = {
  graphiteDeep: "#1d1e1f",
  graphite: "#3a3b37",
  graphiteWarm: "#6b6959",
  graphiteTower: "#55574b",
  ivory: "#ece5d2",
  ivoryWarm: "#d8cdb1",
  lime: "#c8f04a",
  limeDeep: "#8fb02a",
  copper: "#e0773c",
  copperDeep: "#8a4a2b",
  olive: "#58603d",
  floorLine: "#c8f04a",
} as const;

export type Vec3 = [number, number, number];

export interface EngineModuleConfig {
  id: EngineModuleId;
  index: string;
  label: string;
  /** Accent used for the platform trim, path and hover glow. */
  accent: string;
  /** Platform footprint [width, depth]. */
  size: [number, number];
  /** Resting position once the intro has assembled. */
  position: Vec3;
  /** Position when the hero has been scrolled through and the engine is integrated. */
  converged: Vec3;
  /** Intro window [start, end] for the platform rise. */
  rise: [number, number];
}

export const ENGINE_MODULES: EngineModuleConfig[] = [
  {
    id: "strategy",
    index: "01",
    label: "Strategy",
    accent: ENGINE_PALETTE.ivory,
    size: [1.75, 1.3],
    position: [-2.35, 0, -1.25],
    converged: [-1.3, 0, -0.78],
    rise: [0.35, 1.15],
  },
  {
    id: "gtm",
    index: "02",
    label: "Go-to-Market",
    accent: ENGINE_PALETTE.copper,
    size: [1.75, 1.3],
    position: [2.35, 0, -1.15],
    converged: [1.3, 0, -0.72],
    rise: [0.85, 1.6],
  },
  {
    id: "automation",
    index: "03",
    label: "AI Automation",
    accent: ENGINE_PALETTE.lime,
    size: [2.0, 1.45],
    position: [0, 0, 1.85],
    converged: [0, 0, 1.05],
    rise: [1.3, 2.1],
  },
];

export const ENGINE_CORE = {
  position: [0, 0.9, -0.1] as Vec3,
  radius: 0.6,
  pedestal: { radius: 0.46, height: 0.36 },
  /** The core starts as a small seed and swells while the last module lands. */
  seedScale: 0.32,
  grow: [1.4, 2.3] as [number, number],
  copperRings: [
    { radius: 1.02, tube: 0.03, speed: 0.22, arc: 0.88 },
    { radius: 1.2, tube: 0.018, speed: -0.14, arc: 0.72 },
  ],
  limeRing: { radius: 0.8, tube: 0.026, speed: 0.55, tilt: 1.12 },
  ringsIn: [1.6, 2.5] as [number, number],
  /** Copper ring radius once the engine has converged and the rings wrap all three modules. */
  convergedRingRadius: 2.05,
} as const;

export const ENGINE_PATHS = {
  /** Per-module window in which each glowing path draws outwards from the core. */
  draw: {
    strategy: [0.05, 0.9],
    gtm: [0.2, 1.05],
    automation: [0.4, 1.3],
  } as Record<EngineModuleId, [number, number]>,
  /** Strategy's ivory reads too pale as a light line, so its path runs warm. */
  color: {
    strategy: "#e3b07a",
    gtm: ENGINE_PALETTE.copper,
    automation: ENGINE_PALETTE.lime,
  } as Record<EngineModuleId, string>,
  /** Strategy and GTM feed the core; the core drives Automation. */
  inbound: { strategy: true, gtm: true, automation: false } as Record<
    EngineModuleId,
    boolean
  >,
  arch: 0.16,
  radius: 0.042,
  height: 0.27,
  /** Pulses start once everything has landed. */
  pulsesFrom: 2.1,
  pulsesPerPath: 2,
  pulseSpeed: 0.42,
} as const;

export const ENGINE_PARTICLES = {
  count: 26,
  radius: [1.4, 3.6] as [number, number],
  height: [1.1, 2.5] as [number, number],
  /** Motes start clustered above the seed and drift outwards over this window. */
  spread: [0.0, 3.0] as [number, number],
} as const;

/** Module scale once converged; they tuck in tighter around the core. */
export const ENGINE_CONVERGED_SCALE = 0.86;

/** The shared plinth that rises under all three modules as they converge. */
export const ENGINE_BASE = {
  radius: 2.75,
  height: 0.08,
} as const;

export const ENGINE_CAMERA = {
  fov: 30,
  target: [0, 0.45, 0.1] as Vec3,
  /** Push-in from far and high to the resting framing. */
  from: { distance: 21.5, elevation: 0.68, azimuth: -0.1 },
  to: { distance: 14.8, elevation: 0.5, azimuth: -0.24 },
  pushIn: [0, 3.2] as [number, number],
  /** Converged framing moves closer and higher to read the integrated engine. */
  converged: { distance: 12.6, elevation: 0.64 },
  /** Framing is tuned at 16:9; narrower canvases dolly out to keep every module in view. */
  referenceAspect: 16 / 9,
  /**
   * Portrait canvases (the 9:16 film) look down more steeply so the engine's
   * depth stacks vertically. Used for the mobile poster and for live mobile 3D
   * if it is ever enabled.
   */
  portrait: { distance: 23, elevation: 0.9, azimuth: 0.3, referenceAspect: 9 / 16 },
  orbitAmplitude: 0.09,
  orbitSpeed: 0.14,
  parallax: { azimuth: 0.08, elevation: 0.04 },
  /** How far toward a hovered module the camera leans its aim. */
  focusLean: 0.14,
  /**
   * Shift of the engine as a fraction of the canvas (positive = right, down),
   * so it sits beside and below the hero copy on desktop.
   */
  desktopShift: { x: 0.255, y: 0.1 },
  /** Fraction of page scroll the engine counters, so it lingers as the hero leaves. */
  scrollHold: 0.35,
} as const;

/** Scroll distance (in viewport heights) over which the modules converge. */
export const ENGINE_CONVERGE_DISTANCE = 0.55;

export const ENGINE_POSTERS = {
  landscape: "/assets/growth-engine/engine-landscape.webp",
  portrait: "/assets/growth-engine/engine-portrait.webp",
} as const;
