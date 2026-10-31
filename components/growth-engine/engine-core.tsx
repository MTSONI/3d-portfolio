"use client";

import { useRef, type FC } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type PointLight,
} from "three";
import {
  ENGINE_BASE,
  ENGINE_CORE as CORE,
  ENGINE_PALETTE as C,
} from "@/constants/growth-engine-constants";
import {
  easeOutBack,
  easeOutCubic,
  lerp,
  windowProgress,
} from "@/helpers/growth-engine-helpers";
import { useEngine } from "./engine-runtime";
import { BlobShadow } from "./module-parts";
import { MetalRing, Spin } from "./motion-parts";

/** Seconds between the core's slow heartbeat glows. */
const HEARTBEAT = 2.4;

/**
 * The Growth Engine core: a lacquered sphere on a graphite pedestal, wrapped by
 * counter-rotating copper rings and a tilted lime orbit. It starts as a seed
 * and swells as the last module lands; when converged, the copper rings open
 * out to encircle all three modules.
 */
export const EngineCore: FC = () => {
  const runtime = useEngine();
  const core = useRef<Group>(null);
  const sphere = useRef<Group>(null);
  const shell = useRef<MeshStandardMaterial>(null);
  const copper = useRef<Group>(null);
  const lime = useRef<Group>(null);
  const light = useRef<PointLight>(null);
  const [x, y, z] = CORE.position;

  useFrame(() => {
    const { t, converge } = runtime.current;
    const grow = windowProgress(t, CORE.grow);
    const rings = windowProgress(t, CORE.ringsIn);
    const scale = lerp(CORE.seedScale, 1, grow && easeOutBack(grow, 1.2));

    if (core.current) core.current.position.y = y + converge * 0.22;
    if (sphere.current) sphere.current.scale.setScalar(scale);

    if (copper.current) {
      const open = lerp(1, CORE.convergedRingRadius / CORE.copperRings[0].radius, easeOutCubic(converge));
      copper.current.scale.setScalar(Math.max(0.0001, (rings && easeOutBack(rings)) * open));
      copper.current.rotation.x = lerp(-0.14, 0, converge);
    }

    if (lime.current) {
      // The lime orbit is there from the seed frame, then swells with the core.
      lime.current.scale.setScalar(lerp(0.55, 1, grow && easeOutBack(grow)));
    }

    const beat = Math.pow(0.5 + 0.5 * Math.cos((t / HEARTBEAT) * Math.PI * 2), 6);
    if (shell.current) shell.current.emissiveIntensity = 0.08 + beat * 0.18 * grow;
    if (light.current) light.current.intensity = (1.4 + beat * 1.8) * Math.max(0.3, grow);
  });

  return (
    <group position={[x, 0, z]}>
      <BlobShadow size={[2.6, 2.6]} opacity={0.8} />
      <mesh position-y={CORE.pedestal.height / 2}>
        <cylinderGeometry
          args={[CORE.pedestal.radius * 0.82, CORE.pedestal.radius, CORE.pedestal.height, 48]}
        />
        <meshStandardMaterial color={C.graphite} roughness={0.35} metalness={0.75} envMapIntensity={1.2} />
      </mesh>
      <mesh position-y={CORE.pedestal.height + 0.004} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[CORE.pedestal.radius * 0.6, CORE.pedestal.radius * 0.72, 48]} />
        <meshBasicMaterial color={C.lime} toneMapped={false} />
      </mesh>

      <group ref={core} position-y={y}>
        <group ref={sphere}>
          <mesh>
            <sphereGeometry args={[CORE.radius, 64, 64]} />
            <meshStandardMaterial
              ref={shell}
              color="#d4d09e"
              emissive={C.lime}
              emissiveIntensity={0.08}
              roughness={0.18}
              metalness={0.42}
              envMapIntensity={1.4}
            />
          </mesh>
          <mesh scale={1.12}>
            <sphereGeometry args={[CORE.radius, 32, 32]} />
            <meshBasicMaterial
              color={C.lime}
              transparent
              opacity={0.07}
              side={BackSide}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        <group ref={copper}>
          {CORE.copperRings.map((ring, i) => (
            <Spin key={i} speed={ring.speed} rotation={[Math.PI / 2, 0, i * 1.3]}>
              <MetalRing radius={ring.radius} tube={ring.tube} color={C.copper} arc={ring.arc} glow={0.55} />
              <mesh position={[ring.radius, 0, 0]}>
                <sphereGeometry args={[ring.tube * 2.6, 16, 16]} />
                <meshStandardMaterial
                  color={C.ivory}
                  emissive={C.copper}
                  emissiveIntensity={0.8}
                  toneMapped={false}
                />
              </mesh>
            </Spin>
          ))}
        </group>

        <group ref={lime}>
          <Spin speed={CORE.limeRing.speed} rotation={[CORE.limeRing.tilt, 0.35, 0]}>
            <MetalRing
              radius={CORE.limeRing.radius}
              tube={CORE.limeRing.tube}
              color={C.lime}
              arc={0.8}
              glow={0.9}
            />
          </Spin>
        </group>

        <pointLight ref={light} color="#e9f7b0" intensity={1.2} distance={4.5} decay={1.6} />
      </group>
    </group>
  );
};

/** The shared plinth that rises under every module once they converge. */
export const ConvergeBase: FC = () => {
  const runtime = useEngine();
  const base = useRef<Group>(null);
  const slab = useRef<Mesh>(null);
  const rim = useRef<MeshStandardMaterial>(null);

  useFrame(() => {
    const converge = runtime.current.converge;
    const node = base.current;
    if (!node) return;
    node.visible = converge > 0.01;
    const grow = easeOutCubic(converge);
    node.scale.set(lerp(0.7, 1, grow), 1, lerp(0.7, 1, grow));
    node.position.y = lerp(-0.12, 0, grow);
    const material = slab.current?.material as MeshStandardMaterial | undefined;
    if (material) material.opacity = grow;
    if (rim.current) rim.current.emissiveIntensity = grow * 1.6;
  });

  return (
    <group ref={base} visible={false}>
      <mesh ref={slab} position-y={-ENGINE_BASE.height / 2}>
        <cylinderGeometry args={[ENGINE_BASE.radius, ENGINE_BASE.radius + 0.08, ENGINE_BASE.height, 96]} />
        <meshStandardMaterial
          color={C.graphiteDeep}
          roughness={0.5}
          metalness={0.6}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.004}>
        <torusGeometry args={[ENGINE_BASE.radius - 0.12, 0.012, 8, 160]} />
        <meshStandardMaterial
          ref={rim}
          color={C.lime}
          emissive={C.lime}
          emissiveIntensity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
