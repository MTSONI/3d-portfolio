import { type FC } from "react";
import { CaseGlyph } from "@/components/visuals/case-glyph";
import { EvidenceTag } from "@/components/ui/evidence-tag";
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

/* ───────────────────────── SHK Global Ventures ───────────────────────── */

const LtvCacBars: FC = () => (
  <div className="grid gap-6 sm:grid-cols-2">
    {[
      { label: "Baseline plan", value: 2.92, tone: "bg-ivory-dim" },
      { label: "Dual-product GTM plan", value: 4.67, tone: "bg-copper" },
    ].map((bar) => (
      <div key={bar.label}>
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ivory-dim">{bar.label}</span>
          <span className="display text-3xl">{bar.value}×</span>
        </div>
        <div className="mt-3 h-2 w-full bg-rule">
          <div className={`h-2 ${bar.tone}`} style={{ width: `${(bar.value / 5) * 100}%` }} />
        </div>
      </div>
    ))}
    <p className="text-xs text-mute sm:col-span-2">
      LTV/CAC in my GTM model. <EvidenceTag kind="model" className="ml-1" /> Not an achieved result.
    </p>
  </div>
);

export const ShkCase: FC = () => (
  <>
    <CaseHeader
      index="02"
      kicker="Founder's Office · Commercial strategy"
      title={
        <>
          SHK Global Ventures: <em className="text-copper">a commercial plan buyers and investors could believe.</em>
        </>
      }
      question="How does an early venture studio sell to enterprises and raise capital before it has references?"
      meta={[
        ["Role", "Founder's Office Associate Intern"],
        ["Period", "May 2026 – present"],
        ["Scope", "GTM, pricing, launch, fundraising"],
        ["Ventures", "GrowNidhi · LuxeVia AI"],
      ]}
      notice="Revenue, LTV/CAC and pipeline figures below come from my working models and are labelled as modelled estimates — they are plans, not achieved outcomes. Company-confidential details are omitted."
    />

    <CaseSection number="01" title="The problem" aside="Two products, little capital, no track record.">
      <Prose>
        <p>
          SHK Global Ventures was building two ventures at once: <strong>GrowNidhi</strong>, sold to both individuals
          and enterprises, and <strong>LuxeVia AI</strong>, aimed at high-net-worth buyers in real estate. The founder
          needed one commercial story that would convince enterprise buyers to commit early and investors to fund the
          next stage — without the proof points a mature company would have.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="02" title="Strategic decisions" tone="graphite" aside="Each decision is a way of moving risk off the buyer.">
      <PointList
        items={[
          {
            title: "Dual-product GTM",
            body: "Designed a dual-product go-to-market plan for GrowNidhi instead of a single offer. In the model it moved LTV/CAC from 2.92× to 4.67×.",
            kind: "model",
          },
          {
            title: "Tiered pricing",
            body: "Consumer tiers of ₹199–₹599 and enterprise engagements of ₹15L–₹30L+, so the same product could be bought at very different levels of commitment.",
            kind: "reported",
          },
          {
            title: "Founding-partner pilot",
            body: "A ₹10L founding-partner pilot lets an enterprise join before references exist — lower price in exchange for feedback and a case study.",
            kind: "reported",
          },
          {
            title: "Investment thesis & roadmap",
            body: "Refined the investment thesis, targeted investors and planned the pitch sequence for a ₹1Cr round.",
            kind: "reported",
          },
        ]}
      />
      <Figure className="mt-12" caption="Pricing ladder: each tier asks for more commitment, and the pilot is the lowest-risk way in.">
        <div className="mx-auto max-w-xl">
          <CaseGlyph slug="shk-global-ventures" />
        </div>
      </Figure>
    </CaseSection>

    <CaseSection number="03" title="What I contributed" aside="My part, as distinct from the founder's.">
      <Prose>
        <p>
          I built the GTM and unit-economics models, designed the pricing tiers and pilot structure, drafted the
          investment thesis and investor-targeting plan, and led the launch strategy for LuxeVia AI — including a
          patron-intelligence framework of 150+ attributes for AI-powered matching and a three-stream monetisation
          model (developer access, transaction fees, premium patron membership).
        </p>
      </Prose>
      <div className="mt-12">
        <FactGrid cols={3}>
          <Fact value="₹7.63Cr" label="Year-3 revenue path in the GrowNidhi GTM model" kind="model" />
          <Fact value="₹3Cr" label="12-month revenue plan for the LuxeVia AI launch" kind="model" />
          <Fact value="150+" label="Attributes in the patron-intelligence framework" kind="reported" />
        </FactGrid>
      </div>
      <div className="mt-12 max-w-2xl">
        <LtvCacBars />
      </div>
    </CaseSection>

    <CaseSection number="04" title="Deliverables and what I learned" tone="graphite">
      <div className="grid gap-10 md:grid-cols-2">
        <ul className="space-y-3 text-[15px] text-ivory-dim">
          {["Dual-product GTM strategy and model", "Pricing architecture and pilot terms", "Investment thesis and investor list", "Investor-pitch roadmap", "LuxeVia AI launch plan and monetisation model"].map(
            (item) => (
              <li key={item} className="flex gap-3 border-b border-rule pb-3">
                <span className="text-copper">→</span>
                {item}
              </li>
            )
          )}
        </ul>
        <p className="display text-3xl leading-tight">
          Pricing is a risk-transfer tool. The founding-partner tier let an enterprise say yes before the product had
          references.
        </p>
      </div>
    </CaseSection>

    <NextCase slug="shk-global-ventures" />
  </>
);

