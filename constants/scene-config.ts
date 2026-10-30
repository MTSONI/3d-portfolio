/**
 * WebGL performance and capability gating for the Growth Engine hero.
 */

export const HERO_3D_CONFIG = {
  /** Device Pixel Ratio bounds to prevent high-DPI GPU fillrate exhaustion */
  dprDesktop: [1, 1.5] as [number, number],
  dprMobile: [1, 1.25] as [number, number],
} as const;

export const SCENE_CAPABILITY_CONFIG = {
  /**
   * Allow the live Growth Engine on capable mobile devices.
   * Off: phones get the static Growth Engine poster (the approved mobile
   * fallback). Turn on only once live mobile 3D has been signed off.
   */
  enableHeroOnMobile: false,
  /** Viewport breakpoint for the live desktop scene */
  desktopMinViewport: 854,
  /** Minimum hardware concurrency (CPU cores) */
  minCores: 2,
  /** Minimum device memory in GB */
  minMemoryGB: 2,
} as const;
