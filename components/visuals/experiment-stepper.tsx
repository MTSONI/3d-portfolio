"use client";

import { useRef, useState, type FC, type KeyboardEvent } from "react";
import { EvidenceTag } from "@/components/ui/evidence-tag";

const STAGES = [
  {
    id: "recruit",
    index: "01",
    label: "Recruit",
    title: "Find qualified professionals",
    body: "Screen for frequent writing tasks and relevant workflows. Opt-in members of 1–2 college consulting and finance clubs who write daily; laptop or phone. Target 25–40 qualified sign-ups per arm.",
    detail: "Participants confirm they write daily (messages, notes, email or documents) and consent to two weeks of light check-ins.",
  },
  {
    id: "assign",
    index: "02",
    label: "Assign",
    title: "Create two comparable groups",
    body: "A: trusted community introduction. B: standard self-serve discovery. Use different batches or campuses to limit cross-talk between arms.",
    detail: "Arms come from comparable cohorts. Sign-up rates are reported alongside retention so that selection bias can be assessed.",
  },
  {
    id: "onboard",
    index: "03",
    label: "Onboard",
    title: "Three identical starter tasks",
    body: "Reply to a WhatsApp message in Hinglish, draft a short email, clean up meeting notes. One short consent form. Both arms receive the same tasks.",
    detail: "The introducer arm gets a lead-run 15-minute live session; the self-serve arm gets the same link and message posted to the group.",
  },
  {
    id: "measure",
    index: "04",
    label: "Measure",
    title: "Track repeat usage",
    body: "Observe weekly return, repeated workflow use and qualitative feedback. Days with dictation, apps used, and whether the first dictation was kept — self-reported in two 1-minute check-ins.",
    detail: "Week-2 retention (3+ days, days 8–14) is the primary metric. Paid-conversion intent is recorded separately as a weak signal.",
  },
  {
    id: "decide",
    index: "05",
    label: "Decide",
    title: "Scale, iterate or stop",
    body: "Compare cohorts and investigate confounders before drawing conclusions. Positive: Arm 1 retention ≥ 2× Arm 2, with ≥ 30% active. Invalidation: retention within 1.2× or under 15%.",
    detail: "Data handling: opt-in only, counts not identities, no dictation content collected, raw sheet deleted after the read-out.",
  },
];

export const ExperimentStepper: FC = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = STAGES[active];
  const fill = (active / (STAGES.length - 1)) * 100;

  const select = (index: number) => {
    const next = Math.max(0, Math.min(index, STAGES.length - 1));
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: STAGES.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key]);
    }
  };

  return (
    <div className="rounded-sm border border-rule bg-graphite">
      <div className="border-b border-rule px-6 py-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
            Experiment design / Proposed — not run
          </p>
          <EvidenceTag kind="proposed" />
        </div>
      </div>

      <div className="px-6 py-10 md:px-8 md:py-14">
        {/* Stage heading */}
        <p className="font-mono text-sm text-lime">{stage.index} / {stage.label.toUpperCase()}</p>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-ivory md:text-5xl">
          {stage.title}
        </h3>

        {/* Timeline rail */}
        <div className="mt-12 md:mt-16">
          <div className="relative">
            {/* Track background */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-[11px] h-[3px] rounded-full bg-rule"
            />
            {/* Filled track */}
            <div
              aria-hidden
              className="absolute left-0 top-[11px] h-[3px] rounded-full bg-lime transition-[width] duration-500 ease-out"
              style={{ width: `${fill}%` }}
            />
            <div
              role="tablist"
              aria-label="Experiment stages"
              className="relative flex justify-between"
            >
              {STAGES.map((item, i) => {
                const selected = i === active;
                const passed = i <= active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => { tabs.current[i] = node; }}
                    role="tab"
                    id={`exp-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="exp-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        selected
                          ? "scale-125 border-lime bg-lime"
                          : passed
                            ? "border-lime bg-ink"
                            : "border-mute bg-ink"
                      }`}
                    >
                      {selected && (
                        <span className="h-2 w-2 rounded-full bg-ink" />
                      )}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                        selected
                          ? "font-semibold text-ivory"
                          : passed
                            ? "text-ivory-dim"
                            : "text-mute"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stage content */}
        <div
          id="exp-panel"
          role="tabpanel"
          aria-labelledby={`exp-tab-${stage.id}`}
          className="mt-10 md:mt-14"
        >
          <div
            key={stage.id}
            className="animate-rise rounded-sm border border-rule bg-ink/60 p-6 md:p-8"
          >
            <p className="text-[15px] leading-relaxed text-ivory-dim">
              {stage.body}
            </p>
            <p className="mt-4 border-t border-rule pt-4 text-sm leading-relaxed text-mute">
              {stage.detail}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => select(active - 1)}
            disabled={active === 0}
            className="font-mono text-xs uppercase tracking-[0.14em] text-ivory-dim transition-colors hover:text-ivory disabled:opacity-30 disabled:hover:text-ivory-dim"
          >
            ← Previous
          </button>
          <span className="font-mono text-xs text-mute">
            {active + 1} / {STAGES.length}
          </span>
          <button
            onClick={() => select(active + 1)}
            disabled={active === STAGES.length - 1}
            className="font-mono text-xs uppercase tracking-[0.14em] text-ivory-dim transition-colors hover:text-ivory disabled:opacity-30 disabled:hover:text-ivory-dim"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="border-t border-rule px-6 py-4 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-copper">
          No results are claimed. This is a testable experiment design.
        </p>
      </div>
    </div>
  );
};