/* ───────────────────────── Quick commerce ───────────────────────── */

const FRAMEWORK = [
  { label: "Average order value", note: "Basket size × price", sign: "+" },
  { label: "Gross margin & fees", note: "Category margin, platform and delivery fees", sign: "×" },
  { label: "Last-mile delivery", note: "Rider cost per order", sign: "−" },
  { label: "Picking & packing", note: "Dark-store labour and packaging", sign: "−" },
  { label: "Store fixed cost per order", note: "Rent and utilities ÷ order density", sign: "−" },
  { label: "Contribution per order", note: "What is left to pay for growth", sign: "=" },
];

export const QuickCommerceCase: FC = () => (
  <>
    <CaseHeader
      index="05"
      kicker="Research paper · Unit economics"
      title={
        <>
          Quick commerce in Tier-2 India: <em className="text-copper">cheaper isn&apos;t the same as profitable.</em>
        </>
      }
      question="As quick-commerce platforms expand beyond metros, do Tier-2 markets' lower operating costs compensate for smaller baskets?"
      meta={[
        ["Role", "Author"],
        ["Published", "SSRN (as reported), January 2026"],
        ["Method", "Per-order unit economics, scenario modelling"],
        ["Data", "Public benchmarks — no company data"],
      ]}
    />

    <CaseSection number="01" title="Market structure" aside="Why the question matters now.">
      <Prose>
        <p>
          Metro quick-commerce markets are crowded, so platforms are opening dark stores in Tier-2 cities, where rent
          and labour are cheaper. The open question is whether the cost advantage survives smaller baskets and thinner
          order density. I modelled expansion scenarios against a ₹64,000 Cr gross order value market used in the
          paper.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="02" title="The unit-economics framework" tone="graphite" aside="Every order has to carry its share of the store.">
      <ol className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-6">
        {FRAMEWORK.map((step) => (
          <li key={step.label} className={`bg-ink p-5 ${step.sign === "=" ? "md:bg-char" : ""}`}>
            <span className={`font-mono text-xl ${step.sign === "=" ? "text-lime" : "text-copper"}`}>{step.sign}</span>
            <p className="mt-3 leading-tight text-ivory">{step.label}</p>
            <p className="mt-2 text-xs leading-snug text-mute">{step.note}</p>
          </li>
        ))}
      </ol>
      <Prose className="mt-10">
        <p>
          The framework shows why basket size dominates: margin scales with order value, but delivery, picking and
          the store&apos;s fixed cost are paid per order whatever the basket. Scenarios varied AOV, delivery efficiency
          and repeat frequency.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="03" title="Key findings" aside="As reported in the paper.">
      <FactGrid cols={3}>
        <Fact value="~2.5–3×" label="Higher contribution per order in Tier-1 than Tier-2" kind="reported" />
        <Fact value="30–50%" label="Lower operating costs in Tier-2" kind="reported" />
        <Fact value="₹550 vs ₹200" label="AOV benchmark, Tier-1 vs Tier-2; delivery cost ₹60 vs ₹40" kind="reported" />
      </FactGrid>
      <Figure className="mt-12" caption="Benchmarks used in the paper, as reported: Tier-2 delivery is cheaper, but its basket is far smaller.">
        <div className="mx-auto max-w-xl">
          <CaseGlyph slug="quick-commerce-unit-economics" />
        </div>
      </Figure>
    </CaseSection>

    <CaseSection number="04" title="Implications and limitations" tone="graphite">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="eyebrow text-ivory">Implications</h3>
          <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ivory-dim">
            <li>Tier-2 growth should be led by basket-building — bundles, minimum orders, higher-ticket categories — not by cost cutting.</li>
            <li>Order batching and density matter more than rent: fixed cost per order falls only with volume.</li>
            <li>Repeat frequency is the lever that makes a smaller basket viable over a customer&apos;s lifetime.</li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-ivory">Limitations</h3>
          <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ivory-dim">
            <li>Built on public benchmarks, not platform data; real margins and fee structures vary by operator.</li>
            <li>Contribution is sensitive to take-rate and category-mix assumptions.</li>
            <li>A point-in-time view of a market that is changing quickly.</li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-sm text-mute">The paper is available on request while its public link is confirmed.</p>
    </CaseSection>

    <NextCase slug="quick-commerce-unit-economics" />
  </>
);

