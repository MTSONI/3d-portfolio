"use client";

import { useMemo, type FC } from "react";
import { RoundedBox } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";
import {
  ENGINE_MODULES,
  ENGINE_PALETTE as C,
  type Vec3,
} from "@/constants/growth-engine-constants";
import { type EngineModuleId } from "@/types/growth-engine-types";
import { EngineModule, PLATFORM_TOP as TOP, Reveal } from "./module-parts";
import { Bob, MetalRing, Spin } from "./motion-parts";

const configOf = (id: EngineModuleId) => {
  const config = ENGINE_MODULES.find((module) => module.id === id);
  if (!config) throw new Error(`Unknown engine module: ${id}`);
  return config;
};

const STRATEGY = configOf("strategy");
const GTM = configOf("gtm");
const AUTOMATION = configOf("automation");

/** 01 — Strategy: an ivory command tower flanked by planning blocks. */
const StrategyModule: FC = () => (
  <EngineModule config={STRATEGY}>
    <Reveal at={[0.6, 1.2]} mode="grow" position={[0.05, TOP, -0.12]}>
      <RoundedBox args={[0.44, 1.1, 0.44]} radius={0.02} position-y={0.55}>
        <meshStandardMaterial color={C.ivoryWarm} roughness={0.32} metalness={0.3} envMapIntensity={1.3} />
      </RoundedBox>
    </Reveal>
    <Reveal at={[0.75, 1.25]} mode="grow" position={[-0.5, TOP, 0.16]}>
      <RoundedBox args={[0.32, 0.46, 0.32]} radius={0.02} position-y={0.23}>
        <meshStandardMaterial color={C.copperDeep} roughness={0.38} metalness={0.55} envMapIntensity={1.2} />
      </RoundedBox>
    </Reveal>
    <Reveal at={[0.85, 1.3]} mode="grow" position={[0.56, TOP, 0.04]}>
      <RoundedBox args={[0.34, 0.58, 0.34]} radius={0.02} position-y={0.29}>
        <meshStandardMaterial color={C.olive} roughness={0.38} metalness={0.55} envMapIntensity={1.2} />
      </RoundedBox>
    </Reveal>
    <Reveal at={[1.05, 1.55]} position={[0.05, TOP + 1.1, -0.12]}>
      <RoundedBox args={[0.68, 0.07, 0.68]} radius={0.015} position-y={0.035}>
        <meshStandardMaterial color={C.ivory} roughness={0.35} metalness={0.3} />
      </RoundedBox>
      <mesh position-y={0.24}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color={C.ivory} roughness={0.22} metalness={0.35} />
      </mesh>
      <Spin speed={0.9} rotation={[1.25, 0, 0.15]} position={[0, 0.24, 0]}>
        <MetalRing radius={0.28} tube={0.016} color={C.copper} />
      </Spin>
    </Reveal>
    <Reveal at={[0.9, 1.4]} mode="grow" position={[0, TOP, 0.47]}>
      <mesh position-y={0.006}>
        <boxGeometry args={[1.25, 0.012, 0.05]} />
        <meshStandardMaterial
          color={C.ivory}
          emissive={C.ivory}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
    </Reveal>
  </EngineModule>
);

const GTM_NODES: { position: Vec3; color: string; radius: number }[] = [
  { position: [-0.52, 0.72, -0.2], color: C.copper, radius: 0.085 },
  { position: [-0.04, 0.96, -0.36], color: C.copper, radius: 0.085 },
  { position: [0.5, 0.84, -0.22], color: C.copper, radius: 0.085 },
  { position: [0.14, 0.62, 0.24], color: C.ivory, radius: 0.07 },
  { position: [-0.36, 0.52, 0.3], color: C.ivory, radius: 0.065 },
  { position: [0.56, 0.52, 0.3], color: C.ivory, radius: 0.065 },
];

const GTM_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [2, 5],
  [3, 5],
  [0, 4],
  [4, 3],
];

const UP = new Vector3(0, 1, 0);

/** A rod from a to b that draws itself from a outwards. */
const Edge: FC<{ from: Vec3; to: Vec3; at: [number, number] }> = ({ from, to, at }) => {
  const { length, rotation } = useMemo(() => {
    const dir = new Vector3(...to).sub(new Vector3(...from));
    const q = new Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    return { length: dir.length(), rotation: q };
  }, [from, to]);

  return (
    <group position={from} quaternion={rotation}>
      <Reveal at={at} mode="grow">
        <mesh position-y={length / 2}>
          <cylinderGeometry args={[0.014, 0.014, length, 8]} />
          <meshStandardMaterial
            color={C.copper}
            emissive={C.copper}
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
      </Reveal>
    </group>
  );
};

