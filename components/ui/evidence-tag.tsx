import { type FC } from "react";
import { type EvidenceKind } from "@/types/site-types";

const LABELS: Record<EvidenceKind, string> = {
  primary: "Primary source",
  "third-party": "Third-party estimate",
  reported: "Reported",
  model: "Modelled",
  synthetic: "Synthetic data",
  hypothesis: "Hypothesis",
  proposed: "Proposed · not run",
};

const DOTS: Record<EvidenceKind, string> = {
  primary: "bg-lime",
  "third-party": "bg-ivory",
  reported: "bg-ivory-dim",
  model: "bg-copper",
  synthetic: "bg-copper",
  hypothesis: "border border-lime bg-transparent",
  proposed: "border border-copper bg-transparent",
};

/** Small, text-first label stating how a claim is known. Never colour-only. */
export const EvidenceTag: FC<{ kind: EvidenceKind; className?: string }> = ({
  kind,
  className = "",
}) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-mute ${className}`}
  >
    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${DOTS[kind]}`} />
    {LABELS[kind]}
  </span>
);

export const EVIDENCE_LEGEND: { kind: EvidenceKind; meaning: string }[] = [
  { kind: "primary", meaning: "Read on the organisation's own page" },
  { kind: "third-party", meaning: "Outside estimate reported by press" },
  { kind: "reported", meaning: "From my own work records; not independently audited" },
  { kind: "model", meaning: "Output of a model or calculation" },
  { kind: "synthetic", meaning: "Result on a synthetic dataset" },
  { kind: "hypothesis", meaning: "A belief to be tested" },
  { kind: "proposed", meaning: "Designed, not yet run" },
];
