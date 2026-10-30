import { type FC } from "react";
import { WorkbenchStrip } from "@/components/visuals/workbench-strip";
import { WORKBENCH } from "@/constants/work-constants";
import { CaseHeader, CaseSection, Figure, NextCase, PointList, Prose } from "./case-kit";
import { WorkbenchDemo } from "./workbench-demo";

export const WorkbenchCase: FC = () => (
  <>
    <CaseHeader
      index="07"
      kicker={WORKBENCH.kicker}
      title={
        <>
          Private Legal Document Workbench: <em className="text-copper">{WORKBENCH.line}</em>
        </>
      }
      question="Can a small law firm get the speed of AI drafting without sending client documents to the cloud — and without letting a model make legal decisions?"
      meta={[
        ["Role", "Product designer and builder"],
        ["Type", "Independent product experiment"],
        ["Design", "Local-first, human-approved"],
        ["Demo", "Simulated, synthetic data"],
      ]}
      notice="An independent experiment, not a commercial product. It gives no legal advice and does not file, send or sign anything. The walkthrough below is simulated with synthetic documents — it is not connected to a model. No production-grade security is claimed, and there are no law-firm customers."
    />

    <CaseSection number="01" title="The product idea" aside="Why vertical, why local.">
      <Prose>
        <p>
          Law firms already own their most valuable drafting asset: templates and precedents refined over years. Generic
          AI tools ignore that and ask firms to upload confidential documents. The workbench inverts it — the firm&apos;s
          templates and approved clauses are the backbone, a model running on the firm&apos;s own machine does the
          reading, and a lawyer approves every output.
        </p>
      </Prose>
      <Figure className="mt-10" caption="Ownership of each stage: deterministic rules, local AI, or a person.">
        <WorkbenchStrip />
      </Figure>
    </CaseSection>

    <CaseSection number="02" title="Walk through a matter" tone="graphite" aside="Use the stage list or Back / Next.">
      <WorkbenchDemo />
    </CaseSection>

    <CaseSection number="03" title="The design decisions" aside="Where the trust comes from.">
      <PointList
        items={[
          { title: "Deterministic formatting", body: "Numbering, defined terms and layout come from the firm's template engine. The model never generates document structure." },
          { title: "AI only for extraction and first drafts", body: "The local model reads sources and fills slots. It cannot invent a clause; clauses come from the approved library." },
          { title: "Source traceability", body: "Every inserted value links to a page in a source document, so review means checking citations, not re-reading everything." },
          { title: "Conflicts stay visible", body: "When sources disagree the draft shows both values and blocks approval until a person decides." },
          { title: "Human approval", body: "A lawyer approves the draft. Approval is recorded in an audit log; nothing leaves the workbench automatically." },
          { title: "Local-first", body: "Designed to run against a model on the firm's own hardware (via Ollama), so documents need not leave the building." },
        ]}
      />
    </CaseSection>

    <CaseSection number="04" title="What this shows — and what it doesn't" tone="graphite">
      <Prose>
        <p>
          The workbench is evidence of how I design products: start from the user&apos;s existing assets, separate what
          must be deterministic from what can be probabilistic, and put the human decision where the risk is. It is a
          side experiment, not my primary work, and it has not been validated with paying firms.
        </p>
      </Prose>
    </CaseSection>

    <NextCase slug={WORKBENCH.slug} />
  </>
);