/** 02 — Go-to-Market: a copper distribution network over signal pillars. */
const GtmModule: FC = () => (
  <EngineModule config={GTM}>
    {(
      [
        [-0.58, -0.38],
        [0.58, -0.38],
        [-0.2, 0.36],
        [0.32, 0.4],
      ] as const
    ).map(([x, z], i) => (
      <Reveal key={i} at={[1.0 + i * 0.06, 1.4 + i * 0.06]} mode="grow" position={[x, TOP, z]}>
        <mesh position-y={0.16}>
          <cylinderGeometry args={[0.06, 0.07, 0.32, 20]} />
          <meshStandardMaterial color={C.graphite} roughness={0.4} metalness={0.7} />
        </mesh>
      </Reveal>
    ))}
    <Bob amplitude={0.035} speed={0.9} position={[0, TOP, 0]}>
      {GTM_NODES.map((node, i) => (
        <Reveal key={i} at={[1.1 + i * 0.08, 1.45 + i * 0.08]} position={node.position}>
          <mesh>
            <sphereGeometry args={[node.radius, 24, 24]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={node.color === C.copper ? 0.55 : 0.15}
              roughness={0.2}
              metalness={0.5}
              envMapIntensity={1.3}
            />
          </mesh>
        </Reveal>
      ))}
      {GTM_EDGES.map(([a, b], i) => (
        <Edge
          key={i}
          from={GTM_NODES[a].position}
          to={GTM_NODES[b].position}
          at={[1.3 + i * 0.05, 1.65 + i * 0.05]}
        />
      ))}
    </Bob>
    <Reveal at={[1.4, 1.85]} position={[0, TOP + 0.42, -0.02]}>
      <Spin speed={-0.35} rotation={[Math.PI / 2, 0, 0]}>
        <MetalRing radius={0.66} tube={0.012} color={C.copper} arc={0.78} glow={0.6} />
      </Spin>
    </Reveal>
  </EngineModule>
);

/** Kept low so the ringed processor reads in front of the core, as in the film. */
const CENTER_TOWER = 0.5;

const TOWERS: { x: number; z: number; height: number; width: number; at: [number, number] }[] = [
  { x: -0.66, z: -0.22, height: 0.74, width: 0.4, at: [1.5, 2.0] },
  { x: 0, z: -0.3, height: CENTER_TOWER, width: 0.42, at: [1.55, 2.05] },
  { x: 0.66, z: -0.22, height: 0.82, width: 0.4, at: [1.6, 2.1] },
];

const DRUMS: Vec3[] = [
  [-0.62, 0, 1.2],
  [0.06, 0, 1.42],
  [0.66, 0, 1.18],
];

/** 03 — AI Automation: compute towers around a ringed processor, feeding data drums. */
const AutomationModule: FC = () => (
  <EngineModule config={AUTOMATION}>
    {TOWERS.map((tower, i) => (
      <Reveal key={i} at={tower.at} mode="grow" position={[tower.x, TOP, tower.z]}>
        <RoundedBox
          args={[tower.width, tower.height, tower.width]}
          radius={0.02}
          position-y={tower.height / 2}
        >
          <meshStandardMaterial color={C.graphiteTower} roughness={0.4} metalness={0.45} envMapIntensity={1.1} />
        </RoundedBox>
      </Reveal>
    ))}
    <Reveal at={[1.9, 2.4]} position={[0, TOP + CENTER_TOWER + 0.2, -0.3]}>
      <mesh>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial color={C.ivory} roughness={0.22} metalness={0.35} />
      </mesh>
      <Spin speed={1.1} rotation={[1.2, 0.2, 0]}>
        <MetalRing radius={0.3} tube={0.024} color={C.lime} glow={0.9} />
      </Spin>
      <Spin speed={-0.7} rotation={[1.45, -0.35, 0]}>
        <MetalRing radius={0.4} tube={0.014} color={C.lime} arc={0.7} glow={0.7} />
      </Spin>
    </Reveal>
    <Reveal at={[1.7, 2.1]} mode="grow" position={[0, TOP, 0.4]}>
      <RoundedBox args={[1.3, 0.07, 0.24]} radius={0.015} position-y={0.035}>
        <meshStandardMaterial color={C.ivoryWarm} roughness={0.4} metalness={0.25} />
      </RoundedBox>
    </Reveal>
    <Reveal at={[1.95, 2.35]} position={[0, TOP + 0.36, 0.1]}>
      <Bob amplitude={0.05} speed={1.6}>
        <mesh>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial
            color={C.lime}
            emissive={C.lime}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      </Bob>
    </Reveal>
    {DRUMS.map((position, i) => (
      <Reveal key={i} at={[2.0 + i * 0.1, 2.4 + i * 0.1]} position={position}>
        <Bob amplitude={0.025} speed={1.1} phase={i * 1.7}>
          <mesh position-y={0.08}>
            <cylinderGeometry args={[0.12, 0.12, 0.15, 32]} />
            <meshStandardMaterial
              color={C.lime}
              emissive={C.limeDeep}
              emissiveIntensity={0.35}
              roughness={0.35}
              metalness={0.3}
            />
          </mesh>
        </Bob>
      </Reveal>
    ))}
  </EngineModule>
);

export const EngineModules: FC = () => (
  <>
    <StrategyModule />
    <GtmModule />
    <AutomationModule />
  </>
);
