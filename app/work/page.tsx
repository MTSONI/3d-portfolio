import Link from "next/link";
import { type Metadata } from "next";
import { EvidenceKey } from "@/components/cases/case-kit";
import { CasePreview } from "@/components/work/case-preview";
import { WorkbenchStrip } from "@/components/visuals/workbench-strip";
import { Arrow } from "@/components/ui/section-heading";
import { CASES, OTHER_WORK, WORKBENCH } from "@/constants/work-constants";

const DESCRIPTION =
  "Case studies in growth strategy, go-to-market, AI automation and analytics — every figure labelled by how it is known.";

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "/work" },
  openGraph: { title: "Work · Meet Soni", description: DESCRIPTION, url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="border-b border-rule bg-ink pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="lab-container">
          <p className="eyebrow text-lime">Work</p>
          <h1 className="display mt-6 max-w-5xl text-5xl md:text-8xl">
            Six problems, <em className="text-ivory-dim">one way of working.</em>
          </h1>
          <p className="lede mt-8 max-w-2xl">{DESCRIPTION}</p>
          <div className="mt-12 max-w-3xl border-t border-rule pt-6">
            <EvidenceKey />
          </div>
        </div>
      </header>

      <section aria-label="Case studies" className="bg-ink pb-8">
        <div className="lab-container">
          {CASES.map((item, i) => (
            <CasePreview key={item.slug} item={item} flip={i % 2 === 1} headingLevel="h2" />
          ))}
        </div>
      </section>

      <section aria-labelledby="experiment-title" className="border-t border-rule bg-graphite py-20 md:py-28">
        <div className="lab-container grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-copper">{WORKBENCH.kicker}</p>
            <h2 id="experiment-title" className="display mt-5 text-4xl md:text-5xl">
              {WORKBENCH.title}
            </h2>
            <p className="mt-5 leading-relaxed text-ivory-dim">{WORKBENCH.body}</p>
            <Link href={`/work/${WORKBENCH.slug}`} className="btn-line mt-8">
              Open the walkthrough <Arrow />
            </Link>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <WorkbenchStrip />
          </div>
        </div>
      </section>

      <section aria-labelledby="other-title" className="border-t border-rule bg-ink py-20 md:py-28">
        <div className="lab-container grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Also</p>
            <h2 id="other-title" className="display mt-5 text-4xl">
              Other analysis work
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Shorter strategy and modelling projects. Figures in these are modelled estimates, so they are summarised
              without headline numbers.
            </p>
          </div>
          <ul className="md:col-span-8">
            {OTHER_WORK.map((item) => (
              <li key={item.title} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-lg text-ivory">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-dim">{item.note}</p>
                </div>
                <span className="font-mono text-xs text-mute">{item.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
