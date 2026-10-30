"use client";

import { useRef, useState, type FC, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { METHOD } from "@/constants/site-constants";

/**
 * The operating method as an accessible tab rail:
 * arrow keys / Home / End move between stages, the rail fills to the active one.
 */
export const MethodSection: FC = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = METHOD[active];
  const fill = (active / (METHOD.length - 1)) * 100;

  const select = (index: number) => {
    const next = (index + METHOD.length) % METHOD.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: METHOD.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key]);
    }
  };

  return (
    <section id="method" aria-labelledby="method-title" className="border-t border-rule bg-graphite py-24 md:py-36">
      <div className="lab-container">
        <SectionHeading
          id="method-title"
          eyebrow="How I think"
          title={
            <>
              Observe before you build. <em className="text-lime">Measure before you scale.</em>
            </>
          }
          intro="Six stages I run on every problem, whether it ends in a model, a campaign or a piece of software. Select a stage to see it applied."
        />

        <div className="mt-16 md:mt-20">
          <div className="relative">
            <div aria-hidden className="absolute left-0 right-0 top-[19px] hidden h-px bg-rule md:block" />
            <div
              aria-hidden
              className="absolute left-0 top-[19px] hidden h-px bg-lime transition-[width] duration-700 ease-out md:block"
              style={{ width: `${fill}%` }}
            />
            <div
              role="tablist"
              aria-label="Operating method stages"
              className="relative grid grid-cols-3 gap-y-6 md:grid-cols-6"
            >
              {METHOD.map((item, i) => {
                const selected = i === active;
                const passed = i <= active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabs.current[i] = node;
                    }}
                    role="tab"
                    id={`method-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="method-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    className="group flex flex-col items-start gap-3 text-left md:items-center md:text-center"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                        selected
                          ? "border-lime bg-lime text-ink"
                          : passed
                            ? "border-lime bg-graphite text-lime"
                            : "border-rule bg-graphite text-mute group-hover:border-ivory-dim"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                        selected ? "text-ivory" : "text-mute group-hover:text-ivory-dim"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="method-panel"
            role="tabpanel"
            aria-labelledby={`method-tab-${step.id}`}
            className="mt-14 grid gap-10 border-t border-rule pt-12 md:grid-cols-12"
          >
            <div key={step.id} className="animate-rise md:col-span-7">
              <p className="eyebrow">
                Stage 0{active + 1} · {step.title}
              </p>
              <p className="display mt-5 text-4xl md:text-5xl">{step.question}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-dim">{step.body}</p>
            </div>
            <aside key={`${step.id}-example`} className="animate-rise border-l border-lime/40 pl-6 md:col-span-4 md:col-start-9">
              <p className="eyebrow text-lime">Applied</p>
              <p className="mt-4 leading-relaxed text-ivory">{step.example}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
