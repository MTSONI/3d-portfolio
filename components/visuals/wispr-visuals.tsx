import { type FC } from "react";

const IVORY = "#ece5d2";
const DIM = "#b9b2a1";
const MUTE = "#6a665c";
const LIME = "#c8f04a";
const COPPER = "#e0773c";
const MONO = "ui-monospace, monospace";
const SERIF = "var(--font-instrument-serif), Georgia, serif";

/**
 * Install share vs revenue share, plus the price-adjusted expectation.
 * 14% and ~2%: Sensor Tower via TechCrunch. 4.4%: my model.
 */
export const PuzzleChart: FC = () => {
  const scale = 15;
  const base = 280;
  const bars = [
    { x: 70, v: 14, label: "Share of installs", tag: "THIRD-PARTY", fill: LIME, dashed: false },
    { x: 260, v: 4.4, label: "Expected revenue share", tag: "MODELLED", fill: "none", dashed: true },
    { x: 450, v: 2, label: "Observed IAP revenue share", tag: "THIRD-PARTY", fill: COPPER, dashed: false },
  ];
  return (
    <svg viewBox="0 0 620 340" className="w-full" role="img" aria-label="India is 14 percent of installs. If it paid at India prices like other markets it would be about 4.4 percent of revenue. Observed in-app revenue share is about 2 percent.">
      <line x1="30" y1={base} x2="600" y2={base} stroke={MUTE} />
      {bars.map((bar) => (
        <g key={bar.label}>
          <rect
            x={bar.x}
            y={base - bar.v * scale}
            width="110"
            height={bar.v * scale}
            fill={bar.fill}
            stroke={bar.dashed ? IVORY : "none"}
            strokeDasharray={bar.dashed ? "6 6" : undefined}
          />
          <text x={bar.x + 55} y={base - bar.v * scale - 14} textAnchor="middle" fill={IVORY} fontSize="30" fontFamily={SERIF}>
            {bar.v}%
          </text>
          <text x={bar.x + 55} y={base + 24} textAnchor="middle" fill={DIM} fontSize="12">
            {bar.label}
          </text>
          <text x={bar.x + 55} y={base + 42} textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO} letterSpacing="1.5">
            {bar.tag}
          </text>
        </g>
      ))}
      <path d="M180 120 C 220 110, 230 160, 255 200" fill="none" stroke={MUTE} strokeDasharray="3 4" />
      <text x="196" y="104" fill={MUTE} fontSize="10" fontFamily={MONO}>× INDIA PRICE (~28% OF US)</text>
      <path d="M375 215 C 410 210, 420 240, 447 250" fill="none" stroke={COPPER} strokeDasharray="3 4" />
      <text x="378" y="200" fill={COPPER} fontSize="10" fontFamily={MONO}>~2× GAP LEFT</text>
    </svg>
  );
};

const MAP_POINTS = [
  { x: 120, y: 45, label: "Founders & operators", note: "Where Wispr says it began", tone: MUTE, end: false },
  { x: 100, y: 205, label: "WhatsApp-first small businesses", note: "", tone: IVORY, end: false },
  { x: 250, y: 140, label: "Early-career analysts & consultants", note: "", tone: IVORY, end: false },
  { x: 520, y: 80, label: "College consulting & finance clubs", note: "My starting point", tone: LIME, end: true },
  { x: 545, y: 235, label: "Students at large", note: "", tone: IVORY, end: true },
];

/** Where to look first: writing intensity vs. reachability through a trusted introducer. */
export const OpportunityMap: FC = () => (
  <svg viewBox="0 0 620 340" className="w-full" role="img" aria-label="Opportunity map placing segments by writing intensity and by how reachable they are through a trusted introducer; college consulting and finance clubs are the chosen starting point">
    <rect x="60" y="20" width="540" height="260" fill="none" stroke={MUTE} />
    <line x1="330" y1="20" x2="330" y2="280" stroke={MUTE} strokeDasharray="3 5" />
    <line x1="60" y1="150" x2="600" y2="150" stroke={MUTE} strokeDasharray="3 5" />
    <text x="600" y="304" textAnchor="end" fill={MUTE} fontSize="10" fontFamily={MONO}>REACHABLE VIA A TRUSTED INTRODUCER (FOR ME) →</text>
    <text x="40" y="280" fill={MUTE} fontSize="10" fontFamily={MONO} transform="rotate(-90 40 280)">WRITING INTENSITY →</text>
    {MAP_POINTS.map((point) => {
      const { x } = point;
      const picked = point.tone === LIME;
      const tx = point.end ? x - 14 : x + 14;
      const anchor = point.end ? "end" : "start";
      return (
        <g key={point.label}>
          {picked && <circle cx={x} cy={point.y} r="26" fill={LIME} fillOpacity="0.12" />}
          <circle cx={x} cy={point.y} r={picked ? 8 : 6} fill={picked ? LIME : "none"} stroke={point.tone} strokeWidth="1.5" />
          <text x={tx} y={point.y + 4} textAnchor={anchor} fill={point.tone} fontSize="12">
            {point.label}
          </text>
          {point.note && (
            <text x={tx} y={point.y + 20} textAnchor={anchor} fill={picked ? LIME : MUTE} fontSize="9" fontFamily={MONO}>
              {point.note.toUpperCase()}
            </text>
          )}
        </g>
      );
    })}
  </svg>
);

