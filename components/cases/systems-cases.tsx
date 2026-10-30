import { type FC } from "react";
import {
  CaseHeader,
  CaseSection,
  Fact,
  FactGrid,
  Figure,
  NextCase,
  PointList,
  Prose,
} from "./case-kit";

/* ───────────────────────── AI automation ───────────────────────── */

const STAGES = ["Input", "Processing", "Decision", "Human approval", "Action", "Measurement"] as const;

const SYSTEMS: { name: string; cells: string[] }[] = [
  {
    name: "WhatsApp AI sales agent",
    cells: ["Inbound WhatsApp enquiry", "Intent + qualification questions", "Route: answer, qualify or escalate", "Sales lead reviews hand-offs", "Reply, book follow-up, log lead", "Response time, qualified leads"],
  },
  {
    name: "Prospecting & GTM research agent",
    cells: ["Target list + ICP", "Company research & enrichment", "Fit score and angle", "Analyst approves shortlist", "Personalised outreach drafts", "Research time, qualified-lead capacity"],
  },
  {
    name: "AI Chief of Staff",
    cells: ["Local business data (CSV)", "Deterministic recipes: aging, cash at risk", "Rule-based attention alerts", "Founder approval queue", "Task, note or export", "Reporting effort, decision cycle"],
  },
  {
    name: "n8n workflow automations",
    cells: ["Forms, sheets, CRM events", "Clean, transform, summarise", "Branch on rules", "Owner sign-off on exceptions", "Update systems, notify", "Hours saved, error rate"],
  },
];

