import { type FC, type ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}

/** Eyebrow, serif title and optional intro, laid out on an asymmetric grid. */
export const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  intro,
  id,
  className = "",
}) => (
  <header className={`grid gap-6 md:grid-cols-12 ${className}`}>
    <p className="eyebrow md:col-span-3 md:pt-3">{eyebrow}</p>
    <div className="md:col-span-9">
      <h2 id={id} className="display text-4xl sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && <div className="lede mt-6 max-w-2xl">{intro}</div>}
    </div>
  </header>
);

export const Arrow: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className={`h-3.5 w-3.5 ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

/** Brand mark: the lime signal dot used in the reference films. */
export const Wordmark: FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <span aria-hidden className="h-2 w-2 rounded-full bg-lime shadow-[0_0_14px_rgba(200,240,74,0.7)]" />
    <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory">
      The Growth Lab
    </span>
  </span>
);
