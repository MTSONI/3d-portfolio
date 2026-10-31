"use client";

import { useEffect, useMemo, useRef, type FC } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  Color,
  Object3D,
  ShaderMaterial,
  type InstancedMesh,
  type Mesh,
} from "three";
import {
  ENGINE_CORE,
  ENGINE_PALETTE as C,
  ENGINE_PARTICLES as MOTES,
} from "@/constants/growth-engine-constants";
import { easeOutCubic, lerp, windowProgress } from "@/helpers/growth-engine-helpers";
import { useEngine } from "./engine-runtime";

/**
 * Key, rim and fill lights plus a baked studio environment for the metals.
 * The environment is built from Lightformers, so nothing is fetched.
 */
export const EngineLights: FC = () => (
  <>
    <hemisphereLight args={["#fff3dc", "#12130f", 0.6]} />
    <directionalLight position={[4.5, 8, 4]} intensity={2.8} color="#fff1da" />
    <directionalLight position={[-6, 4.5, -5]} intensity={1.1} color="#d6f27a" />
    <directionalLight position={[3, 2, -6]} intensity={0.7} color="#ffb27a" />
    <directionalLight position={[0, 6, -3]} intensity={0.4} color="#e8e0c8" />
    <Environment resolution={128} frames={1}>
      <Lightformer intensity={2.6} position={[0, 7, 2]} rotation-x={Math.PI / 2} scale={[12, 5, 1]} color="#fff4e2" />
      <Lightformer intensity={1.3} position={[-6, 2, -2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#d9f28a" />
      <Lightformer intensity={1.0} position={[6, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#ffb47c" />
      <Lightformer intensity={0.3} position={[0, -3, 0]} rotation-x={-Math.PI / 2} scale={[14, 14, 1]} color="#18191a" />
      <Lightformer intensity={0.5} position={[0, 4, -6]} rotation-x={0.3} scale={[8, 2, 1]} color="#e0d5b8" />
    </Environment>
  </>
);

const floorVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const floorFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform float uReveal;
  varying vec3 vWorld;

  void main() {
    vec2 p = vWorld.xz;
    float d = length(p * vec2(0.62, 0.9));
    float stage = 1.0 - smoothstep(1.6, 4.4, d);

    vec2 cell = p * 1.25;
    vec2 grid = abs(fract(cell - 0.5) - 0.5) / fwidth(cell);
    float line = (1.0 - min(min(grid.x, grid.y), 1.0)) * (1.0 - smoothstep(1.0, 4.5, d));

    float reveal = uReveal * stage;
    vec3 color = mix(uBase, uLine, line * 0.16);
    gl_FragColor = vec4(color, reveal * 0.88);
    #include <colorspace_fragment>
  }
`;

/** Graphite stage with a faint lime grid, fading out radially into the page. */
export const EngineFloor: FC = () => {
  const runtime = useEngine();
  const floor = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: floorVertex,
        fragmentShader: floorFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uBase: { value: new Color(C.graphiteDeep) },
          uLine: { value: new Color(C.floorLine) },
          uReveal: { value: 0 },
        },
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame(() => {
    const shader = floor.current?.material as ShaderMaterial | undefined;
    if (!shader) return;
    shader.uniforms.uReveal.value = easeOutCubic(windowProgress(runtime.current.t, [0, 0.9]));
  });

  return (
    <mesh ref={floor} rotation-x={-Math.PI / 2} renderOrder={-2} material={material}>
      <planeGeometry args={[24, 24]} />
    </mesh>
  );
};

interface Mote {
  angle: number;
  radius: number;
  height: number;
  speed: number;
  phase: number;
  size: number;
}

/** Deterministic spread, so every visit frames the same constellation. */
const scatterMotes = (): Mote[] => {
  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: MOTES.count }, () => ({
    angle: random() * Math.PI * 2,
    radius: lerp(MOTES.radius[0], MOTES.radius[1], random()),
    height: lerp(MOTES.height[0], MOTES.height[1], random()),
    speed: lerp(0.04, 0.12, random()) * (random() > 0.5 ? 1 : -1),
    phase: random() * Math.PI * 2,
    size: lerp(0.6, 1.4, random()),
  }));
};

const MOTE_FIELD = scatterMotes();

/** Ivory and copper motes orbiting slowly above the engine. */
export const EngineParticles: FC = () => {
  const runtime = useEngine();
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    const node = mesh.current;
    if (!node) return;
    const ivory = new Color(C.ivory);
    const copper = new Color(C.copper);
    MOTE_FIELD.forEach((_, i) => node.setColorAt(i, i % 4 === 0 ? copper : ivory));
    if (node.instanceColor) node.instanceColor.needsUpdate = true;
  }, []);

  useFrame(() => {
    const node = mesh.current;
    if (!node) return;
    const { t, converge } = runtime.current;
    const spread = easeOutCubic(windowProgress(t, MOTES.spread));
    const [cx, cy, cz] = ENGINE_CORE.position;

    MOTE_FIELD.forEach((mote, i) => {
      const angle = mote.angle + t * mote.speed;
      const radius = lerp(0.35, mote.radius, spread) * lerp(1, 0.72, converge);
      dummy.position.set(
        cx + Math.cos(angle) * radius,
        lerp(cy + 0.9, mote.height, spread) + Math.sin(t * 0.6 + mote.phase) * 0.14,
        cz + Math.sin(angle) * radius * 0.8
      );
      dummy.scale.setScalar(Math.max(0.0001, mote.size * Math.min(1, t * 1.5)));
      dummy.updateMatrix();
      node.setMatrixAt(i, dummy.matrix);
    });
    node.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, MOTES.count]}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshStandardMaterial roughness={0.25} metalness={0.35} emissive="#4a4530" emissiveIntensity={1.2} />
    </instancedMesh>
  );
};
