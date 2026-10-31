import { type FC } from "react";
import { CapabilityVisual } from "@/components/visuals/capability-visuals";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { CAPABILITIES, SUPPORTING_STATEMENT } from "@/constants/site-constants";

const ACCENT: Record<string, string> = {
  strategy: "text-ivory",
  gtm: "text-copper",
  automation: "text-lime",
  execution: "text-ivory",
};

export const CapabilitiesSection: FC = () => (
  <section aria-labelledby="capabilities-title" className="border-t border-rule bg-ink py-24 md:py-36">
    <div className="lab-container">
      <SectionHeading
        id="capabilities-title"
        eyebrow="What I do"
        title={
          <>
            Four disciplines, <em className="text-ivory-dim">one system.</em>
          </>
        }
        intro={SUPPORTING_STATEMENT}
      />

      <ol className="mt-20 divide-y divide-rule border-y border-rule">
        {CAPABILITIES.map((capability, i) => (
          <li key={capability.id} className="grid items-center gap-10 py-14 md:grid-cols-12 md:py-16">
            <RevealOnScroll className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-sm text-mute">{capability.index}</span>
                <h3 className={`display text-5xl md:text-6xl ${ACCENT[capability.id]}`}>
                  {capability.title}
                </h3>
              </div>
              <p className="mt-6 text-xl text-ivory">{capability.line}</p>
              <p className="mt-3 max-w-lg leading-relaxed text-ivory-dim">{capability.body}</p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${capability.title} activities`}>
                {capability.verbs.map((verb) => (
                  <li
                    key={verb}
                    className="rounded-full border border-rule px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ivory-dim"
                  >
                    {verb}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll
              delay={120}
              scale
              className={`aspect-[32/22] rounded-sm border border-rule bg-graphite p-5 md:col-span-5 ${
                i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"
              }`}
            >
              <CapabilityVisual id={capability.id} />
            </RevealOnScroll>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
