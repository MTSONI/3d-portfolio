"use client";

import { useState, type FC, type ReactNode } from "react";
import { WORKBENCH } from "@/constants/work-constants";

/*
 * Simulated walkthrough. Every name, document and value below is synthetic.
 * No model runs in the browser and nothing is sent anywhere.
 */

const MATTER = {
  id: "LW-0427",
  type: "Commercial lease renewal",
  client: "Asha Textiles Pvt Ltd",
  counterparty: "Meridian Estates LLP",
};

const EXTRACTED = [
  { field: "Premises", value: "Unit 4B, Plot 18, Andheri East", source: "Lease 2021 · p.2 §1.1", ok: true },
  { field: "Current monthly rent", value: "₹2,40,000", source: "Lease 2021 · p.5 §4.1", ok: true },
  { field: "Renewal term", value: "36 months", source: "Term sheet · p.1", ok: true },
  { field: "Rent escalation", value: "5% p.a. (term sheet) vs 6% p.a. (email)", source: "Term sheet · p.1 / Email 12 Oct", ok: false },
  { field: "Lock-in", value: "12 months", source: "Term sheet · p.2", ok: true },
];

const CLAUSES = [
  { name: "Renewal & term", status: "Approved precedent", by: "Firm library v3" },
  { name: "Rent & escalation", status: "Approved precedent", by: "Firm library v3" },
  { name: "Lock-in & exit", status: "Approved precedent", by: "Firm library v3" },
  { name: "Maintenance charges", status: "Variant — needs partner OK", by: "Matter-specific" },
];

const Panel: FC<{ title: string; note: string; children: ReactNode }> = ({ title, note, children }) => (
  <div>
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
      <h3 className="text-xl text-ivory">{title}</h3>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">{note}</span>
    </div>
    <div className="mt-6">{children}</div>
  </div>
);

const Row: FC<{ children: ReactNode; flag?: boolean }> = ({ children, flag }) => (
  <li className={`grid gap-2 border-b border-rule py-3 text-sm sm:grid-cols-3 ${flag ? "text-copper" : "text-ivory-dim"}`}>
    {children}
  </li>
);

