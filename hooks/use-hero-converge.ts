"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ENGINE_CONVERGE_DISTANCE } from "@/constants/growth-engine-constants";
import { clamp01 } from "@/helpers/math-helpers";

export interface HeroScroll {
  /** 0 at the top of the page, 1 once the engine has fully converged. */
  converge: number;
  /** Pixels scrolled, for keeping the engine on screen as the hero leaves. */
  scrollY: number;
}

/**
 * Tracks how far the hero has been scrolled through without re-rendering:
 * the scene reads the ref inside its frame loop.
 */
export const useHeroConverge = (): RefObject<HeroScroll> => {
  const state = useRef<HeroScroll>({ converge: 0, scrollY: 0 });

  useEffect(() => {
    const sync = () => {
      const distance = window.innerHeight * ENGINE_CONVERGE_DISTANCE;
      state.current.scrollY = window.scrollY;
      state.current.converge = clamp01(window.scrollY / distance);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return state;
};
