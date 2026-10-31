"use client";

import { useState, type FC } from "react";

const LIME = "#c8f04a";
const COPPER = "#e0773c";
const IVORY = "#ece5d2";
const DIM = "#b9b2a1";
const MUTE = "#6a665c";
const MONO = "ui-monospace, monospace";

const STAGES = [
  {
    id: "install",
    label: "Install",
    question: "How many people download?",
    india: "India ≈ 14% of installs",
    status: "over-indexed",
    fill: LIME,
  },
  {
    id: "activate",
    label: "Activate",
    question: "Who completes a first dictation?",
    india: "Unknown — no public data",
    status: "the real question",
    fill: IVORY,
  },
  {
    id: "repeat",
    label: "Repeat",
    question: "Who comes back on day 7, day 14?",
    india: "Unknown — this is what the experiment measures",
    status: "the lever",
    fill: COPPER,
  },
  {
    id: "monetise",
    label: "Monetise",
    question: "Who chooses a paid plan?",
    india: "India ≈ 2% of IAP revenue",
    status: "downstream signal",
    fill: "#8a4a2b",
  },
];

export const GrowthPipeline: FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = hovered ?? -1;

  return (
    <div className="rounded-sm border border-rule bg-graphite p-5 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        Downloads are not durable growth
      </p>
      <p className="mt-3 text-xl text-ivory md:text-2xl">
        What happens <em className="font-serif text-lime">after</em> installation?
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-4">
        {STAGES.map((stage, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={stage.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`relative flex flex-col items-center bg-ink p-4 transition-colors duration-200 md:p-6 ${
                isActive ? "bg-char" : ""
              }`}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" className="mb-3">
                <circle
                  cx="14"
                  cy="14"
                  r={isActive ? 12 : 10}
                  fill="none"
                  stroke={stage.fill}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-200"
                />
                <circle
                  cx="14"
                  cy="14"
                  r={isActive ? 5 : 3}
                  fill={stage.fill}
                  className="transition-all duration-200"
                />
              </svg>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-ivory" : "text-mute"
                }`}
              >
                {stage.label}
              </span>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 text-mute md:block"
                >
                  —
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeIndex >= 0 && (
        <div className="mt-5 animate-rise rounded-sm border border-rule bg-ink p-5">
          <p className="text-sm text-ivory">{STAGES[activeIndex].question}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-ivory-dim">
              {STAGES[activeIndex].india}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                color: STAGES[activeIndex].fill,
                border: `1px solid ${STAGES[activeIndex].fill}`,
              }}
            >
              {STAGES[activeIndex].status}
            </span>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-mute">
        Hover each stage to see where India's data is known and where the gap is. The experiment
        targets <strong className="text-ivory-dim">repeat usage</strong> — the stage between activation and payment.
      </p>
    </div>
  );
};

/** Simplified inline SVG pipeline for the strategy narrative. */
export const PipelineInline: FC = () => (
  <svg
    viewBox="0 0 620 80"
    className="w-full"
    role="img"
    aria-label="Growth pipeline: Install, Activate, Repeat, Monetise — each stage narrows"
  >
    {STAGES.map((stage, i) => {
      const x = 20 + i * 150;
      const w = 120;
      return (
        <g key={stage.id}>
          <rect
            x={x}
            y="20"
            width={w}
            height="40"
            rx="4"
            fill="none"
            stroke={MUTE}
          />
          <text
            x={x + w / 2}
            y="45"
            textAnchor="middle"
            fill={i === 2 ? LIME : DIM}
            fontSize="12"
            fontFamily={MONO}
          >
            {stage.label.toUpperCase()}
          </text>
          {i < STAGES.length - 1 && (
            <line
              x1={x + w}
              y1="40"
              x2={x + w + 30}
              y2="40"
              stroke={MUTE}
              strokeDasharray="4 4"
            />
          )}
        </g>
      );
    })}
  </svg>
);