/* ───────────────────────── Myntra-style returns ───────────────────────── */

const LeakageBars: FC = () => (
  <div className="space-y-6">
    {[
      { label: "Net profit in the synthetic dataset", value: "≈ ₹6.16L", width: 100 / 5.8, tone: "bg-ivory" },
      { label: "Subsidy leakage from returns", value: "≈ ₹35.7L", width: 100, tone: "bg-copper" },
    ].map((bar) => (
      <div key={bar.label}>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-ivory-dim">{bar.label}</span>
          <span className="display text-2xl">{bar.value}</span>
        </div>
        <div className="mt-2 h-3 w-full bg-rule">
          <div className={`h-3 ${bar.tone}`} style={{ width: `${bar.width}%` }} />
        </div>
      </div>
    ))}
  </div>
);

export const MyntraCase: FC = () => (
  <>
    <CaseHeader
      index="06"
      kicker="Synthetic-data analysis · E-commerce profitability"
      title={
        <>
          Returns, discounts and the customers <em className="text-copper">who cost more than they pay.</em>
        </>
      }
      question="How much do returns, discounts and serial returners erode a fashion marketplace's profit — and which levers recover it?"
      meta={[
        ["Role", "Analyst · independent project"],
        ["Period", "March 2026"],
        ["Data", "≈1.19 lakh rows, synthetic"],
        ["Tools", "SQL, Python, Excel"],
      ]}
      notice={
        <>
          <strong className="font-semibold">Synthetic data.</strong> Every figure on this page is an output of my
          analysis of a synthetic, Myntra-style marketplace dataset. None of it describes Myntra&apos;s actual business
          or internal financial performance, and Myntra did not provide data or endorse this work.
        </>
      }
    />

    <CaseSection number="01" title="Dataset design" aside="Synthetic, so every cost can be traced.">
      <Prose>
        <p>
          I built a synthetic marketplace dataset of roughly 1.19 lakh rows so that every order could be traced from
          customer and SKU through discount, return and reverse-logistics cost. Using synthetic data meant I could
          analyse the full cost chain — something public data never allows — while being explicit that the numbers
          illustrate a method, not a real company.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="02" title="What the analysis found" tone="graphite" aside="All results on synthetic data.">
      <FactGrid cols={4}>
        <Fact value="≈24.44%" label="Return rate" kind="synthetic" />
        <Fact value="≈21.7K" label="Serial returners identified" kind="synthetic" />
        <Fact value="≈₹35.7L" label="Subsidy leakage through returns" kind="synthetic" />
        <Fact value="≈₹6.16L" label="Net profit" kind="synthetic" />
      </FactGrid>
      <Figure className="mt-12" caption="Return-driven leakage was about 5.7× the dataset's net profit. Synthetic data.">
        <LeakageBars />
      </Figure>
      <Prose className="mt-10">
        <p>
          <strong>Serial-returner analysis.</strong> Return cost was not spread evenly. A defined group of customers
          who return repeatedly accounted for a disproportionate share of reverse-logistics cost and of discounts that
          never turned into kept revenue.
        </p>
        <p>
          <strong>Subsidy leakage.</strong> Leakage = discounts and logistics spent on orders that came back. Counting it
          explicitly turns &ldquo;returns are expensive&rdquo; into a number a category manager can act on.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="03" title="Recommendations" aside="An operating model, not a one-off fix.">
      <PointList
        items={[
          { title: "Return-risk tiers", body: "Score customers and SKUs by return risk; adjust discounts, COD and free-return eligibility by tier.", kind: "synthetic" },
          { title: "Serial-returner policy", body: "Targeted friction for the riskiest segment instead of penalising every customer." },
          { title: "Faster restocking", body: "A reverse-demand flow that cut the modelled restock cycle from 12 to 5 days and recovered ≈₹4.7L margin.", kind: "synthetic" },
          { title: "Assortment pruning", body: "De-prioritise SKUs whose return-adjusted contribution is negative, even when gross sales look healthy." },
        ]}
      />
    </CaseSection>

    <CaseSection number="04" title="Limitations of synthetic data" tone="graphite">
      <Prose>
        <p>
          Synthetic data reproduces the structure I designed into it. It can show how to measure leakage and where to
          look for it; it cannot show how large leakage is for any real retailer. On a real dataset the first step
          would be validating return reasons, logistics rates and customer identity matching.
        </p>
      </Prose>
    </CaseSection>

    <NextCase slug="myntra-profitability-analysis" />
  </>
);
