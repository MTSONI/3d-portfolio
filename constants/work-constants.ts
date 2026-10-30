import { type CaseSummary } from "@/types/site-types";

/**
 * Case-study index. Every figure carries an evidence label; sources for each
 * are recorded on the case page itself. Figures marked "reported" come from
 * Meet's own CV and project records and have not been independently audited.
 */
export const CASES: CaseSummary[] = [
  {
    slug: "wispr-flow-india-growth",
    index: "01",
    title: "Wispr Flow — India growth opportunity",
    kicker: "Independent growth analysis",
    hook: "India installs a lot of Wispr Flow and pays for little of it. Which community, introduced by whom, turns into weekly users — and what is the smallest test that would show it?",
    problem:
      "India is ~14% of Wispr Flow's installs but ~2% of its in-app purchase revenue (Sensor Tower via TechCrunch). Is that a pricing problem, a channel problem or a measurement artefact?",
    role: "Independent analyst — applicant to the Wispr Flow India Growth Challenge.",
    approach:
      "Price-adjusted the install/revenue gap, separated segment from channel, and designed a two-arm community pilot with pre-registered success and failure conditions.",
    deliverable:
      "Opportunity map, segment comparison, customer journey, experiment design and measurement framework.",
    evidence: [
      { value: "~14% / ~2%", label: "India share of installs / in-app revenue", kind: "third-party" },
      { value: "~2×", label: "Gap after adjusting for India pricing", kind: "model" },
      { value: "Not run", label: "Pilot status", kind: "proposed" },
    ],
    learned:
      "The obvious options — convert more, target professionals, use communities — sit on different axes. The useful question combines them.",
    accent: "lime",
    period: "Oct–Nov 2026",
    tags: ["Growth strategy", "Experiment design", "Voice AI", "India"],
  },
  {
    slug: "shk-global-ventures",
    index: "02",
    title: "SHK Global Ventures — Founder's Office",
    kicker: "Commercial strategy & GTM",
    hook: "Dual-product go-to-market, tiered pricing, a founding-partner pilot and a fundraising roadmap for a venture studio.",
    problem:
      "A founder-led venture studio needed a commercial plan that enterprise buyers and investors would both believe — with limited capital and no track record yet.",
    role: "Founder's Office Associate Intern (May 2026–present).",
    approach:
      "Modelled a dual-product GTM, designed tiered pricing with a founding-partner pilot to de-risk enterprise adoption, and rebuilt the investment thesis behind the fundraising plan.",
    deliverable:
      "GTM strategy, pricing architecture, pilot structure, investment thesis and investor-pitch roadmap.",
    evidence: [
      { value: "2.92× → 4.67×", label: "LTV/CAC in the GTM model", kind: "model" },
      { value: "₹10L", label: "Founding-partner pilot design", kind: "reported" },
      { value: "₹1Cr", label: "Fundraising round planned", kind: "reported" },
    ],
    learned:
      "Pricing is a risk-transfer tool. A founding-partner tier let enterprise buyers say yes before the product had references.",
    accent: "copper",
    period: "May 2026–present",
    tags: ["Founder's Office", "Pricing", "GTM", "Fundraising"],
  },
  {
    slug: "ai-automation",
    index: "03",
    title: "AI automation systems",
    kicker: "Agents with a human in charge",
    hook: "A WhatsApp sales agent, a prospecting agent, an AI Chief of Staff and n8n workflows — each designed around an approval step.",
    problem:
      "Sales, research and reporting work was repetitive, slow to respond and hard to scale without adding people.",
    role: "Designer and builder of the workflows and agents.",
    approach:
      "Mapped each workflow as input → processing → decision → human approval → action → measurement, then automated only the steps a person did not need to own.",
    deliverable:
      "A 24/7 WhatsApp sales agent, a prospecting and GTM research agent, a local-first AI Chief of Staff prototype and n8n automations.",
    evidence: [
      { value: "120+ hrs", label: "Manual hours saved per month", kind: "reported" },
      { value: "~90%", label: "Faster lead response", kind: "reported" },
      { value: "~70%", label: "Less GTM research time", kind: "reported" },
    ],
    learned:
      "The value is in the approval design, not the model. Agents that draft and a person who decides beat agents that act alone.",
    accent: "lime",
    period: "2026",
    tags: ["AI agents", "n8n", "WhatsApp", "Workflow design"],
  },
  {
    slug: "bluestock-financial-intelligence",
    index: "04",
    title: "Bluestock — financial intelligence platform",
    kicker: "Data engineering for investment analysis",
    hook: "A 10-table database, a 50+ KPI engine and an API that screens 92 listed companies.",
    problem:
      "Fundamental analysis across dozens of companies lived in scattered files; screening and peer comparison were manual and inconsistent.",
    role: "Data Analyst Intern (May–July 2026).",
    approach:
      "Built the data model and ETL with data-quality rules, a KPI engine, screeners with sector-relative scoring, peer benchmarks, and a FastAPI layer with tests.",
    deliverable:
      "Database, KPI engine, 6 screeners, 8-screen dashboard, API and automated tearsheets.",
    evidence: [
      { value: "92", label: "Companies covered", kind: "reported" },
      { value: "1,100+", label: "Company-year observations", kind: "reported" },
      { value: "16 / 60+", label: "API endpoints / automated tests", kind: "reported" },
    ],
    learned:
      "Data-quality rules and acceptance gates are what make an analytics product trustworthy enough to use.",
    accent: "ivory",
    period: "May–Jul 2026",
    tags: ["SQL", "Python", "FastAPI", "Financial analysis"],
  },
  {
    slug: "quick-commerce-unit-economics",
    index: "05",
    title: "Quick-commerce unit economics in Tier-2 India",
    kicker: "Research paper",
    hook: "Lower costs did not make Tier-2 cities more profitable per order. Smaller baskets did the damage.",
    problem:
      "Quick-commerce players are expanding beyond metros. Do Tier-2 markets' lower operating costs make up for smaller baskets?",
    role: "Author.",
    approach:
      "Built a per-order unit-economics framework and benchmarked AOV and delivery cost across Tier-1 and Tier-2, then modelled expansion scenarios.",
    deliverable: "Research paper (reported as published on SSRN) with scenario models.",
    evidence: [
      { value: "~2.5–3×", label: "Tier-1 vs Tier-2 contribution per order", kind: "reported" },
      { value: "₹550 vs ₹200", label: "AOV benchmark, Tier-1 vs Tier-2", kind: "reported" },
      { value: "30–50%", label: "Lower Tier-2 operating costs", kind: "reported" },
    ],
    learned:
      "Cost advantages are linear; basket size compounds through every fixed cost per order.",
    accent: "copper",
    period: "Jan 2026",
    tags: ["Unit economics", "Research", "Quick commerce"],
  },
  {
    slug: "myntra-profitability-analysis",
    index: "06",
    title: "Myntra-style return & assortment profitability",
    kicker: "Synthetic-data analysis",
    hook: "On a synthetic marketplace dataset, returns cost more than the business earned — and a small group of customers drove it.",
    problem:
      "How much do returns, discounts and serial returners erode marketplace profit, and which levers recover margin?",
    role: "Analyst (independent project).",
    approach:
      "Designed a synthetic order dataset, traced return logistics and discount costs to customers and SKUs, then modelled a return-risk operating model.",
    deliverable: "Return-risk model, serial-returner analysis, subsidy-leakage estimate and assortment recommendations.",
    evidence: [
      { value: "~₹35.7L", label: "Subsidy leakage", kind: "synthetic" },
      { value: "~21.7K", label: "Serial returners", kind: "synthetic" },
      { value: "~24.44%", label: "Return rate", kind: "synthetic" },
    ],
    learned:
      "Average return rates hide the real problem. Profit leakage concentrates in a segment you can act on.",
    accent: "ivory",
    period: "Mar 2026",
    tags: ["SQL", "Python", "E-commerce", "Synthetic data"],
  },
];

