import Link from "next/link";
import { type Metadata } from "next";
import { ContactBlock } from "@/components/home/home-sections";
import { EvidenceTag } from "@/components/ui/evidence-tag";
import { Arrow } from "@/components/ui/section-heading";

const DESCRIPTION =
  "Meet Soni — growth strategist and builder from VJTI Mumbai, working across strategy, go-to-market, AI automation and execution.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: "About · Meet Soni", description: DESCRIPTION, url: "/about" },
};

const EXPERIENCE = [
  {
    role: "Founder's Office Associate Intern",
    org: "SHK Global Ventures",
    period: "May 2026 – present",
    note: "GTM strategy, pricing, a founding-partner pilot, fundraising and AI-agent workflows.",
    href: "/work/shk-global-ventures",
  },
  {
    role: "Data Analyst Intern",
    org: "Bluestock",
    period: "May – Jul 2026",
    note: "Financial intelligence platform: database, KPI engine, screeners and API across 92 companies.",
    href: "/work/bluestock-financial-intelligence",
  },
  {
    role: "Business Analyst Intern",
    org: "Cludecraftstudio",
    period: "Dec 2025 – Mar 2026",
    note: "Won and ran an investor-facing funding campaign for a steel manufacturer, from pitch to delivery.",
  },
  {
    role: "BizOps Intern",
    org: "Anidrezs",
    period: "Jun – Aug 2025",
    note: "Built a college-led B2C channel and its operating model; streamlined four core operations.",
  },
];

const LEADERSHIP = [
  {
    role: "Founding Member & Head of Business Consulting",
    org: "Synergyst — Finance & Consulting Club, VJTI",
    period: "Aug 2024 – present",
    note: "Grew VJTI's consulting community to 70+ members; trained 100+ students through case-solving cohorts; led 3 analytics projects and 1 research paper.",
  },
  {
    role: "Gatnayak (Team Leader)",
    org: "World Hindu Economic Forum",
    period: "Dec 2024 – present",
    note: "Delegate communication, logistics and protocol for two national forums of 700–800 delegates; sponsor partnerships of ₹2Cr+.",
  },
  {
    role: "Marketing Head",
    org: "Technovanza, Pratibimb, E-Cell, Debate & Literary Arts Society — VJTI",
    period: "Aug 2023 – May 2025",
    note: "Multi-channel campaigns across four student bodies, with 40–55% growth in participation.",
  },
];

const SKILLS = [
  ["Analysis", "SQL (joins, cohorts), advanced Excel modelling, Power BI, Python"],
  ["Strategy", "Unit economics, market sizing, segmentation, retention & churn, pricing, CAC/LTV"],
  ["Execution", "Experiment design, GTM planning, process optimisation"],
  ["AI & automation", "n8n, AI agents, LLM integration, APIs, workflow automation"],
];

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-rule bg-ink pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="lab-container grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-lime">About</p>
            <h1 className="display mt-6 text-5xl md:text-8xl">
              Meet Soni. <em className="text-ivory-dim">Growth operator, builder.</em>
            </h1>
          </div>
          <div className="prose-lab md:col-span-7 md:col-start-6">
            <p>
              I&apos;m drawn to problems that don&apos;t arrive with a brief: a gap in the numbers nobody has explained,
              a product that people install but don&apos;t keep, a team doing the same manual work every week. I like
              working out what is really going on — and then building the model, the plan or the workflow that
              changes it.
            </p>
            <p>
              I study <strong>B.Tech Textile Technology at VJTI Mumbai</strong>, with a minor in Internet of Things.
              Engineering taught me to think about processes and systems; the growth side I&apos;ve learned by doing —
              in a founder&apos;s office, on a data team, running campaigns for student bodies, and helping found
              VJTI&apos;s finance and consulting club.
            </p>
            <p>
              The common thread is ownership. I prefer being responsible for an outcome to being responsible for a
              deliverable, and I&apos;m most useful where strategy has to turn into something that actually ships.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="experience-title" className="border-b border-rule bg-graphite py-20 md:py-28">
        <div className="lab-container grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <h2 id="experience-title" className="eyebrow">Experience</h2>
            <p className="mt-4 text-xs leading-relaxed text-mute">
              Details as reported. <EvidenceTag kind="reported" />
            </p>
          </div>
          <ol className="md:col-span-9">
            {EXPERIENCE.map((item) => (
              <li key={item.org} className="grid gap-3 border-t border-rule py-7 md:grid-cols-[1fr_180px]">
                <div>
                  <h3 className="display text-3xl">{item.org}</h3>
                  <p className="mt-1 text-ivory">{item.role}</p>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-dim">{item.note}</p>
                  {item.href && (
                    <Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-lime">
                      Case study <Arrow />
                    </Link>
                  )}
                </div>
                <p className="font-mono text-xs text-mute md:text-right">{item.period}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="leadership-title" className="border-b border-rule bg-ink py-20 md:py-28">
        <div className="lab-container grid gap-10 md:grid-cols-12">
          <h2 id="leadership-title" className="eyebrow md:col-span-3">Leadership</h2>
          <ol className="md:col-span-9">
            {LEADERSHIP.map((item) => (
              <li key={item.org} className="grid gap-3 border-t border-rule py-7 md:grid-cols-[1fr_180px]">
                <div>
                  <h3 className="text-xl text-ivory">{item.role}</h3>
                  <p className="mt-1 text-ivory-dim">{item.org}</p>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-dim">{item.note}</p>
                </div>
                <p className="font-mono text-xs text-mute md:text-right">{item.period}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="skills-title" className="border-b border-rule bg-graphite py-20 md:py-28">
        <div className="lab-container grid gap-10 md:grid-cols-12">
          <h2 id="skills-title" className="eyebrow md:col-span-3">Toolkit</h2>
          <dl className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 md:col-span-9">
            {SKILLS.map(([area, tools]) => (
              <div key={area} className="bg-ink p-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{area}</dt>
                <dd className="mt-3 leading-relaxed text-ivory-dim">{tools}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
