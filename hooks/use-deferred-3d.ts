"use client";

import { useEffect, useState } from "react";
import { SCENE_CAPABILITY_CONFIG } from "@/constants/scene-config";

const IDLE_TIMEOUT_MS = 2000;

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

const desktopQuery = () =>
  window.matchMedia(`(min-width: ${SCENE_CAPABILITY_CONFIG.desktopMinViewport}px)`);

const motionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * Whether this device and viewport should ever get the live hero scene,
 * regardless of whether it has been unlocked yet.
 */
const isSceneSupported = (): boolean => {
  if (typeof window === "undefined") return false;
  if (motionQuery().matches) return false;
  if (!hasHardwareWebGL() || !isCapableHardware()) return false;
  return desktopQuery().matches || SCENE_CAPABILITY_CONFIG.enableHeroOnMobile;
};

const whenIdle = (run: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(run, 200);
  return () => window.clearTimeout(handle);
};

/** Re-run `sync` whenever the viewport or motion preference changes. */
const watchCapability = (sync: () => void) => {
  const viewport = desktopQuery();
  const motion = motionQuery();
  viewport.addEventListener("change", sync);
  motion.addEventListener("change", sync);
  return () => {
    viewport.removeEventListener("change", sync);
    motion.removeEventListener("change", sync);
  };
};

/**
 * Gates the WebGL hero behind page load, an idle main thread, a capable device
 * and a hardware renderer, so the scene never competes with first paint.
 */
export const useDeferred3D = (): boolean => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let unlocked = false;
    const sync = () => setEnabled(unlocked && isSceneSupported());
    let cancelIdle = () => {};

    const unlock = () => {
      cancelIdle = whenIdle(() => {
        unlocked = true;
        sync();
      });
    };

    if (document.readyState === "complete") unlock();
    else window.addEventListener("load", unlock, { once: true });

    const stopWatching = watchCapability(sync);
    return () => {
      cancelIdle();
      window.removeEventListener("load", unlock);
      stopWatching();
    };
  }, []);

  return enabled;
};

/**
 * True when the hero will never get its live scene here (phones, reduced
 * motion, software rendering), so a static poster should stand in. Stays false
 * on capable desktops, so the poster never flashes ahead of the intro.
 */
export const useStaticHeroFallback = (): boolean => {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const sync = () => setFallback(!isSceneSupported());
    sync();
    return watchCapability(sync);
  }, []);

  return fallback;
};
