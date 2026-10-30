/**
 * How a claim on the site is known. Every number shown to visitors carries one.
 * - primary: read on the organisation's own page (with an access date)
 * - third-party: an outside estimate reported by press
 * - reported: stated by Meet from his own work; not independently verified here
 * - model: an estimate from a model or calculation
 * - synthetic: output of an analysis run on synthetic data
 * - hypothesis: a belief to be tested
 * - proposed: designed but not yet run
 */
export type EvidenceKind =
  | "primary"
  | "third-party"
  | "reported"
  | "model"
  | "synthetic"
  | "hypothesis"
  | "proposed";

export interface Evidence {
  value: string;
  label: string;
  kind: EvidenceKind;
}

export interface CaseSummary {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  /** One-line hook used on listing pages. */
  hook: string;
  problem: string;
  role: string;
  approach: string;
  deliverable: string;
  evidence: Evidence[];
  learned: string;
  accent: "lime" | "copper" | "ivory";
  period: string;
  tags: string[];
}

export interface Capability {
  id: "strategy" | "gtm" | "automation" | "execution";
  index: string;
  title: string;
  line: string;
  body: string;
  verbs: string[];
}

export interface MethodStep {
  id: string;
  title: string;
  question: string;
  body: string;
  example: string;
}
