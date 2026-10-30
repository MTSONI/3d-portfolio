import { type FC } from "react";
import { EvidenceTag } from "@/components/ui/evidence-tag";
import {
  AxesDiagram,
  ExperimentFlow,
  JourneyDiagram,
  OpportunityMap,
  PuzzleChart,
} from "@/components/visuals/wispr-visuals";
import {
  CaseHeader,
  CaseSection,
  EvidenceKey,
  Fact,
  FactGrid,
  Figure,
  NextCase,
  PointList,
  Prose,
  SourceList,
} from "./case-kit";

const ACCESSED = "Sources accessed 31 October 2026. Wispr says plan details can change; re-check before relying on any figure.";

const OPTIONS = [
  {
    key: "A",
    name: "Broad B2C acquisition",
    axis: "Funnel stage — more installs, then convert",
    for: "Biggest reach; Wispr's India pricing and UPI already lower the paywall.",
    against: "India already over-indexes on installs. More of the same widens the gap I'm trying to explain.",
    learn: "Slow and expensive to learn from; paid reach muddies who would have come anyway.",
  },
  {
    key: "B",
    name: "High-frequency professionals",
    axis: "Segment — who writes the most",
    for: "Heavy writers gain most from voice; most likely to need Pro.",
    against: "Wispr's CEO says India adoption began with professionals. Recommending it is restating their base.",
    learn: "Hard for me to reach credibly at small scale; a test would mostly measure my network.",
  },
  {
    key: "C",
    name: "Community-led distribution",
    axis: "Channel — how people hear about it",
    for: "Trust transfers from a known introducer; cheap to run; fits hiring for partnerships.",
    against: "'Communities' is a means, not an answer. Which community, introduced by whom?",
    learn: "Fastest to test with a cohort I can actually reach — but the sample will be skewed.",
  },
];

const METRICS = [
  ["Qualified sign-up", "Opted in through the arm's link and confirmed they write daily (messages, notes, email or documents)."],
  ["First successful dictation", "One dictation the participant kept without retyping it, within 48 hours of install."],
  ["Repeat usage", "Dictated on 2+ separate days in week 1."],
  ["Retention", "Dictated on 3+ separate days in week 2 (days 8–14) — the primary metric."],
  ["High-frequency usage", "Dictated on 4+ days in a single week, in at least two different apps."],
  ["Paid-conversion intent", "Chose a plan at the stated India price in a closing question, or asked how to pay. Reported separately; weak signal."],
  ["Cost per activated user", "(Cash spent + hours spent × a stated hourly value) ÷ participants with a first successful dictation."],
];

