"use client";

import { Suspense, useRef, type FC } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Astronaut } from "@/components/portfolio/astronaut";
import { Loader } from "@/components/portfolio/loader";
import { HERO_3D_CONFIG } from "@/constants/scene-config";
import { useSceneActive } from "@/hooks/use-scene-active";

const Rig: FC = () => {
  useFrame((state: RootState, delta: number) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
  return null;
};

export const HeroScene: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: HERO_3D_CONFIG.mobileBreakpoint });
  const prefersReducedMotion = useReducedMotion();
  const frame = useRef<HTMLElement>(null);
  const active = useSceneActive({ whenVisible: frame });

  return (
    <figure
      ref={frame}
      className="absolute inset-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        camera={{ position: HERO_3D_CONFIG.cameraPosition }}
        dpr={isMobile ? HERO_3D_CONFIG.dprMobile : HERO_3D_CONFIG.dprDesktop}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          alpha: true,
        }}
        frameloop={active ? "always" : "never"}
      >
        <Suspense fallback={<Loader />}>
          <Float
            speed={prefersReducedMotion ? 0 : 1}
            rotationIntensity={prefersReducedMotion ? 0 : 1}
            floatIntensity={prefersReducedMotion ? 0 : 1}
          >
            <Astronaut
              scale={isMobile ? HERO_3D_CONFIG.mobileScale : HERO_3D_CONFIG.desktopScale}
              position={isMobile ? HERO_3D_CONFIG.mobilePosition : HERO_3D_CONFIG.desktopPosition}
            />
          </Float>
          {!prefersReducedMotion && <Rig />}
        </Suspense>
      </Canvas>
    </figure>
  );
};
