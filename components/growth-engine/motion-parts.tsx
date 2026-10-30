"use client";

import { useRef, type FC, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { type Group } from "three";
import { type Vec3 } from "@/constants/growth-engine-constants";
import { useEngine } from "./engine-runtime";

interface SpinProps {
  /** Radians per second; sign sets direction. */
  speed: number;
  axis?: "x" | "y" | "z";
  position?: Vec3;
  rotation?: Vec3;
  children: ReactNode;
}

export const Spin: FC<SpinProps> = ({ speed, axis = "z", position, rotation, children }) => {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);

  useFrame((_, delta) => {
    if (inner.current) inner.current.rotation[axis] += speed * delta;
  });

  return (
    <group ref={outer} position={position} rotation={rotation}>
      <group ref={inner}>{children}</group>
    </group>
  );
};

interface BobProps {
  amplitude?: number;
  speed?: number;
  phase?: number;
  position?: Vec3;
  children: ReactNode;
}

/** Slow vertical drift, the idle breathing every loose part has in the reference. */
export const Bob: FC<BobProps> = ({
  amplitude = 0.04,
  speed = 1.2,
  phase = 0,
  position,
  children,
}) => {
  const group = useRef<Group>(null);
  const runtime = useEngine();
  const baseY = position?.[1] ?? 0;

  useFrame(() => {
    if (!group.current) return;
    group.current.position.y =
      baseY + Math.sin(runtime.current.t * speed + phase) * amplitude;
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
};

interface RingProps {
  radius: number;
  tube: number;
  color: string;
  /** Fraction of a full turn; a gap is what makes the spin readable. */
  arc?: number;
  glow?: number;
}

/** Brushed-metal ring with an emissive core tint. */
export const MetalRing: FC<RingProps> = ({ radius, tube, color, arc = 0.86, glow = 0.35 }) => (
  <mesh>
    <torusGeometry args={[radius, tube, 12, 120, Math.PI * 2 * arc]} />
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={glow}
      metalness={0.85}
      roughness={0.28}
    />
  </mesh>
);