export const WisprCase: FC = () => (
  <>
    <CaseHeader
      index="01"
      kicker="Independent growth analysis · Wispr Flow India"
      title={
        <>
          Wispr Flow in India: <em className="text-lime">find the users, not just the installs.</em>
        </>
      }
      question="What is the most promising next growth opportunity for Wispr Flow in India, and what is the smallest credible experiment that could validate it?"
      meta={[
        ["Role", "Independent analyst · challenge applicant"],
        ["Type", "Opportunity sizing & experiment design"],
        ["Status", "Experiment proposed — not run"],
        ["Date", "October–November 2026"],
      ]}
      notice={
        <>
          <strong className="font-semibold">Read this first.</strong> This is my own analysis, written as an applicant to
          the Wispr Flow India Growth Challenge. It is not affiliated with or endorsed by Wispr Flow, uses only public
          information, and shows no experiment results — because the experiment has not been run.
        </>
      }
    />

    <section className="border-b border-rule bg-graphite py-12">
      <div className="lab-container grid gap-8 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">How to read the labels</p>
        <div className="md:col-span-9">
          <EvidenceKey kinds={["primary", "third-party", "reported", "model", "hypothesis", "proposed"]} />
        </div>
      </div>
    </section>

    <CaseSection number="01" title="The opportunity: a puzzle in the numbers" aside="Verified public facts first. My reading of them second.">
      <FactGrid cols={4}>
        <Fact value="~14%" label="India's share of Wispr Flow installs, Oct 2025–Apr 2026" kind="third-party" source="Sensor Tower via TechCrunch [1]" />
        <Fact value="~2%" label="India's share of in-app purchase revenue, same period" kind="third-party" source="Sensor Tower via TechCrunch [1]" />
        <Fact value="#2" label="India's rank after the US, in users and revenue" kind="reported" source="CEO Tanay Kothari, TechCrunch [1]" />
        <Fact value="₹400 / ₹320" label="India Pro list price per month: monthly / billed annually" kind="primary" source="wisprflow.ai/india [2]" />
      </FactGrid>

      <Prose className="mt-12">
        <p>
          The headline reads like &ldquo;Indians install but don&apos;t pay.&rdquo; Before accepting that, I adjusted
          for price. India&apos;s annual plan is about ₹320 a month, roughly 28% of the US$12 price [1]. If India paid
          like every other market — same conversion, same plan mix — its expected revenue share would be:
        </p>
      </Prose>
      <div className="mt-6 max-w-3xl overflow-x-auto rounded-sm border border-rule bg-ink p-5 font-mono text-sm text-ivory">
        0.14 × 0.283 ÷ (0.14 × 0.283 + 0.86) ≈ <span className="text-lime">4.4%</span>
        <EvidenceTag kind="model" className="ml-3" />
      </div>
      <Prose className="mt-6">
        <p>
          Observed is about 2%. So <strong>the real gap is roughly 2×, not 7×</strong> — still a gap, but a different
          problem. It could come from lower mobile conversion, more monthly than annual plans, trial and student
          periods, the timing of India pricing changes, or paid plans bought outside the app stores, which app-store
          revenue estimates cannot see. Each is a hypothesis; none is established.
        </p>
      </Prose>
      <Figure className="mt-10" caption="Installs and IAP revenue: Sensor Tower estimates via TechCrunch, 9 May 2026 [1]. Expected share: my calculation, assuming identical conversion and plan mix — an assumption, not a finding.">
        <PuzzleChart />
      </Figure>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-mute">
        Limits: one article, one estimate provider, one seven-month window, no cohort data, and &ldquo;revenue&rdquo; in
        the CEO&apos;s statement is undefined. The point is the direction of the question, not the decimal.
      </p>
    </CaseSection>

    <CaseSection number="02" title="The customer problem behind the gap" tone="graphite" aside="Why voice is harder than it looks — especially in India.">
      <Prose>
        <p>
          Voice wins when someone writes a lot and speaking is socially and technically easy. The CEO says Indian
          adoption began among white-collar professionals such as managers and engineers, and that people are{" "}
          <strong>starting to use it more in personal apps like WhatsApp</strong> [1]. He has also spoken of taking India
          pricing toward ₹10–20 a month [1]. That combination — personal messaging plus price ambition — points beyond
          the professional base.
        </p>
      </Prose>
      <div className="mt-12">
        <PointList
          items={[
            { title: "Speaking aloud", body: "Open offices, shared rooms and public transport make dictation awkward. The habit forms in private before it spreads to work." },
            { title: "Language and accent", body: "Many Indians write in English but think and message in Hinglish. Perceived accuracy on mixed language decides the first impression.", kind: "hypothesis" },
            { title: "Trust and privacy", body: "Voice feels more personal than typing. Wispr lists SOC 2, HIPAA and ISO 27001 badges and says Flow needs an internet connection [2]; users still have to believe it.", kind: "primary" },
            { title: "Switching costs", body: "Fast typists and keyboard voice-typing users already have a 'good enough' habit. Value must show up in the first few uses." },
            { title: "Editing overhead", body: "If cleaning up a dictation takes longer than typing it, users quit. The first dictation has to be keepable." },
            { title: "Competitive alternatives", body: "Typing, built-in keyboard voice input and WhatsApp voice notes are free and familiar. Flow competes with habits more than products." },
          ]}
        />
      </div>
    </CaseSection>

    <CaseSection number="03" title="The obvious options sit on different axes" aside="A segment comparison that compares like with like.">
      <Prose>
        <p>
          The three directions usually proposed — broad B2C, professionals, communities — can&apos;t be ranked against
          each other, because they answer different questions: a <strong>funnel stage</strong>, a{" "}
          <strong>segment</strong> and a <strong>channel</strong>. The useful question takes one choice from each.
        </p>
      </Prose>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
              <th scope="col" className="py-3 pr-4 font-normal">Option</th>
              <th scope="col" className="py-3 pr-4 font-normal">Why it could work</th>
              <th scope="col" className="py-3 pr-4 font-normal">Why it might not</th>
              <th scope="col" className="py-3 font-normal">Cost to learn</th>
            </tr>
          </thead>
          <tbody>
            {OPTIONS.map((option) => (
              <tr key={option.key} className="border-b border-rule align-top">
                <th scope="row" className="py-5 pr-4 font-normal">
                  <span className="font-mono text-lime">{option.key}</span>{" "}
                  <span className="text-ivory">{option.name}</span>
                  <span className="mt-1 block text-xs text-mute">{option.axis}</span>
                </th>
                <td className="py-5 pr-4 leading-relaxed text-ivory-dim">{option.for}</td>
                <td className="py-5 pr-4 leading-relaxed text-ivory-dim">{option.against}</td>
                <td className="py-5 leading-relaxed text-ivory-dim">{option.learn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Figure className="mt-12" caption="My framing: choose a stage to measure (activation), a segment (club members who write daily) and a channel (a trusted introducer). Paid conversion stays a downstream metric.">
        <AxesDiagram />
      </Figure>
    </CaseSection>

    <CaseSection number="04" title="The hypothesis and the segment" tone="graphite" aside="Stated so it can be proven wrong.">
      <div className="max-w-3xl border-l-2 border-lime pl-6">
        <EvidenceTag kind="hypothesis" />
        <p className="display mt-4 text-3xl leading-tight md:text-4xl">
          High-frequency writers who already message in Hinglish will reach weekly dictation faster — and at lower cost
          per active user — when a trusted community lead introduces Wispr Flow than when they find the same link on
          their own.
        </p>
      </div>
      <Prose className="mt-10">
        <p>
          <strong>Starting segment:</strong> members of college consulting and finance clubs. They write constantly —
          case decks, emails, notes and group chats — move between English and Hinglish, and become the early-career
          analysts and consultants who later pay for productivity tools. I&apos;m a founding member of such a club at
          VJTI, so I can run the test honestly and quickly.
        </p>
        <p>
          <strong>The trade-off I&apos;m accepting:</strong> students are not Wispr&apos;s paying professionals, and my
          own club is a biased sample. The test is designed to learn about the <em>introducer mechanism</em>, which
          transfers to other communities, not to size the student market.
        </p>
      </Prose>
      <Figure className="mt-12" caption="Opportunity map — my judgement of writing intensity and of how reachable each group is for me through a trusted introducer. A hypothesis, not data.">
        <OpportunityMap />
      </Figure>
    </CaseSection>

    <CaseSection number="05" title="The acquisition mechanism: a trusted introducer" aside="Trust is the scarce input; reach is not.">
      <Prose>
        <p>
          A community lead runs a 15-minute live session: three real tasks dictated on screen, including one in
          Hinglish and one correction. The ask is small — install now and try the same three tasks today. Trust moves
          from a person the member already knows, and the first dictation happens with help, not alone.
        </p>
        <p>
          <strong>What I am not proposing:</strong> influencer or affiliate campaigns. I haven&apos;t reviewed
          Wispr&apos;s current referral or affiliate terms, and paid reach would blur the one thing this test measures —
          whether introduction changes activation.
        </p>
      </Prose>
      <div className="mt-12">
        <JourneyDiagram />
        <p className="mt-4 text-xs text-mute">Customer journey — the bar under each step narrows as the expected cohort shrinks. Barriers are my hypotheses.</p>
      </div>
    </CaseSection>

    <CaseSection number="06" title="The smallest credible experiment" tone="graphite" aside={<><EvidenceTag kind="proposed" /><p className="mt-3">Designed, not run. No results exist.</p></>}>
      <Figure caption="Two arms drawn from the same population, identical onboarding, read on day 14.">
        <ExperimentFlow />
      </Figure>
      <div className="mt-12">
        <PointList
          items={[
            { title: "Who", body: "Opt-in members of 1–2 college consulting/finance clubs who write daily; laptop or phone. Target 25–40 qualified sign-ups per arm." },
            { title: "How to recruit", body: "Arm 1: a lead-run 15-minute session. Arm 2: the same link and message posted to a comparable cohort's group. Use different batches or campuses to limit cross-talk." },
            { title: "Onboarding", body: "Three identical starter tasks: reply to a WhatsApp message in Hinglish, draft a short email, clean up meeting notes. One short consent form." },
            { title: "Behaviour to observe", body: "Days with dictation, apps used, and whether the first dictation was kept — self-reported in two 1-minute check-ins plus an optional usage screenshot." },
            { title: "Positive signal", body: "Arm 1 week-2 retention at least 2× Arm 2, and at least 30% of Arm 1 installers active on 3+ days in week 2. Thresholds are my pre-registered choices." },
            { title: "Invalidation", body: "Arm 1 retention within 1.2× of Arm 2, or under 15% — the introducer adds little, and community-led distribution is not the lever I think it is." },
          ]}
        />
      </div>
      <Prose className="mt-12">
        <p>
          <strong>Honest about power:</strong> with 25–40 people per arm, only large differences are readable. Three
          active out of ten has a 95% interval of roughly 11–60% <EvidenceTag kind="model" />. The pilot can tell me
          whether the introducer effect is big enough to be worth a proper test — not what India&apos;s conversion rate
          is. Data handling: opt-in only, counts not identities, no dictation content collected, raw sheet deleted after
          the read-out.
        </p>
      </Prose>
    </CaseSection>

    <CaseSection number="07" title="Measurement framework" aside="Definitions before data, so the result can't be argued afterwards.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
              <th scope="col" className="py-3 pr-6 font-normal">Metric</th>
              <th scope="col" className="py-3 font-normal">Definition</th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map(([metric, definition], i) => (
              <tr key={metric} className="border-b border-rule align-top">
                <th scope="row" className="py-4 pr-6 font-normal text-ivory">
                  <span className="mr-3 font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                  {metric}
                </th>
                <td className="py-4 leading-relaxed text-ivory-dim">{definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">
        No numerical outcomes are shown because none exist. Week-2 retention is the decision metric; paid intent is
        recorded but not used to decide, because stated willingness to pay is a weak signal.
      </p>
    </CaseSection>

    <CaseSection number="08" title="Risks and alternative explanations" tone="graphite" aside="How a good-looking result could still be wrong.">
      <PointList
        items={[
          { title: "Novelty", body: "A live demo creates excitement that fades. Week 2, not week 1, is the decision window for that reason." },
          { title: "Social desirability", body: "Members may use it to please the lead. Self-reports are paired with usage screenshots where offered." },
          { title: "Selection", body: "People who attend a session are already more engaged. Arms come from comparable cohorts, and I report sign-up rates, not just retention." },
          { title: "Trial masking", body: "During a trial nobody hits a paywall, so usage says little about payment. That is why paid intent is a separate, downstream read." },
          { title: "Device mix", body: "Students skew to phones, where caps, flows and pricing differ. Results are reported by device." },
          { title: "Curiosity vs value", body: "Curiosity shows as many first dictations and few repeats. Value shows as unprompted use in a second app in week 2." },
        ]}
      />
    </CaseSection>

    <CaseSection number="09" title="What would change my mind" aside="And what I'd ask Wispr for first.">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="eyebrow text-ivory">Evidence that would change my view</h3>
          <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ivory-dim">
            <li>Self-serve users retain as well as introduced users — trust isn&apos;t the bottleneck; first-use quality is.</li>
            <li>Hinglish dictations are retyped more often than English ones — accuracy, not distribution, is the lever.</li>
            <li>Most India revenue turns out to come from desktop purchases outside the stores — the 2% figure overstates the gap.</li>
            <li>Week-2 users stay in personal apps and never reach work writing — the professional upgrade path is weaker than assumed.</li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-ivory">Data I&apos;d request from Wispr</h3>
          <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ivory-dim">
            <li>Activation and week-2 retention by acquisition source in India.</li>
            <li>Desktop vs mobile mix by channel, and where India purchases happen.</li>
            <li>Retention by first-use app (messaging vs email vs documents).</li>
            <li>Correction and retype rates for English vs mixed-language dictation.</li>
          </ul>
        </div>
      </div>
    </CaseSection>

    <section className="border-b border-rule bg-graphite py-16">
      <div className="lab-container grid gap-8 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">Sources</p>
        <div className="md:col-span-9">
          <SourceList
            accessed={ACCESSED}
            items={[
              {
                label: "TechCrunch — “Voice AI in India is hard — Wispr Flow is betting on it anyway”, 9 May 2026",
                href: "https://techcrunch.com/2026/05/09/voice-ai-in-india-is-hard-wispr-flow-is-betting-on-it-anyway/",
                note: "Sensor Tower install and revenue shares; CEO statements on market rank, early adopters, personal-app use and price ambition; India annual price.",
              },
              {
                label: "Wispr Flow India page",
                href: "https://wisprflow.ai/india",
                note: "₹400 monthly and ₹320 billed-annually Pro prices, UPI and card payments, security badges, internet requirement.",
              },
              {
                label: "Wispr Flow India Growth Challenge page",
                href: "https://wispr-seven-day-challenge.wispr-flow-5934.chatgpt.site/",
                note: "Challenge brief and criteria that prompted this analysis.",
              },
            ]}
          />
        </div>
      </div>
    </section>

    <NextCase slug="wispr-flow-india-growth" />
  </>
);
