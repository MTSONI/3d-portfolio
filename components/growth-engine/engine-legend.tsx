"use client";

import { type FC } from "react";
import { ENGINE_MODULES } from "@/constants/growth-engine-constants";
import { setEngineFocus, useEngineFocus } from "@/hooks/use-engine-focus";

/**
 * Keyboard- and pointer-reachable index of the three modules. Hovering or
 * focusing an entry lights up and lifts the matching module in the scene.
 */
export const EngineLegend: FC = () => {
  const active = useEngineFocus();

  return (
    <ul
      aria-label="Growth engine modules"
      className="animate-reveal absolute bottom-8 right-8 z-10 hidden flex-col gap-1.5 md:flex"
      style={{ animationDelay: "2.4s" }}
    >
      {ENGINE_MODULES.map((module) => {
        const isActive = active === module.id;
        return (
          <li key={module.id}>
            <button
              type="button"
              onPointerEnter={() => setEngineFocus(module.id)}
              onPointerLeave={() => setEngineFocus(null)}
              onFocus={() => setEngineFocus(module.id)}
              onBlur={() => setEngineFocus(null)}
              aria-pressed={isActive}
              className="group flex items-center gap-3 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-1 focus-visible:ring-white/40"
            >
              <span
                className="tabular-nums transition-opacity"
                style={{ color: module.accent, opacity: isActive ? 1 : 0.75 }}
              >
                {module.index}
              </span>
              <span className={isActive ? "text-white" : undefined}>{module.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
