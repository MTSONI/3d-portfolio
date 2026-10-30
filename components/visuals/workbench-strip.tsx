import { type FC } from "react";
import { WORKBENCH } from "@/constants/work-constants";

/** Which part of the system owns each Workbench stage. */
const OWNER: Record<string, "rule" | "ai" | "human"> = {
  "Firm templates": "rule",
  Matter: "human",
  Sources: "human",
  "Local extraction": "ai",
  "Approved clauses": "rule",
  "Structured draft": "ai",
  Verification: "rule",
  "Lawyer approval": "human",
};

const STYLE = {
  rule: { dot: "border-ivory bg-ivory", text: "Deterministic" },
  ai: { dot: "border-copper bg-copper", text: "Local AI" },
  human: { dot: "border-lime bg-transparent", text: "Human" },
} as const;

export const WorkbenchStrip: FC = () => (
  <figure>
    <ol className="relative border-l border-rule pl-8">
      {WORKBENCH.stages.map((stage, i) => {
        const owner = STYLE[OWNER[stage]];
        return (
          <li key={stage} className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
            <span
              aria-hidden
              className={`absolute -left-[37px] top-[22px] h-2.5 w-2.5 rounded-full border-2 ${owner.dot}`}
            />
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] text-mute">0{i + 1}</span>
              <span className="text-lg text-ivory">{stage}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">{owner.text}</span>
          </li>
        );
      })}
    </ol>
    <figcaption className="mt-6 text-xs text-mute">
      Formatting and verification are rules; extraction and drafting are local AI; a person chooses inputs and
      approves output.
    </figcaption>
  </figure>
);
