"use client";

import { useSyncExternalStore } from "react";
import { type EngineModuleId } from "@/types/growth-engine-types";

/**
 * Which Growth Engine module is hovered or focused. Lives outside React so the
 * DOM legend and the WebGL scene (separate renderers) share one source.
 */
let active: EngineModuleId | null = null;
const listeners = new Set<() => void>();

export const setEngineFocus = (id: EngineModuleId | null): void => {
  if (active === id) return;
  active = id;
  for (const listener of listeners) listener();
};

export const getEngineFocus = (): EngineModuleId | null => active;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useEngineFocus = (): EngineModuleId | null =>
  useSyncExternalStore(subscribe, getEngineFocus, () => null);