const PipelineDiagram: FC = () => (
  <div className="overflow-x-auto">
    <div className="min-w-[860px]">
      <div className="grid grid-cols-[180px_repeat(6,1fr)] gap-px border-b border-rule pb-3">
        <span />
        {STAGES.map((stage, i) => (
          <span
            key={stage}
            className={`px-3 font-mono text-[10px] uppercase tracking-[0.18em] ${stage === "Human approval" ? "text-lime" : "text-mute"}`}
          >
            0{i + 1} {stage}
          </span>
        ))}
      </div>
      {SYSTEMS.map((system) => (
        <div key={system.name} className="grid grid-cols-[180px_repeat(6,1fr)] gap-px border-b border-rule">
          <span className="py-4 pr-3 text-sm text-ivory">{system.name}</span>
          {system.cells.map((cell, i) => (
            <span
              key={cell}
              className={`relative px-3 py-4 text-[13px] leading-snug ${
                i === 3 ? "bg-lime/[0.07] text-lime" : "text-ivory-dim"
              }`}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const AutomationCase: FC = () => (
  <>
    <CaseHeader
      index="03"
      kicker="AI automation systems"
      title={
        <>
          Agents that draft, <em className="text-lime">people who decide.</em>
        </>
      }
      question="Which parts of sales, research and reporting can be automated safely — and where must a person stay in the loop?"
      meta={[
        ["Role", "Designer and builder"],
        ["Context", "Built within my Founder's Office work"],
        ["Tools", "n8n, LLM APIs, WhatsApp, Electron, TypeScript"],
        ["Status", "Built 2026 · Chief of Staff is a prototype"],
      ]}
      notice="Impact figures are my own reported estimates, not independently audited measurements."
    />

    <CaseSection number="01" title="The workflow pattern" aside="Every system follows the same six stages.">
      <Prose>
        <p>
          I map each workflow as <strong>input → processing → decision → human approval → action → measurement</strong>{" "}
          before automating anything. The model does the reading, sorting and drafting. A person approves anything that
          reaches a customer, moves money or changes a record. Calculations stay in deterministic code, never in a
          prompt.
        </p>
      </Prose>
      <Figure className="mt-10" caption="Architecture across the four systems. Approval (highlighted) is a designed step in every flow, not an afterthought.">
        <PipelineDiagram />
      </Figure>
    </CaseSection>

    <CaseSection number="02" title="The systems" tone="graphite">
      <PointList
        items={[
          { title: "WhatsApp AI sales agent", body: "Answers and qualifies inbound enquiries 24/7, escalating to a person when intent is high or the question is sensitive." },
          { title: "Prospecting & GTM research agent", body: "Researches target companies, scores fit and drafts outreach angles for an analyst to approve." },
          { title: "AI Chief of Staff", body: "A local-first desktop prototype: business data stays on the machine in an encrypted vault, a deterministic engine computes the numbers, and every action waits in an approval queue." },
          { title: "n8n workflow automation", body: "Glue between forms, sheets, CRM and messaging that removes copy-paste and status-chasing." },
        ]}
      />
    </CaseSection>

    <CaseSection number="03" title="Reported impact" aside="As reported; not independently audited.">
      <FactGrid cols={3}>
        <Fact value="120+ hrs" label="Manual hours saved per month" kind="reported" />
        <Fact value="~2.5×" label="Throughput across qualification, research, follow-ups and reporting" kind="reported" />
        <Fact value="~90%" label="Faster lead response (WhatsApp agent)" kind="reported" />
        <Fact value="~70%" label="Less GTM research time (prospecting agent)" kind="reported" />
        <Fact value="~60%" label="Less reporting effort (AI Chief of Staff)" kind="reported" />
        <Fact value="₹8–10L" label="Estimated annualised value of the redesign" kind="model" />
      </FactGrid>
    </CaseSection>

    <CaseSection number="04" title="What didn't work, and what I learned" tone="graphite">
      <Prose>
        <p>
          The AI Chief of Staff is still a prototype. Some integrations, such as calendar and live voice, are paused.
          An automated schema-mapping benchmark scored only 16.7% (reported) — which is exactly why mapping a new
          spreadsheet stays a human-confirmed step.
        </p>
        <p>
          <strong>Lesson:</strong> the value is in the approval design, not the model. Agents that draft and a person who
          decides outperform agents that act alone, because people trust and keep using them.
        </p>
      </Prose>
    </CaseSection>

    <NextCase slug="ai-automation" />
  </>
);

/* ───────────────────────── Bluestock ───────────────────────── */

const LAYERS = [
  { name: "Sources", detail: "12 source files consolidated into one model" },
  { name: "ETL & quality", detail: "16 data-quality rules · 35+ ETL tests" },
  { name: "Database", detail: "10-table relational model · 92 companies" },
  { name: "KPI engine", detail: "50+ KPIs · 1,100+ company-year observations" },
  { name: "Analytics", detail: "6 screeners · 15 metrics · sector-relative 0–100 scores · 11 peer groups · 5 archetype clusters" },
  { name: "Delivery", detail: "16 FastAPI endpoints · 8-screen dashboard · 92 tearsheets · 11 sector reports" },
];

const ArchitectureStack: FC = () => (
  <ol className="space-y-px overflow-hidden rounded-sm border border-rule bg-rule">
    {LAYERS.map((layer, i) => (
      <li key={layer.name} className="grid gap-2 bg-ink p-5 sm:grid-cols-[48px_180px_1fr] sm:items-baseline">
        <span className="font-mono text-xs text-mute">L{i + 1}</span>
        <span className={`text-lg ${i === 3 ? "text-copper" : i === 5 ? "text-lime" : "text-ivory"}`}>{layer.name}</span>
        <span className="text-sm leading-relaxed text-ivory-dim">{layer.detail}</span>
      </li>
    ))}
  </ol>
);

export const BluestockCase: FC = () => (
  <>
    <CaseHeader
      index="04"
      kicker="Data Analyst Intern · Bluestock"
      title={
        <>
          A financial intelligence platform, <em className="text-ivory-dim">built to be trusted.</em>
        </>
      }
      question="How do you turn scattered company financials into screens and comparisons an analyst can rely on?"
      meta={[
        ["Role", "Data Analyst Intern"],
        ["Period", "May – July 2026"],
        ["Stack", "SQL, Python, FastAPI, dashboarding"],
        ["Coverage", "92 listed companies"],
      ]}
      notice="Figures are as reported from the internship project. The code and data belong to Bluestock and are not public."
    />

    <CaseSection number="01" title="The problem" aside="Analysis that couldn't be repeated.">
      <Prose>
        <p>
          Fundamental, valuation and investment analysis across dozens of companies lived in separate files. Each
          comparison was rebuilt by hand, definitions drifted between analysts, and nobody could say how fresh or clean
          a number was.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="02" title="Architecture" tone="graphite" aside="Six layers, each with a test or a rule.">
      <ArchitectureStack />
    </CaseSection>

    <CaseSection number="03" title="The analytical value" aside="What an analyst can now do in minutes.">
      <FactGrid cols={3}>
        <Fact value="92" label="Companies across fundamental, valuation and investment analytics" kind="reported" />
        <Fact value="1,100+" label="Company-year observations from the KPI engine" kind="reported" />
        <Fact value="60+" label="Automated tests and 20 acceptance gates" kind="reported" />
      </FactGrid>
      <div className="mt-12">
        <PointList
          items={[
            { title: "Screen", body: "Six preset screeners find quality, value, growth and turnaround candidates with sector-relative 0–100 composite scores." },
            { title: "Compare", body: "Eleven peer groups benchmarked on ten metrics; 92 companies clustered into five investment archetypes." },
            { title: "Explain", body: "Automated tearsheets and sector reports combine valuation, cash-flow signals and plain-language pros and cons." },
            { title: "Trust", body: "Quality rules at ingestion and acceptance gates at release mean a broken input stops the pipeline instead of reaching a report." },
          ]}
        />
      </div>
    </CaseSection>

    <CaseSection number="04" title="What I learned" tone="graphite">
      <p className="display max-w-3xl text-3xl leading-tight md:text-4xl">
        Analytics products earn trust through boring things — data-quality rules, tests and acceptance gates — long
        before anyone sees a dashboard.
      </p>
    </CaseSection>

    <NextCase slug="bluestock-financial-intelligence" />
  </>
);
