"use client";

import { useMemo, useRef, type FC, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { CanvasTexture, type Group, type MeshStandardMaterial } from "three";
import {
  ENGINE_PALETTE,
  type EngineModuleConfig,
  type Vec3,
} from "@/constants/growth-engine-constants";
import {
  easeOutBack,
  easeOutCubic,
  lerp,
  placeModule,
  windowProgress,
} from "@/helpers/growth-engine-helpers";
import { getEngineFocus, setEngineFocus, useEngineFocus } from "@/hooks/use-engine-focus";
import { type EngineModuleId } from "@/types/growth-engine-types";
import { useEngine } from "./engine-runtime";

/** Height of a platform's top face; module parts stand on this. */
export const PLATFORM_TOP = 0.26;

/** Smallest scale we hand three.js, which dislikes a zero-scale matrix. */
const MIN_SCALE = 0.0001;

let shadowTexture: CanvasTexture | null = null;

const getShadowTexture = () => {
  if (shadowTexture) return shadowTexture;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(0,0,0,0.85)");
    gradient.addColorStop(0.55, "rgba(0,0,0,0.45)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  shadowTexture = new CanvasTexture(canvas);
  return shadowTexture;
};

export const BlobShadow: FC<{ size: [number, number]; opacity?: number }> = ({
  size,
  opacity = 0.7,
}) => (
  <mesh rotation-x={-Math.PI / 2} position-y={0.003} renderOrder={-1}>
    <planeGeometry args={size} />
    <meshBasicMaterial
      map={getShadowTexture()}
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  </mesh>
);

interface RevealProps {
  /** Intro window [start, end] in seconds. */
  at: [number, number];
  /** "grow" extrudes upwards from the group origin, "pop" scales in with a settle. */
  mode?: "grow" | "pop";
  position?: Vec3;
  children: ReactNode;
}

/** Plays one part of a module in on its own beat, so modules assemble piece by piece. */
export const Reveal: FC<RevealProps> = ({ at, mode = "pop", position, children }) => {
  const group = useRef<Group>(null);
  const runtime = useEngine();

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    const progress = windowProgress(runtime.current.t, at);
    node.visible = progress > 0;
    if (mode === "grow") {
      node.scale.set(1, Math.max(MIN_SCALE, easeOutCubic(progress)), 1);
    } else {
      node.scale.setScalar(Math.max(MIN_SCALE, progress && easeOutBack(progress)));
    }
  });

  return (
    <group ref={group} position={position} visible={false}>
      {children}
    </group>
  );
};

interface PlatformProps {
  id: EngineModuleId;
  size: [number, number];
  accent: string;
}

/** Stepped graphite plinth with an inset light trim that brightens on focus. */
export const ModulePlatform: FC<PlatformProps> = ({ id, size: [w, d], accent }) => {
  const runtime = useEngine();
  const trims = useRef<(MeshStandardMaterial | null)[]>([]);

  useFrame(() => {
    const glow = 0.9 + runtime.current.focus[id] * 2.2;
    for (const material of trims.current) {
      if (material) material.emissiveIntensity = glow;
    }
  });

  const inset = 0.1;
  const trimY = PLATFORM_TOP + 0.004;
  const bars: { position: Vec3; args: Vec3 }[] = [
    { position: [0, trimY, d / 2 - inset], args: [w - inset * 2, 0.012, 0.03] },
    { position: [0, trimY, -d / 2 + inset], args: [w - inset * 2, 0.012, 0.03] },
    { position: [w / 2 - inset, trimY, 0], args: [0.03, 0.012, d - inset * 2] },
    { position: [-w / 2 + inset, trimY, 0], args: [0.03, 0.012, d - inset * 2] },
  ];

  return (
    <group>
      <BlobShadow size={[w + 1.6, d + 1.6]} />
      <RoundedBox args={[w + 0.26, 0.12, d + 0.26]} radius={0.025} position-y={0.06}>
        <meshStandardMaterial
          color={ENGINE_PALETTE.graphiteDeep}
          roughness={0.5}
          metalness={0.45}
        />
      </RoundedBox>
      <RoundedBox args={[w, 0.14, d]} radius={0.025} position-y={0.19}>
        <meshStandardMaterial
          color={ENGINE_PALETTE.graphiteWarm}
          roughness={0.55}
          metalness={0.25}
        />
      </RoundedBox>
      {bars.map((bar, i) => (
        <mesh key={i} position={bar.position}>
          <boxGeometry args={bar.args} />
          <meshStandardMaterial
            ref={(material) => {
              trims.current[i] = material;
            }}
            color={accent}
            emissive={accent}
            emissiveIntensity={0.9}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

interface EngineModuleProps {
  config: EngineModuleConfig;
  children: ReactNode;
}

/**
 * Places a module, plays its rise, slides it toward the core as the hero is
 * scrolled, and lifts it while hovered or focused from the legend.
 */
export const EngineModule: FC<EngineModuleProps> = ({ config, children }) => {
  const group = useRef<Group>(null);
  const runtime = useEngine();
  const focused = useEngineFocus() === config.id;
  const placement = useMemo(() => ({ x: 0, z: 0, scale: 1 }), []);
  // Side modules swing their faces toward the core as they converge.
  const turn = -Math.sign(config.position[0]) * 0.42;

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    const { t, converge, focus } = runtime.current;
    const rise = windowProgress(t, config.rise);
    const lift = focus[config.id];
    placeModule(config, converge, placement);

    node.visible = rise > 0;
    node.position.set(
      placement.x,
      lerp(-0.6, 0, easeOutCubic(rise)) + lift * 0.1,
      placement.z
    );
    node.rotation.y = turn * converge;
    const settle = rise && easeOutBack(rise, 1.1);
    node.scale.setScalar(
      Math.max(MIN_SCALE, settle * placement.scale * (1 + 0.035 * lift))
    );
  });

  const onOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setEngineFocus(config.id);
    document.body.style.cursor = "pointer";
  };

  const onOut = () => {
    if (getEngineFocus() === config.id) setEngineFocus(null);
    document.body.style.cursor = "";
  };

  return (
    <group ref={group} visible={false} onPointerOver={onOver} onPointerOut={onOut}>
      <ModulePlatform id={config.id} size={config.size} accent={config.accent} />
      {children}
      <Html position={[0, 1.75, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
        <div
          className="whitespace-nowrap rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-neutral-200 backdrop-blur-md transition-all duration-300"
          style={{
            opacity: focused ? 1 : 0,
            transform: `translateY(${focused ? 0 : 6}px)`,
          }}
        >
          <span style={{ color: config.accent }}>{config.index}</span>{" "}
          {config.label}
        </div>
      </Html>
    </group>
  );
};
