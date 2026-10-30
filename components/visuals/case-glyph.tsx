import { type FC } from "react";

const IVORY = "#ece5d2";
const MUTE = "#5d5a52";
const LIME = "#c8f04a";
const COPPER = "#e0773c";
const MONO = "ui-monospace, monospace";

/** India: share of installs vs share of in-app revenue (third-party estimate). */
const WisprGlyph: FC = () => (
  <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Bar comparison: India is about 14 percent of installs but about 2 percent of in-app revenue">
    <text x="20" y="28" fill={MUTE} fontSize="11" fontFamily={MONO}>INDIA SHARE · OCT 2025–APR 2026</text>
    <rect x="40" y={220 - 14 * 11} width="90" height={14 * 11} fill={LIME} />
    <text x="85" y={208 - 14 * 11} textAnchor="middle" fill={IVORY} fontSize="22" fontFamily="serif">14%</text>
    <text x="85" y="244" textAnchor="middle" fill={MUTE} fontSize="10" fontFamily={MONO}>INSTALLS</text>
    <rect x="170" y={220 - 2 * 11} width="90" height={2 * 11} fill={COPPER} />
    <text x="215" y={208 - 2 * 11} textAnchor="middle" fill={IVORY} fontSize="22" fontFamily="serif">2%</text>
    <text x="215" y="244" textAnchor="middle" fill={MUTE} fontSize="10" fontFamily={MONO}>IAP REVENUE</text>
    <rect x="300" y={220 - 4.4 * 11} width="70" height={4.4 * 11} fill="none" stroke={IVORY} strokeDasharray="4 4" />
    <text x="335" y={208 - 4.4 * 11} textAnchor="middle" fill={IVORY} fontSize="16" fontFamily="serif">4.4%</text>
    <text x="335" y="244" textAnchor="middle" fill={MUTE} fontSize="10" fontFamily={MONO}>PRICE-ADJ.</text>
    <line x1="20" y1="220" x2="385" y2="220" stroke={MUTE} />
  </svg>
);

/** SHK: tiered pricing ladder with a founding-partner entry step. */
const ShkGlyph: FC = () => (
  <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Pricing ladder from founding-partner pilot to consumer and enterprise tiers">
    {[
      { y: 190, w: 90, label: "PILOT", c: LIME },
      { y: 145, w: 150, label: "CONSUMER", c: COPPER },
      { y: 100, w: 220, label: "PRO", c: COPPER },
      { y: 55, w: 300, label: "ENTERPRISE", c: IVORY },
    ].map((step) => (
      <g key={step.label}>
        <rect x="40" y={step.y} width={step.w} height="32" fill="none" stroke={step.c} />
        <text x="52" y={step.y + 21} fill={step.c} fontSize="11" fontFamily={MONO}>
          {step.label}
        </text>
      </g>
    ))}
    <path d="M350 200 L350 60" stroke={MUTE} markerEnd="url(#up)" />
    <defs>
      <marker id="up" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10z" fill={MUTE} />
      </marker>
    </defs>
    <text x="362" y="140" fill={MUTE} fontSize="10" fontFamily={MONO} transform="rotate(90 362 140)">COMMITMENT</text>
  </svg>
);

/** AI automation: agents feeding a single approval gate. */
const AutomationGlyph: FC = () => (
  <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Several agents feeding one human approval gate before action">
    {["WHATSAPP", "PROSPECT", "CHIEF OF STAFF", "N8N"].map((label, i) => {
      const y = 45 + i * 55;
      return (
        <g key={label}>
          <rect x="20" y={y - 14} width="130" height="28" rx="14" fill="none" stroke={IVORY} strokeOpacity="0.6" />
          <text x="85" y={y + 4} textAnchor="middle" fill={IVORY} fontSize="10" fontFamily={MONO}>{label}</text>
          <path d={`M150 ${y} C 200 ${y}, 200 130, 240 130`} fill="none" stroke={LIME} strokeOpacity="0.7" strokeDasharray="5 6" className="animate-dash" />
        </g>
      );
    })}
    <rect x="240" y="108" width="44" height="44" rx="4" fill="#0c0c0d" stroke={LIME} strokeWidth="2" />
    <text x="262" y="134" textAnchor="middle" fill={LIME} fontSize="10" fontFamily={MONO}>✓</text>
    <text x="262" y="175" textAnchor="middle" fill={LIME} fontSize="9" fontFamily={MONO}>HUMAN</text>
    <line x1="284" y1="130" x2="370" y2="130" stroke={IVORY} />
    <circle cx="376" cy="130" r="6" fill={IVORY} />
  </svg>
);

