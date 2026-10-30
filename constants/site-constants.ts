import { type Capability, type MethodStep } from "@/types/site-types";

/**
 * THE GROWTH LAB — brand, navigation and narrative copy.
 * Contact details live in social-constants.ts.
 */
export const BRAND = "The Growth Lab";

export const POSITIONING =
  "I turn complex business problems into measurable growth systems.";

export const SUPPORTING_STATEMENT =
  "I work at the intersection of strategy, go-to-market, AI automation and execution — turning opportunities into systems that can be tested, measured and scaled.";

export const HERO_COPY =
  "I turn complex business problems into measurable growth systems — combining strategy, GTM, AI automation and execution.";

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Method", href: "/#method" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const INDEPENDENCE_NOTE =
  "Independent work. The Wispr Flow case study is my own analysis, prepared as an applicant to the Wispr Flow India Growth Challenge; it is not affiliated with or endorsed by Wispr Flow.";

export const CAPABILITIES: Capability[] = [
  {
    id: "strategy",
    index: "01",
    title: "Strategy",
    line: "Find the problem worth solving.",
    body: "Diagnose business problems, evaluate opportunities, understand unit economics and decide what matters first.",
    verbs: ["Diagnose", "Size", "Model", "Prioritise"],
  },
  {
    id: "gtm",
    index: "02",
    title: "Go-to-Market",
    line: "Turn positioning into a path to customers.",
    body: "Translate positioning into acquisition, distribution, partnerships, pricing and growth experiments.",
    verbs: ["Segment", "Price", "Distribute", "Experiment"],
  },
  {
    id: "automation",
    index: "03",
    title: "AI Automation",
    line: "Take the repetitive work out of the loop.",
    body: "Build practical AI workflows, agents and internal systems that reduce repetitive work and keep a human in charge of decisions.",
    verbs: ["Map", "Automate", "Gate", "Monitor"],
  },
  {
    id: "execution",
    index: "04",
    title: "Execution",
    line: "Ship, measure, then decide again.",
    body: "Move from research and hypotheses to prototypes, tests, implementation and measurement.",
    verbs: ["Prototype", "Ship", "Measure", "Iterate"],
  },
];

export const METHOD: MethodStep[] = [
  {
    id: "observe",
    title: "Observe",
    question: "What is actually happening?",
    body: "Start with behaviour and numbers before opinions. Read the data, the product and the customer's own words.",
    example:
      "Wispr Flow: India is ~14% of installs but ~2% of in-app revenue (third-party estimate). That gap is the starting observation.",
  },
  {
    id: "diagnose",
    title: "Diagnose",
    question: "Why is it happening?",
    body: "Separate symptoms from causes. List the competing explanations and what each would predict.",
    example:
      "Myntra analysis: returns looked like a logistics cost problem; the diagnosis was a customer-behaviour problem concentrated in serial returners.",
  },
  {
    id: "prioritise",
    title: "Prioritise",
    question: "What matters first?",
    body: "Rank options by impact, confidence and cost to learn. Choose one bet and say what it costs to be wrong.",
    example:
      "SHK Global Ventures: a founding-partner pilot came before broad launch, because it de-risked enterprise adoption cheaply.",
  },
  {
    id: "design",
    title: "Design",
    question: "What would a good answer look like?",
    body: "Design the system, the experiment or the model so the result can be read without arguing about definitions.",
    example:
      "Wispr case: activation, repeat use and conversion intent are defined before any data is collected.",
  },
  {
    id: "build",
    title: "Build",
    question: "What is the smallest thing that works?",
    body: "Prototype quickly with the tools that fit — spreadsheets, SQL, n8n, code — and keep humans approving the consequential steps.",
    example:
      "AI automation: agents draft and research; a person approves before anything reaches a customer.",
  },
  {
    id: "measure",
    title: "Measure",
    question: "Did it work, and how do we know?",
    body: "Compare against the baseline, report what changed and what did not, then decide the next loop.",
    example:
      "Bluestock: 60+ automated tests and acceptance gates decide whether the intelligence platform is fit to use (as reported).",
  },
];
