"use client";

import { useMemo, type FC } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, type PerspectiveCamera } from "three";
import {
  ENGINE_CAMERA as CAM,
  ENGINE_MODULES,
} from "@/constants/growth-engine-constants";
import {
  easeInOutCubic,
  lerp,
  placeModule,
  windowProgress,
} from "@/helpers/growth-engine-helpers";
import { useEngine } from "./engine-runtime";

interface CameraRigProps {
  /** Offset the framing to the right of the hero copy. */
  offset: boolean;
}

/**
 * Cinematic push-in from a high wide to the resting three-quarter view, then a
 * slow orbital drift, pointer parallax, a lean toward the hovered module, and
 * a higher, tighter framing as the modules converge on scroll.
 */
export const CameraRig: FC<CameraRigProps> = ({ offset }) => {
  const runtime = useEngine();
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const size = useThree((state) => state.size);
  const scratch = useMemo(
    () => ({ target: new Vector3(), placement: { x: 0, z: 0, scale: 1 } }),
    []
  );

  useFrame(() => {
    const { t, converge, pointer, focus, scrollY } = runtime.current;
    const { width, height } = size;
    const push = easeInOutCubic(windowProgress(t, CAM.pushIn));
    const aspect = width / height;
    const portrait = aspect < 1;
    const rest = portrait ? CAM.portrait : CAM.to;
    const converged = portrait ? CAM.portrait : CAM.converged;
    const fit = Math.max(
      1,
      (portrait ? CAM.portrait.referenceAspect : CAM.referenceAspect) / aspect
    );

    const distance =
      lerp(lerp(CAM.from.distance, rest.distance, push), converged.distance, converge) * fit;
    const elevation =
      lerp(lerp(CAM.from.elevation, rest.elevation, push), converged.elevation, converge) +
      pointer.y * CAM.parallax.elevation;
    const azimuth =
      lerp(CAM.from.azimuth, rest.azimuth, push) +
      Math.sin(t * CAM.orbitSpeed) * CAM.orbitAmplitude * push -
      pointer.x * CAM.parallax.azimuth;

    const target = scratch.target.set(...CAM.target);
    for (const config of ENGINE_MODULES) {
      const weight = focus[config.id] * CAM.focusLean;
      if (weight < 1e-3) continue;
      placeModule(config, converge, scratch.placement);
      target.x += (scratch.placement.x - target.x) * weight;
      target.z += (scratch.placement.z - target.z) * weight;
    }

    camera.position.set(
      target.x + Math.sin(azimuth) * Math.cos(elevation) * distance,
      target.y + Math.sin(elevation) * distance,
      target.z + Math.cos(azimuth) * Math.cos(elevation) * distance
    );
    camera.lookAt(target);

    // Shifting the projection, not the scene, keeps perspective identical
    // while the engine sits beside the copy and lingers as the hero scrolls.
    const shiftX = offset ? -CAM.desktopShift.x * width : 0;
    const shiftY = (offset ? -CAM.desktopShift.y * height : 0) - scrollY * CAM.scrollHold;
    camera.setViewOffset(width, height, shiftX, shiftY, width, height);
  });

  return null;
};