/** A, B and C are on different axes; the question is one cell across all three. */
export const AxesDiagram: FC = () => {
  const columns = [
    { x: 40, title: "A · FUNNEL STAGE", items: ["Install", "Activate", "Retain", "Pay"], pick: 1 },
    { x: 240, title: "B · SEGMENT", items: ["Professionals", "Students", "Club members", "Families"], pick: 2 },
    { x: 440, title: "C · CHANNEL", items: ["Paid", "Organic", "Trusted introducer", "Referral"], pick: 2 },
  ];
  return (
    <svg viewBox="0 0 620 300" className="w-full" role="img" aria-label="Three axes — funnel stage, segment and channel — with one option chosen on each: activation, club members, trusted introducer">
      {columns.map((column) => (
        <g key={column.title}>
          <text x={column.x} y="30" fill={MUTE} fontSize="10" fontFamily={MONO}>{column.title}</text>
          {column.items.map((item, i) => {
            const picked = i === column.pick;
            const y = 50 + i * 52;
            return (
              <g key={item}>
                <rect x={column.x} y={y} width="150" height="36" rx="18" fill={picked ? LIME : "none"} fillOpacity={picked ? 0.12 : 1} stroke={picked ? LIME : MUTE} />
                <text x={column.x + 75} y={y + 23} textAnchor="middle" fill={picked ? LIME : DIM} fontSize="12">
                  {item}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <path d="M190 172 C 215 172, 215 172, 240 172 M390 172 H440" stroke={LIME} strokeDasharray="4 4" />
      <path d="M115 122 C 115 270, 300 270, 515 230" fill="none" stroke={LIME} strokeOpacity="0.5" strokeDasharray="4 4" />
    </svg>
  );
};

const JOURNEY = [
  { title: "Introduced", risk: "Trust in who recommends it" },
  { title: "Installed", risk: "Desktop vs phone; permissions" },
  { title: "First dictation", risk: "Speaking aloud; accent & Hinglish" },
  { title: "Week-2 habit", risk: "Novelty fades; typing reflex" },
  { title: "Work use", risk: "Editing overhead; privacy at work" },
  { title: "Pay intent", risk: "Free tier is enough" },
];

/** Customer journey with the barrier most likely to stop each step. */
export const JourneyDiagram: FC = () => (
  <ol className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-6">
    {JOURNEY.map((step, i) => (
      <li key={step.title} className="relative bg-ink p-5">
        <span className="font-mono text-[11px] text-lime">0{i + 1}</span>
        <p className="mt-3 text-lg leading-tight text-ivory">{step.title}</p>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-mute">Main barrier</p>
        <p className="mt-1 text-sm leading-snug text-ivory-dim">{step.risk}</p>
        <span aria-hidden className="absolute bottom-0 left-0 h-0.5 bg-lime" style={{ width: `${100 - i * 15}%` }} />
      </li>
    ))}
  </ol>
);

/** Two arms drawn from one community, identical onboarding, a 14-day read. */
export const ExperimentFlow: FC = () => (
  <svg viewBox="0 0 640 300" className="w-full" role="img" aria-label="Experiment flow: one community split into an introducer-led arm and a self-serve arm, both receiving the same onboarding prompts, observed for 14 days, then compared">
    <rect x="10" y="120" width="120" height="60" rx="4" fill="none" stroke={IVORY} />
    <text x="70" y="146" textAnchor="middle" fill={IVORY} fontSize="12">One community</text>
    <text x="70" y="164" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>OPT-IN, CONSENTED</text>

    <path d="M130 150 C 160 150, 160 70, 190 70" fill="none" stroke={LIME} />
    <path d="M130 150 C 160 150, 160 230, 190 230" fill="none" stroke={COPPER} />

    <rect x="190" y="40" width="160" height="60" rx="4" fill="none" stroke={LIME} />
    <text x="270" y="66" textAnchor="middle" fill={LIME} fontSize="12">Arm 1 · Introduced</text>
    <text x="270" y="84" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>LEAD-RUN 15-MIN SESSION</text>

    <rect x="190" y="200" width="160" height="60" rx="4" fill="none" stroke={COPPER} />
    <text x="270" y="226" textAnchor="middle" fill={COPPER} fontSize="12">Arm 2 · Self-serve</text>
    <text x="270" y="244" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>SAME LINK, GROUP POST</text>

    <path d="M350 70 C 380 70, 380 150, 410 150 M350 230 C 380 230, 380 150, 410 150" fill="none" stroke={MUTE} />
    <rect x="410" y="120" width="110" height="60" rx="4" fill="none" stroke={IVORY} />
    <text x="465" y="146" textAnchor="middle" fill={IVORY} fontSize="12">3 starter tasks</text>
    <text x="465" y="164" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>IDENTICAL</text>

    <path d="M520 150 H550" stroke={MUTE} />
    <rect x="550" y="120" width="80" height="60" rx="4" fill="none" stroke={IVORY} strokeDasharray="4 4" />
    <text x="590" y="146" textAnchor="middle" fill={IVORY} fontSize="12">Day 14</text>
    <text x="590" y="164" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>READ-OUT</text>
  </svg>
);
