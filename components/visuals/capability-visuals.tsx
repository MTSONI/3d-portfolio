import { type FC } from "react";
import { type Capability } from "@/types/site-types";

const IVORY = "#ece5d2";
const MUTE = "#5d5a52";
const LIME = "#c8f04a";
const COPPER = "#e0773c";

/** Strategy: an impact × confidence matrix with one bet chosen. */
const StrategyVisual: FC = () => (
  <svg viewBox="0 0 320 220" className="h-full w-full" role="img" aria-label="Impact versus confidence matrix with one option selected">
    <line x1="40" y1="190" x2="300" y2="190" stroke={MUTE} />
    <line x1="40" y1="20" x2="40" y2="190" stroke={MUTE} />
    <line x1="170" y1="20" x2="170" y2="190" stroke={MUTE} strokeDasharray="3 5" />
    <line x1="40" y1="105" x2="300" y2="105" stroke={MUTE} strokeDasharray="3 5" />
    <text x="300" y="208" textAnchor="end" fill={MUTE} fontSize="10" fontFamily="monospace">CONFIDENCE →</text>
    <text x="34" y="18" textAnchor="end" fill={MUTE} fontSize="10" fontFamily="monospace" transform="rotate(-90 34 18)">IMPACT →</text>
    {[
      [80, 160, 5],
      [120, 135, 7],
      [205, 150, 6],
      [95, 70, 8],
      [250, 125, 5],
      [140, 60, 6],
    ].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={IVORY} strokeOpacity="0.55" />
    ))}
    <circle cx="238" cy="55" r="22" fill={LIME} fillOpacity="0.12" />
    <circle cx="238" cy="55" r="9" fill={LIME} />
    <text x="238" y="94" textAnchor="middle" fill={LIME} fontSize="10" fontFamily="monospace">FIRST BET</text>
  </svg>
);

/** GTM: segments and channels converging into one activation path. */
const GtmVisual: FC = () => (
  <svg viewBox="0 0 320 220" className="h-full w-full" role="img" aria-label="Segments flowing through channels into a single activation path">
    {[30, 75, 120, 165].map((y, i) => (
      <g key={y}>
        <circle cx="30" cy={y + 10} r="5" fill={i === 1 ? COPPER : "none"} stroke={COPPER} />
        <path
          d={`M35 ${y + 10} C 130 ${y + 10}, 150 110, 230 110`}
          fill="none"
          stroke={COPPER}
          strokeOpacity={i === 1 ? 1 : 0.35}
          strokeWidth={i === 1 ? 2 : 1}
          strokeDasharray={i === 1 ? "6 6" : undefined}
          className={i === 1 ? "animate-dash" : undefined}
        />
      </g>
    ))}
    <rect x="230" y="92" width="70" height="36" rx="18" fill="none" stroke={IVORY} />
    <text x="265" y="114" textAnchor="middle" fill={IVORY} fontSize="10" fontFamily="monospace">ACTIVE</text>
    <text x="30" y="210" fill={MUTE} fontSize="10" fontFamily="monospace">SEGMENT × CHANNEL</text>
  </svg>
);

/** AI Automation: a pipeline with a human approval gate before action. */
const AutomationVisual: FC = () => {
  const nodes = ["IN", "PROCESS", "DECIDE", "HUMAN", "ACT", "MEASURE"];
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" role="img" aria-label="Automation pipeline with a human approval gate">
      <line x1="25" y1="110" x2="295" y2="110" stroke={MUTE} />
      <line x1="25" y1="110" x2="295" y2="110" stroke={LIME} strokeWidth="2" strokeDasharray="6 18" className="animate-dash" />
      {nodes.map((label, i) => {
        const x = 25 + i * 54;
        const gate = label === "HUMAN";
        return (
          <g key={label}>
            {gate ? (
              <rect x={x - 13} y="97" width="26" height="26" rx="3" fill="#0c0c0d" stroke={LIME} strokeWidth="2" />
            ) : (
              <circle cx={x} cy="110" r="7" fill="#0c0c0d" stroke={IVORY} />
            )}
            <text
              x={x}
              y={i % 2 ? 150 : 80}
              textAnchor="middle"
              fill={gate ? LIME : MUTE}
              fontSize="9"
              fontFamily="monospace"
            >
              {label}
            </text>
          </g>
        );
      })}
      <path d="M187 132 C 187 190, 295 190, 295 132" fill="none" stroke={MUTE} strokeDasharray="2 4" />
      <text x="241" y="205" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily="monospace">FEEDBACK</text>
    </svg>
  );
};

/** Execution: shipped iterations stepping up, each measured against a baseline. */
const ExecutionVisual: FC = () => (
  <svg viewBox="0 0 320 220" className="h-full w-full" role="img" aria-label="Iterations stepping up against a baseline">
    <line x1="30" y1="160" x2="300" y2="160" stroke={MUTE} strokeDasharray="3 5" />
    <text x="300" y="176" textAnchor="end" fill={MUTE} fontSize="9" fontFamily="monospace">BASELINE</text>
    {[0, 1, 2, 3, 4].map((i) => {
      const x = 40 + i * 55;
      const h = 22 + i * 22;
      return (
        <g key={i}>
          <rect x={x} y={160 - h} width="30" height={h} fill={i === 4 ? IVORY : "none"} stroke={IVORY} strokeOpacity={i === 4 ? 1 : 0.5} />
          <text x={x + 15} y="196" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily="monospace">
            v{i + 1}
          </text>
        </g>
      );
    })}
    <path d="M55 132 L110 112 L165 88 L220 70 L275 46" fill="none" stroke={LIME} strokeWidth="1.5" />
  </svg>
);

const VISUALS: Record<Capability["id"], FC> = {
  strategy: StrategyVisual,
  gtm: GtmVisual,
  automation: AutomationVisual,
  execution: ExecutionVisual,
};

export const CapabilityVisual: FC<{ id: Capability["id"] }> = ({ id }) => {
  const Visual = VISUALS[id];
  return <Visual />;
};