export const WORKBENCH = {
  slug: "legal-document-workbench",
  title: "Private Legal Document Workbench",
  kicker: "Independent product experiment",
  line: "Your firm's templates. Your firm's knowledge. Your own local AI.",
  body: "A local-first drafting workbench for law firms: deterministic formatting, AI-assisted extraction with source traceability, and a lawyer who approves every output.",
  stages: [
    "Firm templates",
    "Matter",
    "Sources",
    "Local extraction",
    "Approved clauses",
    "Structured draft",
    "Verification",
    "Lawyer approval",
  ],
} as const;

/** Further analysis work, listed briefly on /work. All figures are as reported or modelled. */
export const OTHER_WORK = [
  {
    title: "Curefit — retention & revenue quality",
    note: "Churn segmentation in SQL and a 7-sheet model; designed a payroll-embedded B2B acquisition channel. Modelled.",
    period: "Apr 2026",
  },
  {
    title: "ARMOR — gaming headset feature strategy",
    note: "RICE/Kano scoring of 3 feature launches, BOM analysis and a 14-week GTM roadmap. Modelled.",
    period: "May 2026",
  },
  {
    title: "abcoffee — outlet unit economics",
    note: "15+ driver Excel model across 100+ expansion scenarios and two store formats. Modelled.",
    period: "May 2026",
  },
  {
    title: "L'Oréal Brandstorm — fragrance personalisation",
    note: "Innovation-competition concept for personalised luxury fragrance. Modelled.",
    period: "Feb 2026",
  },
  {
    title: "Career-Edge Consulting Fellowship — growth strategy",
    note: "Bottom-up revenue model across fellowships, test prep and admissions advisory. Modelled.",
    period: "Nov 2025",
  },
] as const;
