"use client";

import { useEffect, useRef, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { ENGINE_CAMERA } from "@/constants/growth-engine-constants";
import { HERO_3D_CONFIG, SCENE_CAPABILITY_CONFIG } from "@/constants/scene-config";
import { setEngineFocus } from "@/hooks/use-engine-focus";
import { useHeroConverge } from "@/hooks/use-hero-converge";
import { useNormalizedPointer } from "@/hooks/use-normalized-pointer";
import { useSceneActive } from "@/hooks/use-scene-active";
import { CameraRig } from "./camera-rig";
import { EngineLights, EngineFloor, EngineParticles } from "./engine-atmosphere";
import { ConvergeBase, EngineCore } from "./engine-core";
import { EngineLegend } from "./engine-legend";
import { EngineModules } from "./engine-modules";
import { EnginePaths } from "./engine-paths";
import { EngineProvider } from "./engine-runtime";

/**
 * Live Growth Engine hero: Strategy, Go-to-Market and AI Automation modules
 * assemble around a central core, then converge into one engine on scroll.
 */
export const GrowthEngineScene: FC = () => {
  const frame = useRef<HTMLElement>(null);
  const active = useSceneActive({ whenVisible: frame });
  const scroll = useHeroConverge();
  const pointer = useNormalizedPointer();
  const isDesktop = useMediaQuery({ minWidth: SCENE_CAPABILITY_CONFIG.desktopMinViewport });

  useEffect(
    () => () => {
      setEngineFocus(null);
      document.body.style.cursor = "";
    },
    []
  );

  return (
    <figure ref={frame} className="absolute inset-0" style={{ width: "100vw", height: "100vh" }}>
      <figcaption className="sr-only">
        Three systems, one growth engine: Strategy, Go-to-Market and AI
        Automation modules assembling around a central growth engine core.
      </figcaption>
      <Canvas
        camera={{ fov: ENGINE_CAMERA.fov, position: [0, 8, 18], near: 0.1, far: 80 }}
        dpr={isDesktop ? HERO_3D_CONFIG.dprDesktop : HERO_3D_CONFIG.dprMobile}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          stencil: false,
          alpha: true,
        }}
        frameloop={active ? "always" : "never"}
        onPointerMissed={() => setEngineFocus(null)}
      >
        <EngineProvider scroll={scroll} pointer={pointer}>
          <CameraRig offset={isDesktop} />
          <EngineLights />
          <EngineFloor />
          <ConvergeBase />
          <EngineCore />
          <EnginePaths />
          <EngineModules />
          <EngineParticles />
        </EngineProvider>
      </Canvas>
      <EngineLegend />
    </figure>
  );
};
