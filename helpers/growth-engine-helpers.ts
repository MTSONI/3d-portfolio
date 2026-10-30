import {
  ENGINE_CONVERGED_SCALE,
  type EngineModuleConfig,
} from "@/constants/growth-engine-constants";
import { clamp01 } from "./math-helpers";

/** Normalised progress of `t` through the window [start, end]. */
export const windowProgress = (
  t: number,
  [start, end]: readonly [number, number]
): number => clamp01((t - start) / (end - start));

export const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

export const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/** Settles with a small overshoot, like a part seating into place. */
export const easeOutBack = (x: number, overshoot = 1.3): number => {
  const c = overshoot + 1;
  return 1 + c * Math.pow(x - 1, 3) + overshoot * Math.pow(x - 1, 2);
};

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export interface ModulePlacement {
  x: number;
  z: number;
  scale: number;
}

/** Where a module sits on the floor for a given convergence. */
export const placeModule = (
  config: EngineModuleConfig,
  converge: number,
  out: ModulePlacement
): ModulePlacement => {
  out.x = lerp(config.position[0], config.converged[0], converge);
  out.z = lerp(config.position[2], config.converged[2], converge);
  out.scale = lerp(1, ENGINE_CONVERGED_SCALE, converge);
  return out;
};

/**
 * Point on the shallow arch every engine path follows: a straight run from
 * `from` to `to` lifted by `arch` at the midpoint.
 */
export const archPoint = (
  from: readonly [number, number, number],
  to: readonly [number, number, number],
  arch: number,
  t: number,
  out: { x: number; y: number; z: number }
) => {
  out.x = lerp(from[0], to[0], t);
  out.y = lerp(from[1], to[1], t) + Math.sin(Math.PI * t) * arch;
  out.z = lerp(from[2], to[2], t);
  return out;
};
