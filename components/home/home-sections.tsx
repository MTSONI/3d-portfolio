import Link from "next/link";
import { type FC } from "react";
import { CasePreview } from "@/components/work/case-preview";
import { WorkbenchStrip } from "@/components/visuals/workbench-strip";
import { Arrow, SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/constants/social-constants";
import { CASES, WORKBENCH } from "@/constants/work-constants";

export const SelectedWork: FC = () => (
  <section aria-labelledby="work-title" className="border-t border-rule bg-ink py-24 md:py-36">
    <div className="lab-container">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title={
          <>
            Problems I&apos;ve worked on, <em className="text-ivory-dim">and what they taught me.</em>
          </>
        }
        intro="Each case shows the problem, my role, the approach, what I delivered and the evidence — with every number labelled by how it is known."
      />
      <div className="mt-16">
        {CASES.map((item, i) => (
          <RevealOnScroll key={item.slug} delay={i * 80}>
            <CasePreview item={item} flip={i % 2 === 1} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export const WorkbenchTeaser: FC = () => (
  <section aria-labelledby="workbench-title" className="border-t border-rule bg-graphite py-24 md:py-32">
    <div className="lab-container grid gap-12 md:grid-cols-12">
      <RevealOnScroll className="md:col-span-5">
        <p className="eyebrow text-copper">Featured product thinking · {WORKBENCH.kicker}</p>
        <h2 id="workbench-title" className="display mt-5 text-4xl md:text-5xl">
          {WORKBENCH.title}
        </h2>
        <p className="mt-5 font-serif text-2xl italic text-ivory">{WORKBENCH.line}</p>
        <p className="mt-5 leading-relaxed text-ivory-dim">{WORKBENCH.body}</p>
        <p className="mt-4 text-sm leading-relaxed text-mute">
          A side experiment in workflow design, vertical AI, local-first systems and human approval — evidence of how I
          build products, not my primary role.
        </p>
        <Link href={`/work/${WORKBENCH.slug}`} className="btn-line mt-8">
          Walk through the workflow <Arrow />
        </Link>
      </RevealOnScroll>
      <RevealOnScroll delay={150} scale className="md:col-span-6 md:col-start-7">
        <WorkbenchStrip />
      </RevealOnScroll>
    </div>
  </section>
);

export const AboutTeaser: FC = () => (
  <section aria-labelledby="about-title" className="border-t border-rule bg-ink py-24 md:py-32">
    <div className="lab-container grid gap-12 md:grid-cols-12">
      <RevealOnScroll className="md:col-span-3 md:pt-3">
        <p className="eyebrow">About</p>
      </RevealOnScroll>
      <RevealOnScroll delay={80} className="md:col-span-6">
        <h2 id="about-title" className="display text-4xl md:text-5xl">
          I like problems that don&apos;t arrive with a brief.
        </h2>
        <div className="prose-lab mt-7">
          <p>
            I&apos;m <strong>Meet Soni</strong>. I enjoy the ambiguous part of a business problem — working out what is
            really going on, which lever matters, and what the smallest useful test would be — and then building the
            thing that answers it, whether that is a pricing model, a GTM plan, a SQL analysis or an AI workflow.
          </p>
          <p>
            I study Textile Technology at VJTI Mumbai with a minor in IoT, which taught me to think in systems and
            processes. Most of what I know about growth I learned by doing it: in a founder&apos;s office, on data
            teams, and by helping found a consulting community at college.
          </p>
        </div>
        <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:text-lime">
          More about me <Arrow />
        </Link>
      </RevealOnScroll>
      <dl className="grid content-start gap-6 border-t border-rule pt-6 text-sm md:col-span-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        {[
          ["Now", "Founder's Office, SHK Global Ventures"],
          ["Studying", "B.Tech Textile Technology · Minor IoT · VJTI, 2023–27"],
          ["Built", "Synergyst, VJTI's finance & consulting club — founding member"],
          ["Based", "Mumbai, India"],
        ].map(([term, detail]) => (
          <div key={term}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{term}</dt>
            <dd className="mt-1 text-ivory-dim">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export const ContactBlock: FC<{ as?: "h1" | "h2" }> = ({ as: Heading = "h2" }) => (
  <section aria-labelledby="contact-title" className="relative overflow-hidden border-t border-rule bg-graphite py-24 md:py-36">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-lime/10"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-copper/20"
    />
    <div className="lab-container relative">
      <RevealOnScroll>
        <p className="eyebrow">Contact</p>
        <Heading id="contact-title" className="display mt-6 max-w-4xl text-5xl md:text-7xl">
          Have a growth problem worth engineering? <em className="text-lime">Let&apos;s talk.</em>
        </Heading>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-12 inline-block break-all font-serif text-3xl text-ivory underline decoration-lime/50 underline-offset-8 transition-colors hover:decoration-lime md:text-5xl"
        >
          {CONTACT_EMAIL}
        </a>
      </RevealOnScroll>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
        {[
          { label: "Phone", value: CONTACT_PHONE, href: CONTACT_PHONE_HREF, external: false },
          { label: "LinkedIn", value: "in/meetsoni2511", href: LINKEDIN_URL, external: true },
          { label: "GitHub", value: "MTSONI", href: GITHUB_URL, external: true },
        ].map((link) => (
          <li key={link.label} className="bg-ink">
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-between p-6 transition-colors hover:bg-char"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{link.label}</span>
                <span className="mt-1.5 block text-ivory">{link.value}</span>
              </span>
              <Arrow className="text-mute" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
