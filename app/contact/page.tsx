import { type Metadata } from "next";
import { ContactBlock } from "@/components/home/home-sections";
import { CONTACT_EMAIL } from "@/constants/social-constants";

const DESCRIPTION = `Contact Meet Soni — email ${CONTACT_EMAIL}, phone, LinkedIn or GitHub.`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact · Meet Soni", description: DESCRIPTION, url: "/contact" },
};

const TOPICS = [
  ["Growth & GTM roles", "Strategy, growth, founder's office or GTM roles where I can own an outcome."],
  ["A problem to diagnose", "A metric that doesn't add up, a channel that stalled, an experiment to design."],
  ["Automation", "A workflow that is repetitive enough to automate but important enough to keep a human on."],
];

export default function ContactPage() {
  return (
    <>
      <div className="pt-16 md:pt-[72px]" />
      <ContactBlock as="h1" />
      <section aria-labelledby="topics-title" className="border-t border-rule bg-ink py-20 md:py-24">
        <div className="lab-container grid gap-10 md:grid-cols-12">
          <h2 id="topics-title" className="eyebrow md:col-span-3">Good reasons to write</h2>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3 md:col-span-9">
            {TOPICS.map(([title, body]) => (
              <li key={title} className="bg-graphite p-6">
                <h3 className="text-lg text-ivory">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{body}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-mute md:col-span-9 md:col-start-4">
            No contact form and no tracking: email and phone go straight to me.
          </p>
        </div>
      </section>
    </>
  );
}
