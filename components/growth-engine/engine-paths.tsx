"use client";

import { useEffect, useMemo, useRef, type FC } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
  type Mesh,
} from "three";
import {
  ENGINE_CORE,
  ENGINE_MODULES,
  ENGINE_PATHS as PATHS,
  type EngineModuleConfig,
} from "@/constants/growth-engine-constants";
import {
  archPoint,
  easeInOutCubic,
  placeModule,
  windowProgress,
} from "@/helpers/growth-engine-helpers";
import { useEngine } from "./engine-runtime";

const TUBULAR = 64;
const RADIAL = 8;
const ARCH_SAMPLES = 16;

/**
 * A unit-length arched tube along +x. Each path stretches it between the core
 * and its module every frame, so convergence needs no geometry rebuilds.
 */
const makeArchTube = (radius: number) => {
  const points = Array.from({ length: ARCH_SAMPLES + 1 }, (_, i) => {
    const t = i / ARCH_SAMPLES;
    return new Vector3(t, Math.sin(Math.PI * t) * PATHS.arch, 0);
  });
  return new TubeGeometry(new CatmullRomCurve3(points), TUBULAR, radius, RADIAL, false);
};

interface Endpoints {
  from: [number, number, number];
  to: [number, number, number];
}

/** Core pedestal edge → nearest platform edge, both at deck height. */
const solveEndpoints = (
  config: EngineModuleConfig,
  converge: number,
  placement: { x: number; z: number; scale: number },
  out: Endpoints
) => {
  placeModule(config, converge, placement);
  const [cx, , cz] = ENGINE_CORE.position;
  const dx = placement.x - cx;
  const dz = placement.z - cz;
  const length = Math.hypot(dx, dz) || 1;
  const ux = dx / length;
  const uz = dz / length;

  // Ray from module centre back toward the core, clipped by its plinth.
  const halfW = (config.size[0] / 2 + 0.13) * placement.scale;
  const halfD = (config.size[1] / 2 + 0.13) * placement.scale;
  const edge = Math.min(
    Math.abs(ux) > 1e-4 ? halfW / Math.abs(ux) : Infinity,
    Math.abs(uz) > 1e-4 ? halfD / Math.abs(uz) : Infinity
  );
  const pedestal = ENGINE_CORE.pedestal.radius;
  const height = PATHS.height * placement.scale;

  out.from[0] = cx + ux * pedestal;
  out.from[1] = height;
  out.from[2] = cz + uz * pedestal;
  out.to[0] = placement.x - ux * edge;
  out.to[1] = height;
  out.to[2] = placement.z - uz * edge;
  return out;
};

const EnginePath: FC<{ config: EngineModuleConfig }> = ({ config }) => {
  const runtime = useEngine();
  const line = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);
  const pulses = useRef<(Mesh | null)[]>([]);
  const color = PATHS.color[config.id];
  const inbound = PATHS.inbound[config.id];

  const [lineGeometry, haloGeometry] = useMemo(
    () => [makeArchTube(PATHS.radius), makeArchTube(PATHS.radius * 2.6)],
    []
  );
  useEffect(
    () => () => {
      lineGeometry.dispose();
      haloGeometry.dispose();
    },
    [lineGeometry, haloGeometry]
  );

  const scratch = useMemo(
    () => ({
      ends: { from: [0, 0, 0], to: [0, 0, 0] } as Endpoints,
      placement: { x: 0, z: 0, scale: 1 },
      point: { x: 0, y: 0, z: 0 },
    }),
    []
  );

  useFrame(() => {
    const { t, converge, focus } = runtime.current;
    const { from, to } = solveEndpoints(config, converge, scratch.placement, scratch.ends);
    const dx = to[0] - from[0];
    const dz = to[2] - from[2];
    const span = Math.hypot(dx, dz);
    const heading = -Math.atan2(dz, dx);

    const draw = easeInOutCubic(windowProgress(t, PATHS.draw[config.id]));
    const count = Math.floor(draw * TUBULAR) * RADIAL * 6;
    lineGeometry.setDrawRange(0, count);
    haloGeometry.setDrawRange(0, count);

    for (const mesh of [line.current, halo.current]) {
      if (!mesh) continue;
      mesh.position.set(from[0], from[1], from[2]);
      mesh.rotation.set(0, heading, 0);
      mesh.scale.set(span, 1, 1);
    }
    if (halo.current) {
      const material = halo.current.material as { opacity: number };
      material.opacity = 0.2 + focus[config.id] * 0.3;
    }

    const live = windowProgress(t, [PATHS.pulsesFrom, PATHS.pulsesFrom + 0.6]);
    pulses.current.forEach((pulse, k) => {
      if (!pulse) return;
      const phase = (t * PATHS.pulseSpeed + k / PATHS.pulsesPerPath) % 1;
      const u = inbound ? 1 - phase : phase;
      archPoint(from, to, PATHS.arch, u, scratch.point);
      pulse.position.set(scratch.point.x, scratch.point.y, scratch.point.z);
      // Fade at both ends so pulses are born from and absorbed into the parts.
      const envelope = Math.sin(Math.PI * phase);
      pulse.scale.setScalar(Math.max(0.0001, live * (0.55 + envelope * 0.65)));
      pulse.visible = live > 0;
    });
  });

  return (
    <group>
      <mesh ref={line} geometry={lineGeometry}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <mesh ref={halo} geometry={haloGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {Array.from({ length: PATHS.pulsesPerPath }, (_, k) => (
        <mesh
          key={k}
          ref={(mesh) => {
            pulses.current[k] = mesh;
          }}
          visible={false}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#fffbe8" toneMapped={false} />
          <mesh scale={2.8}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.45}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
};

/** Glowing conduits from the core to each module, carrying light pulses. */
export const EnginePaths: FC = () => (
  <>
    {ENGINE_MODULES.map((config) => (
      <EnginePath key={config.id} config={config} />
    ))}
  </>
);
