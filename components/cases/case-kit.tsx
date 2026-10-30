import Link from "next/link";
import { type FC, type ReactNode } from "react";
import { EVIDENCE_LEGEND, EvidenceTag } from "@/components/ui/evidence-tag";
import { Arrow } from "@/components/ui/section-heading";
import { CASES, WORKBENCH } from "@/constants/work-constants";
import { type EvidenceKind } from "@/types/site-types";

interface CaseHeaderProps {
  index: string;
  kicker: string;
  title: ReactNode;
  question: ReactNode;
  meta: [string, string][];
  notice?: ReactNode;
}

export const CaseHeader: FC<CaseHeaderProps> = ({ index, kicker, title, question, meta, notice }) => (
  <header className="relative overflow-hidden border-b border-rule bg-ink pt-32 pb-16 md:pt-44 md:pb-24">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-rule"
    />
    <div className="lab-container relative">
      <nav aria-label="Breadcrumb" className="eyebrow">
        <Link href="/work" className="hover:text-ivory">
          Work
        </Link>{" "}
        / {index}
      </nav>
      <p className="eyebrow mt-10 text-lime">{kicker}</p>
      <h1 className="display mt-5 max-w-5xl text-5xl md:text-7xl">{title}</h1>
      <div className="mt-8 max-w-3xl font-serif text-2xl italic leading-snug text-ivory-dim md:text-3xl">
        {question}
      </div>
      <dl className="mt-12 grid gap-6 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {meta.map(([term, detail]) => (
          <div key={term}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{term}</dt>
            <dd className="mt-1.5 text-sm text-ivory">{detail}</dd>
          </div>
        ))}
      </dl>
      {notice && (
        <div className="mt-8 rounded-sm border border-copper/40 bg-copper/[0.06] px-5 py-4 text-sm leading-relaxed text-ivory">
          {notice}
        </div>
      )}
    </div>
  </header>
);

interface CaseSectionProps {
  number: string;
  title: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  tone?: "ink" | "graphite";
  id?: string;
}

/** Numbered chapter: label column on the left, content on the right. */
export const CaseSection: FC<CaseSectionProps> = ({ number, title, children, aside, tone = "ink", id }) => (
  <section
    id={id}
    className={`border-b border-rule py-20 md:py-28 ${tone === "graphite" ? "bg-graphite" : "bg-ink"}`}
  >
    <div className="lab-container grid gap-10 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="font-mono text-sm text-lime">{number}</p>
        {aside && <div className="mt-6 hidden text-sm leading-relaxed text-mute md:block">{aside}</div>}
      </div>
      {/* min-w-0 lets wide tables scroll inside their wrapper instead of stretching the grid. */}
      <div className="min-w-0 md:col-span-9">
        <h2 className="display text-4xl md:text-5xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  </section>
);

interface FactProps {
  value: ReactNode;
  label: ReactNode;
  kind: EvidenceKind;
  source?: ReactNode;
}

export const Fact: FC<FactProps> = ({ value, label, kind, source }) => (
  <div className="flex flex-col bg-ink p-6">
    <p className="display text-4xl">{value}</p>
    <p className="mt-2 text-sm leading-snug text-ivory-dim">{label}</p>
    <div className="mt-auto pt-5">
      <EvidenceTag kind={kind} />
      {source && <p className="mt-2 text-xs leading-snug text-mute">{source}</p>}
    </div>
  </div>
);

export const FactGrid: FC<{ children: ReactNode; cols?: 2 | 3 | 4 }> = ({ children, cols = 3 }) => (
  <div
    className={`grid gap-px overflow-hidden rounded-sm border border-rule bg-rule ${
      cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
    }`}
  >
    {children}
  </div>
);

export const Prose: FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`prose-lab max-w-3xl ${className}`}>{children}</div>
);

/** A labelled list of points, two columns on wide screens. */
export const PointList: FC<{ items: { title: string; body: ReactNode; kind?: EvidenceKind }[] }> = ({ items }) => (
  <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
    {items.map((item) => (
      <li key={item.title} className="border-t border-rule pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-lg text-ivory">{item.title}</h3>
          {item.kind && <EvidenceTag kind={item.kind} />}
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ivory-dim">{item.body}</p>
      </li>
    ))}
  </ul>
);

export const Figure: FC<{ caption: ReactNode; children: ReactNode; className?: string }> = ({
  caption,
  children,
  className = "",
}) => (
  <figure className={`rounded-sm border border-rule bg-graphite p-5 md:p-8 ${className}`}>
    {children}
    <figcaption className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-mute">{caption}</figcaption>
  </figure>
);

export interface SourceItem {
  label: string;
  href?: string;
  note: string;
}

export const SourceList: FC<{ items: SourceItem[]; accessed?: string }> = ({ items, accessed }) => (
  <div>
    <ol className="space-y-3 text-sm">
      {items.map((item, i) => (
        <li key={item.label} className="grid grid-cols-[2rem_1fr] gap-2">
          <span className="font-mono text-mute">[{i + 1}]</span>
          <span className="text-ivory-dim">
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="link-underline text-ivory">
                {item.label}
              </a>
            ) : (
              <span className="text-ivory">{item.label}</span>
            )}{" "}
            — {item.note}
          </span>
        </li>
      ))}
    </ol>
    {accessed && <p className="mt-5 text-xs text-mute">{accessed}</p>}
  </div>
);

export const EvidenceKey: FC<{ kinds?: EvidenceKind[] }> = ({ kinds }) => (
  <ul className="grid gap-3 text-xs text-mute sm:grid-cols-2">
    {EVIDENCE_LEGEND.filter((entry) => !kinds || kinds.includes(entry.kind)).map((entry) => (
      <li key={entry.kind} className="flex flex-wrap items-baseline gap-2">
        <EvidenceTag kind={entry.kind} />
        <span>{entry.meaning}</span>
      </li>
    ))}
  </ul>
);

const ORDER = [...CASES.map((item) => ({ slug: item.slug, title: item.title })), { slug: WORKBENCH.slug, title: WORKBENCH.title }];

export const NextCase: FC<{ slug: string }> = ({ slug }) => {
  const at = ORDER.findIndex((item) => item.slug === slug);
  const next = ORDER[(at + 1) % ORDER.length];
  return (
    <nav aria-label="Next case study" className="bg-graphite">
      <Link href={`/work/${next.slug}`} className="group lab-container flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <span>
          <span className="eyebrow">Next case study</span>
          <span className="display mt-4 block text-4xl transition-colors group-hover:text-lime md:text-6xl">{next.title}</span>
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-lime group-hover:text-lime">
          <Arrow className="h-5 w-5" />
        </span>
      </Link>
    </nav>
  );
};
