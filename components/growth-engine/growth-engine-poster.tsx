"use client";

import Image from "next/image";
import { type FC } from "react";
import { ENGINE_POSTERS } from "@/constants/growth-engine-constants";

/**
 * Static stand-in for the live Growth Engine: a render of the assembled scene,
 * portrait-composed on phones and landscape on desktops without WebGL.
 */
export const GrowthEnginePoster: FC = () => (
  <figure className="pointer-events-none absolute inset-0">
    <figcaption className="sr-only">
      Three systems, one growth engine: Strategy, Go-to-Market and AI
      Automation modules integrated around a central growth engine core.
    </figcaption>
    <div className="absolute inset-x-0 bottom-2 h-[36vh] md:hidden">
      <Image
        src={ENGINE_POSTERS.portrait}
        alt=""
        fill
        sizes="100vw"
        className="object-contain object-bottom [mask-image:radial-gradient(closest-side,black_80%,transparent)]"
      />
    </div>
    <div className="absolute inset-0 hidden md:block">
      <Image
        src={ENGINE_POSTERS.landscape}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  </figure>
);
