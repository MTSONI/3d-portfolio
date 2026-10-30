"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { type FC } from "react";
import { GrowthEnginePoster } from "@/components/growth-engine/growth-engine-poster";
import { Arrow } from "@/components/ui/section-heading";
import { HERO_HEADLINE } from "@/constants/hero-constants";
import { HERO_COPY } from "@/constants/site-constants";
import { useDeferred3D, useStaticHeroFallback } from "@/hooks/use-deferred-3d";

const GrowthEngineScene = dynamic(
  () =>
    import("@/components/growth-engine/growth-engine-scene").then(
      (mod) => mod.GrowthEngineScene
    ),
  { ssr: false }
);

export const HomeHero: FC = () => {
  const showScene = useDeferred3D();
  const showPoster = useStaticHeroFallback();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Soft spot behind the engine; the scene's own floor fades into it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_70%_62%,#1f2019_0%,#0c0c0d_70%)]"
      />
      {showScene && <GrowthEngineScene />}
      {showPoster && <GrowthEnginePoster />}

      <div className="lab-container relative z-10 flex flex-1 flex-col pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="max-w-[34rem] lg:max-w-[38rem]">
          <p className="eyebrow animate-rise">Meet Soni · The Growth Lab</p>
          <h1 id="hero-title" className="display mt-6 text-[3.1rem] sm:text-6xl lg:text-[5.4rem]">
            <span className="block animate-rise [animation-delay:120ms]">{HERO_HEADLINE[0]}</span>
            <span className="block animate-rise italic text-lime [animation-delay:240ms]">
              {HERO_HEADLINE[1]}
            </span>
          </h1>
          <p className="lede mt-7 max-w-[30rem] animate-rise [animation-delay:360ms]">{HERO_COPY}</p>
          <div className="mt-9 flex flex-wrap gap-3 animate-rise [animation-delay:480ms]">
            <Link href="/work" className="btn-lime">
              Explore My Work <Arrow />
            </Link>
            <Link href="/contact" className="btn-line">
              Let&apos;s Talk
            </Link>
          </div>
        </div>

        <dl className="mt-auto hidden max-w-[34rem] grid-cols-3 gap-6 border-t border-rule pt-6 md:grid">
          {[
            ["Strategy", "Diagnose & prioritise"],
            ["Go-to-Market", "Segment, channel, price"],
            ["AI Automation", "Agents with approval"],
          ].map(([term, detail]) => (
            <div key={term}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory">{term}</dt>
              <dd className="mt-1.5 text-sm text-mute">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
