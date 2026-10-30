/**
 * Centralized 3D Scene and WebGL Performance Configuration.
 * Edit these settings to customize 3D models, camera parameters, and hardware gating.
 */

export const HERO_3D_CONFIG = {
  /** Path to the primary GLTF/GLB model in the public directory */
  modelPath: "/models/astronaut.glb",
  /** Camera initial position [x, y, z] */
  cameraPosition: [0, 1, 3] as [number, number, number],
  /** Desktop scale and position */
  desktopScale: 0.3,
  desktopPosition: [1.3, -1, 0] as [number, number, number],
  /** Mobile scale and position */
  mobileScale: 0.23,
  mobilePosition: [0, -1.5, 0] as [number, number, number],
  /** Device Pixel Ratio bounds to prevent high-DPI GPU fillrate exhaustion */
  dprDesktop: [1, 1.5] as [number, number],
  dprMobile: [1, 1.25] as [number, number],
  /** Breakpoint threshold in pixels for mobile 3D layout adjustments */
  mobileBreakpoint: 853,
} as const;

export const SCENE_CAPABILITY_CONFIG = {
  /** Allow stage-0 hero 3D model to mount on capable mobile devices */
  enableHeroOnMobile: true,
  /**
   * Keep background globe as lightweight CSS poster on mobile to preserve battery
   * and guarantee smooth 60fps scroll performance. Set to true to enable WebGL globe on mobile.
   */
  enableGlobeOnMobile: false,
  /** Viewport breakpoint for full desktop 3D effects */
  desktopMinViewport: 854,
  /** Viewport breakpoint for parallax backdrop image layers */
  layersMinViewport: 768,
  /** Minimum hardware concurrency (CPU cores) */
  minCores: 2,
  /** Minimum device memory in GB */
  minMemoryGB: 2,
} as const;
