"use client";

import { useEffect, useRef, type FC } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";
import { HERO_3D_CONFIG } from "@/constants/scene-config";
import { type AstronautProps } from "@/types/portfolio-types";
import {
  type BufferGeometry,
  type Group,
  type Material,
  type Object3D,
  type Skeleton,
} from "three";

export const Astronaut: FC<AstronautProps> = (props) => {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(HERO_3D_CONFIG.modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // A shorter drop settles the largest moving object above the fold sooner,
  // which is what Speed Index measures.
  const yPosition = useMotionValue(2);
  const ySpring = useSpring(yPosition, { damping: 30 });

  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  const nodesMap = nodes as unknown as Record<
    string,
    { geometry: BufferGeometry; skeleton: Skeleton } & Object3D
  >;
  const textureMaterial = materials[
    "AstronautFallingTexture.png"
  ] as Material;

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[-Math.PI / 2, -0.2, 2.2]}
      scale={props.scale ?? HERO_3D_CONFIG.desktopScale}
      position={props.position ?? HERO_3D_CONFIG.desktopPosition}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="Root">
            <group name="metarig">
              <primitive object={nodesMap.metarig_rootJoint as Object3D} />
              {(
                [
                  "Cube001_0",
                  "Cube005_0",
                  "Cube002_0",
                  "Plane_0",
                  "Cube008_0",
                  "Cube004_0",
                  "Cube003_0",
                  "Cube_0",
                  "Cube009_0",
                  "Cube011_0",
                ] as const
              ).map((name) => (
                <skinnedMesh
                  key={name}
                  name={name}
                  geometry={nodesMap[name].geometry}
                  material={textureMaterial}
                  skeleton={nodesMap[name].skeleton}
                />
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(HERO_3D_CONFIG.modelPath);
