"use client";

import {
  createContext,
  useContext,
  useRef,
  type FC,
  type ReactNode,
  type RefObject,
} from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { ENGINE_MODULES } from "@/constants/growth-engine-constants";
import { getEngineFocus } from "@/hooks/use-engine-focus";
import { type HeroScroll } from "@/hooks/use-hero-converge";
import { type EngineModuleId } from "@/types/growth-engine-types";

/**
 * Longest frame the intro clock will advance by, so a hitch (or a tab coming
 * back from the background) never skips a beat, while 15fps devices still
 * play the intro at full speed.
 */
const MAX_STEP = 1 / 10;

export interface EngineRuntime {
  /** Seconds of intro played. */
  t: number;
  /** Damped scroll convergence, 0 separated → 1 integrated. */
  converge: number;
  scrollY: number;
  /** Damped hover/focus weight per module. */
  focus: Record<EngineModuleId, number>;
  /** Damped window pointer, -1..1 on both axes. */
  pointer: { x: number; y: number };
}

const EngineContext = createContext<RefObject<EngineRuntime> | null>(null);

export const useEngine = (): RefObject<EngineRuntime> => {
  const runtime = useContext(EngineContext);
  if (!runtime) throw new Error("useEngine must be used inside <EngineProvider>");
  return runtime;
};

interface FreezeFrame {
  t: number | null;
  converge: number | null;
}

/**
 * Development-only freeze frame for reviewing a single beat and rendering the
 * static posters: `?engine-t=1.5&engine-converge=0.5`.
 */
const readFreezeFrame = (): FreezeFrame => {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return { t: null, converge: null };
  }
  const params = new URLSearchParams(window.location.search);
  const parse = (key: string) => {
    const value = params.get(key);
    return value === null ? null : Number(value);
  };
  return { t: parse("engine-t"), converge: parse("engine-converge") };
};

interface DriverProps {
  runtimeRef: RefObject<EngineRuntime>;
  scrollRef: RefObject<HeroScroll>;
  pointerRef: RefObject<{ x: number; y: number }>;
}

const EngineDriver: FC<DriverProps> = ({ runtimeRef, scrollRef, pointerRef }) => {
  const freezeRef = useRef<FreezeFrame | null>(null);

  useFrame((_, delta) => {
    freezeRef.current ??= readFreezeFrame();
    const freeze = freezeRef.current;
    const engine = runtimeRef.current;
    const scroll = scrollRef.current;

    engine.t = freeze.t ?? engine.t + Math.min(delta, MAX_STEP);
    engine.scrollY = scroll.scrollY;
    if (freeze.converge !== null) engine.converge = freeze.converge;
    else easing.damp(engine, "converge", scroll.converge, 0.35, delta);

    const focused = getEngineFocus();
    for (const { id } of ENGINE_MODULES) {
      easing.damp(engine.focus, id, focused === id ? 1 : 0, 0.18, delta);
    }

    easing.damp(engine.pointer, "x", pointerRef.current.x, 0.6, delta);
    easing.damp(engine.pointer, "y", pointerRef.current.y, 0.6, delta);
  });

  return null;
};

interface ProviderProps {
  scroll: RefObject<HeroScroll>;
  pointer: RefObject<{ x: number; y: number }>;
  children: ReactNode;
}

export const EngineProvider: FC<ProviderProps> = ({ scroll, pointer, children }) => {
  const runtimeRef = useRef<EngineRuntime>({
    t: 0,
    converge: 0,
    scrollY: 0,
    focus: { strategy: 0, gtm: 0, automation: 0 },
    pointer: { x: 0, y: 0 },
  });

  return (
    <EngineContext.Provider value={runtimeRef}>
      {/* First child, so the driver updates before any part reads the frame. */}
      <EngineDriver runtimeRef={runtimeRef} scrollRef={scroll} pointerRef={pointer} />
      {children}
    </EngineContext.Provider>
  );
};