/** Bluestock: source files to database to KPI engine to API. */
const BluestockGlyph: FC = () => (
  <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Source files flowing into a database, KPI engine and API">
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x="20" y={40 + i * 30} width="40" height="20" fill="none" stroke={MUTE} />
    ))}
    <text x="40" y="232" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>12 FILES</text>
    <path d="M60 130 H110" stroke={IVORY} />
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={115 + (i % 2) * 34} y={55 + Math.floor(i / 2) * 32} width="28" height="22" fill="none" stroke={IVORY} strokeOpacity="0.7" />
      ))}
      <text x="146" y="232" textAnchor="middle" fill={MUTE} fontSize="9" fontFamily={MONO}>10 TABLES</text>
    </g>
    <path d="M185 130 H225" stroke={IVORY} />
    <circle cx="260" cy="130" r="34" fill="none" stroke={COPPER} />
    <text x="260" y="134" textAnchor="middle" fill={COPPER} fontSize="10" fontFamily={MONO}>KPI</text>
    <path d="M294 130 H330" stroke={IVORY} />
    <rect x="330" y="105" width="52" height="50" fill="none" stroke={LIME} />
    <text x="356" y="134" textAnchor="middle" fill={LIME} fontSize="10" fontFamily={MONO}>API</text>
  </svg>
);

/** Quick commerce: AOV and delivery cost, Tier-1 vs Tier-2 (reported benchmarks). */
const QuickCommerceGlyph: FC = () => (
  <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="AOV of 550 rupees in Tier-1 against 200 in Tier-2; delivery cost 60 against 40">
    {[
      { x: 50, aov: 550, cost: 60, label: "TIER-1" },
      { x: 230, aov: 200, cost: 40, label: "TIER-2" },
    ].map((tier) => (
      <g key={tier.label}>
        <rect x={tier.x} y={210 - tier.aov * 0.3} width="56" height={tier.aov * 0.3} fill={IVORY} fillOpacity="0.9" />
        <rect x={tier.x + 64} y={210 - tier.cost * 0.3} width="56" height={tier.cost * 0.3} fill={COPPER} />
        <text x={tier.x + 28} y={200 - tier.aov * 0.3} textAnchor="middle" fill={IVORY} fontSize="14" fontFamily="serif">₹{tier.aov}</text>
        <text x={tier.x + 92} y={200 - tier.cost * 0.3} textAnchor="middle" fill={COPPER} fontSize="14" fontFamily="serif">₹{tier.cost}</text>
        <text x={tier.x + 60} y="236" textAnchor="middle" fill={MUTE} fontSize="10" fontFamily={MONO}>{tier.label}</text>
      </g>
    ))}
    <line x1="30" y1="210" x2="390" y2="210" stroke={MUTE} />
    <text x="30" y="26" fill={MUTE} fontSize="10" fontFamily={MONO}>AOV ■ · DELIVERY COST ■ (REPORTED)</text>
  </svg>
);

/** Myntra-style: return cost concentrates in a small customer segment. */
const MyntraGlyph: FC = () => (
  <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Concentration curve: a small share of customers drives most return cost">
    <line x1="40" y1="215" x2="370" y2="215" stroke={MUTE} />
    <line x1="40" y1="25" x2="40" y2="215" stroke={MUTE} />
    <line x1="40" y1="215" x2="370" y2="25" stroke={MUTE} strokeDasharray="3 5" />
    <path d="M40 215 C 70 80, 120 45, 370 25" fill="none" stroke={COPPER} strokeWidth="2" />
    <rect x="40" y="25" width="70" height="190" fill={COPPER} fillOpacity="0.1" />
    <text x="75" y="240" textAnchor="middle" fill={COPPER} fontSize="9" fontFamily={MONO}>SERIAL</text>
    <text x="370" y="240" textAnchor="end" fill={MUTE} fontSize="9" fontFamily={MONO}>CUSTOMERS →</text>
    <text x="48" y="20" fill={MUTE} fontSize="9" fontFamily={MONO}>SHARE OF RETURN COST · ILLUSTRATIVE SHAPE</text>
  </svg>
);

const GLYPHS: Record<string, FC> = {
  "wispr-flow-india-growth": WisprGlyph,
  "shk-global-ventures": ShkGlyph,
  "ai-automation": AutomationGlyph,
  "bluestock-financial-intelligence": BluestockGlyph,
  "quick-commerce-unit-economics": QuickCommerceGlyph,
  "myntra-profitability-analysis": MyntraGlyph,
};

export const CaseGlyph: FC<{ slug: string }> = ({ slug }) => {
  const Glyph = GLYPHS[slug];
  return Glyph ? <Glyph /> : null;
};