export const WorkbenchDemo: FC = () => {
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);
  const last = WORKBENCH.stages.length - 1;

  const views: ReactNode[] = [
    <Panel key="t" title="Firm templates" note="Deterministic">
      <ul>
        {["Lease renewal agreement — firm template v3", "Leave & licence — firm template v2", "Notice of renewal — firm template v1"].map((t, i) => (
          <Row key={t}>
            <span className="sm:col-span-2 text-ivory">{t}</span>
            <span>{i === 0 ? "Selected" : "Available"}</span>
          </Row>
        ))}
      </ul>
      <p className="mt-4 text-sm text-mute">Formatting, numbering and defined terms come from the firm&apos;s own template — never from the model.</p>
    </Panel>,
    <Panel key="m" title={`Matter ${MATTER.id}`} note="Chosen by the lawyer">
      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        {[
          ["Type", MATTER.type],
          ["Client", MATTER.client],
          ["Counterparty", MATTER.counterparty],
          ["Template", "Lease renewal agreement v3"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">{k}</dt>
            <dd className="mt-1 text-ivory">{v}</dd>
          </div>
        ))}
      </dl>
    </Panel>,
    <Panel key="s" title="Source documents" note="Uploaded locally">
      <ul>
        {[
          ["Original lease (2021)", "14 pages"],
          ["Renewal term sheet", "2 pages"],
          ["Client instructions email, 12 Oct", "1 page"],
        ].map(([d, p]) => (
          <Row key={d}>
            <span className="sm:col-span-2 text-ivory">{d}</span>
            <span>{p} · stays on this machine</span>
          </Row>
        ))}
      </ul>
    </Panel>,
    <Panel key="e" title="Local AI extraction" note="Local model · every value cites its source">
      <ul>
        {EXTRACTED.map((row) => (
          <Row key={row.field} flag={!row.ok}>
            <span className="text-ivory">{row.field}</span>
            <span>{row.value}</span>
            <span className="font-mono text-xs">{row.ok ? "✓ " : "⚠ "}{row.source}</span>
          </Row>
        ))}
      </ul>
      <p className="mt-4 text-sm text-mute">Conflicts are surfaced, not resolved. The model never picks between two sources.</p>
    </Panel>,
    <Panel key="c" title="Approved clauses & precedents" note="Deterministic library">
      <ul>
        {CLAUSES.map((clause) => (
          <Row key={clause.name} flag={clause.status.startsWith("Variant")}>
            <span className="text-ivory">{clause.name}</span>
            <span>{clause.status}</span>
            <span>{clause.by}</span>
          </Row>
        ))}
      </ul>
    </Panel>,
    <Panel key="d" title="Structured draft" note="Template + extracted values + approved clauses">
      <div className="rounded-sm border border-rule bg-ink p-5 font-serif text-[15px] leading-relaxed text-ivory-dim">
        <p className="text-ivory">4. RENT</p>
        <p className="mt-2">
          4.1 The Licensee shall pay a monthly rent of <mark className="bg-lime/15 text-lime">₹2,40,000</mark>
          <sup className="ml-1 font-mono text-[10px] text-mute">[Lease p.5]</sup>, escalating at{" "}
          <mark className="bg-copper/20 text-copper">[5% / 6% — unresolved]</mark>
          <sup className="ml-1 font-mono text-[10px] text-mute">[Term sheet p.1 · Email]</sup> per annum for a term of{" "}
          <mark className="bg-lime/15 text-lime">36 months</mark>
          <sup className="ml-1 font-mono text-[10px] text-mute">[Term sheet p.1]</sup>.
        </p>
      </div>
      <p className="mt-4 text-sm text-mute">Every inserted value is highlighted and linked to its source. Unresolved values stay visibly unresolved.</p>
    </Panel>,
    <Panel key="v" title="Verification" note="Rule-based checks">
      <ul>
        {[
          ["Every inserted value has a source", true],
          ["Defined terms consistent with template", true],
          ["Dates and term arithmetic valid", true],
          ["Rent escalation conflict resolved", false],
        ].map(([check, ok]) => (
          <Row key={String(check)} flag={!ok}>
            <span className="sm:col-span-2 text-ivory">{check}</span>
            <span>{ok ? "✓ Pass" : "⚠ Needs lawyer decision"}</span>
          </Row>
        ))}
      </ul>
    </Panel>,
    <Panel key="a" title="Lawyer approval" note="Human decision">
      <p className="text-sm leading-relaxed text-ivory-dim">
        The reviewing lawyer resolves the escalation conflict, reads the draft and approves it. Approval only marks the
        draft as reviewed — the workbench never files, sends or signs anything.
      </p>
      <button
        type="button"
        onClick={() => setApproved((value) => !value)}
        aria-pressed={approved}
        className={`mt-6 ${approved ? "btn-line" : "btn-lime"}`}
      >
        {approved ? "Undo approval (simulated)" : "Approve as reviewing lawyer (simulated)"}
      </button>
      <p role="status" className="mt-4 font-mono text-xs text-mute">
        {approved
          ? `Audit log: ${MATTER.id} draft v1 approved by reviewing lawyer · escalation set to 5% per term sheet.`
          : "Awaiting approval."}
      </p>
    </Panel>,
  ];

  return (
    <div className="rounded-sm border border-rule bg-graphite">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-copper">
          Simulated walkthrough · synthetic matter · no model runs here
        </span>
        <span className="font-mono text-[10px] text-mute">
          Step {step + 1} / {last + 1}
        </span>
      </div>

      <div className="grid md:grid-cols-[230px_1fr]">
        <ol aria-label="Workflow stages" className="flex min-w-0 gap-1 overflow-x-auto border-b border-rule p-3 md:flex-col md:border-b-0 md:border-r">
          {WORKBENCH.stages.map((stage, i) => (
            <li key={stage} className="shrink-0">
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                  i === step ? "bg-ivory/10 text-ivory" : "text-mute hover:text-ivory-dim"
                }`}
              >
                <span className="mr-2 font-mono text-[10px]">0{i + 1}</span>
                {stage}
              </button>
            </li>
          ))}
        </ol>

        <div className="min-h-[420px] min-w-0 p-5 md:p-8" aria-live="polite">
          <div key={step} className="animate-rise">
            {views[step]}
          </div>
          <div className="mt-10 flex justify-between gap-3">
            <button type="button" className="btn-line !px-4 !py-2" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              ← Back
            </button>
            <button type="button" className="btn-line !px-4 !py-2" onClick={() => setStep((s) => Math.min(last, s + 1))} disabled={step === last}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
