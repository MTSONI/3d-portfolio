"use client";

import { useEffect, useState } from "react";
import { SCENE_CAPABILITY_CONFIG } from "@/constants/scene-config";

const IDLE_TIMEOUT_MS = 2000;
const LAST_STAGE = 1;

/**
 * Renderer names that mean WebGL is being rasterised by the CPU.
 */
const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i;

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

let hardwareWebGL: boolean | undefined;

export const hasHardwareWebGL = (): boolean => {
  if (typeof window === "undefined") return false;
  if (hardwareWebGL !== undefined) return hardwareWebGL;

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

  if (!gl) {
    hardwareWebGL = false;
    return hardwareWebGL;
  }

  const debug = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debug
    ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL))
    : "";

  gl.getExtension("WEBGL_lose_context")?.loseContext();

  hardwareWebGL = renderer ? !SOFTWARE_RENDERER.test(renderer) : true;
  return hardwareWebGL;
};

const isCapableHardware = () => {
  if (typeof window === "undefined") return false;
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? SCENE_CAPABILITY_CONFIG.minCores;
  const memory = nav.deviceMemory ?? SCENE_CAPABILITY_CONFIG.minMemoryGB;

  return (
    cores >= SCENE_CAPABILITY_CONFIG.minCores &&
    memory >= SCENE_CAPABILITY_CONFIG.minMemoryGB
  );
};

const whenIdle = (run: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(run, {
      timeout: IDLE_TIMEOUT_MS,
    });
    return () => window.cancelIdleCallback(handle);
  }

  const handle = window.setTimeout(run, 200);
  return () => window.clearTimeout(handle);
};

let unlocked = -1;
let scheduled = false;
const listeners = new Set<() => void>();

const advance = () => {
  unlocked += 1;
  for (const listener of listeners) listener();
  if (unlocked < LAST_STAGE) whenIdle(advance);
};

const scheduleStages = () => {
  if (scheduled) return;
  scheduled = true;

  const begin = () => whenIdle(advance);

  if (document.readyState === "complete") {
    begin();
  } else {
    window.addEventListener("load", begin, { once: true });
  }
};

/**
 * Gates a WebGL scene behind load, an idle main thread, a capable device and a
 * hardware renderer.
 * Stage 0: Hero 3D Scene.
 * Stage 1: Themed Globe Scene (falls back to CSS GlobePoster if deferred/disabled).
 */
export const useDeferred3D = (stage = 0): boolean => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const test = () => {
      if (typeof window === "undefined") return false;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reducedMotion.matches) return false;
      if (!hasHardwareWebGL() || !isCapableHardware()) return false;

      const isDesktop = window.matchMedia(
        `(min-width: ${SCENE_CAPABILITY_CONFIG.desktopMinViewport}px)`
      ).matches;

      if (stage === 0) {
        return isDesktop || SCENE_CAPABILITY_CONFIG.enableHeroOnMobile;
      }

      return isDesktop || SCENE_CAPABILITY_CONFIG.enableGlobeOnMobile;
    };

    const sync = () => setEnabled(unlocked >= stage && test());

    listeners.add(sync);
    scheduleStages();
    const cancelCatchUp = whenIdle(sync);

    const viewport = window.matchMedia(
      `(min-width: ${SCENE_CAPABILITY_CONFIG.desktopMinViewport}px)`
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    viewport.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      listeners.delete(sync);
      cancelCatchUp();
      viewport.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, [stage]);

  return enabled;
};

/**
 * Gates decorative parallax images behind load, hardware headroom, and non-reduced motion.
 */
export const useDeferredLayers = (): boolean => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const test = () => {
      if (typeof window === "undefined") return false;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reducedMotion.matches) return false;
      const viewport = window.matchMedia(
        `(min-width: ${SCENE_CAPABILITY_CONFIG.layersMinViewport}px)`
      );
      return viewport.matches && isCapableHardware();
    };

    const sync = () => setEnabled(unlocked >= 0 && test());

    listeners.add(sync);
    scheduleStages();
    const cancelCatchUp = whenIdle(sync);

    const viewport = window.matchMedia(
      `(min-width: ${SCENE_CAPABILITY_CONFIG.layersMinViewport}px)`
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    viewport.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      listeners.delete(sync);
      cancelCatchUp();
      viewport.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
};
