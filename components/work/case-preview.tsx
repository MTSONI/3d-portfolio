import Link from "next/link";
import { type FC } from "react";
import { CaseGlyph } from "@/components/visuals/case-glyph";
import { EvidenceTag } from "@/components/ui/evidence-tag";
import { Arrow } from "@/components/ui/section-heading";
import { type CaseSummary } from "@/types/site-types";

const ACCENT_TEXT: Record<CaseSummary["accent"], string> = {
  lime: "text-lime",
  copper: "text-copper",
  ivory: "text-ivory",
};

/** Large editorial preview: visual, problem framing, evidence and the lesson. */
export const CasePreview: FC<{ item: CaseSummary; flip?: boolean; headingLevel?: "h2" | "h3" }> = ({
  item,
  flip = false,
  headingLevel = "h3",
}) => {
  const Heading = headingLevel;
  return (
    <article className="group grid gap-10 border-t border-rule py-16 md:grid-cols-12 md:gap-12 md:py-20">
      <Link
        href={`/work/${item.slug}`}
        tabIndex={-1}
        aria-hidden
        className={`relative block aspect-[40/26] overflow-hidden rounded-sm border border-rule bg-graphite p-6 transition-colors duration-500 group-hover:border-ivory/30 md:col-span-6 ${
          flip ? "md:order-2 md:col-start-7" : ""
        }`}
      >
        <span className="absolute left-5 top-4 font-mono text-[11px] tracking-[0.2em] text-mute">{item.index}</span>
        <CaseGlyph slug={item.slug} />
      </Link>

      <div className={`flex flex-col md:col-span-6 ${flip ? "md:order-1" : ""}`}>
        <p className={`eyebrow ${ACCENT_TEXT[item.accent]}`}>
          {item.kicker} · {item.period}
        </p>
        <Heading className="display mt-4 text-4xl md:text-5xl">
          <Link href={`/work/${item.slug}`} className="transition-colors hover:text-ivory-dim">
            {item.title}
          </Link>
        </Heading>
        <p className="mt-5 text-lg leading-relaxed text-ivory-dim">{item.hook}</p>

        <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
          {(
            [
              ["Problem", item.problem],
              ["My role", item.role],
              ["Approach", item.approach],
              ["Deliverable", item.deliverable],
            ] as const
          ).map(([term, detail]) => (
            <div key={term}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{term}</dt>
              <dd className="mt-1.5 leading-relaxed text-ivory-dim">{detail}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3" aria-label="Evidence">
          {item.evidence.map((evidence) => (
            <li key={evidence.label} className="bg-ink p-4">
              <p className="display text-2xl">{evidence.value}</p>
              <p className="mt-1 text-xs leading-snug text-ivory-dim">{evidence.label}</p>
              <EvidenceTag kind={evidence.kind} className="mt-3" />
            </li>
          ))}
        </ul>

        <p className="mt-7 border-l border-ivory/20 pl-4 text-sm italic leading-relaxed text-ivory-dim">
          <span className="not-italic font-mono text-[10px] uppercase tracking-[0.2em] text-mute">What I learned · </span>
          {item.learned}
        </p>

        <Link
          href={`/work/${item.slug}`}
          className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-ivory transition-colors hover:text-lime"
        >
          Read the case study <Arrow className="transition-transform group-hover:translate-x-1" />
          <span className="sr-only">: {item.title}</span>
        </Link>
      </div>
    </article>
  );
};
