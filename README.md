# The Growth Lab — Meet Soni

Personal growth strategy and execution portfolio: *"I turn complex business problems into measurable growth
systems."* Built with Next.js 16, React 19, React Three Fiber and Tailwind CSS v4. Fully static — no backend,
no database, no analytics, no secrets.

## Routes

| Route | Content |
| --- | --- |
| `/` | Growth Engine 3D hero, capabilities, interactive method, selected work, Workbench teaser, about, contact |
| `/work` | All case studies, the Workbench experiment, other analysis work |
| `/work/wispr-flow-india-growth` | Flagship: independent Wispr Flow India growth analysis and proposed experiment |
| `/work/shk-global-ventures` | Founder's Office: GTM, pricing, pilot, fundraising |
| `/work/ai-automation` | WhatsApp agent, prospecting agent, AI Chief of Staff, n8n |
| `/work/bluestock-financial-intelligence` | Financial intelligence platform architecture |
| `/work/quick-commerce-unit-economics` | Tier-1 vs Tier-2 quick-commerce research |
| `/work/myntra-profitability-analysis` | Synthetic-data returns and assortment analysis |
| `/work/legal-document-workbench` | Product experiment with a simulated walkthrough |
| `/about`, `/contact` | Profile and direct contact links |

## Evidence labels

Every figure on the site carries a label: Primary source, Third-party estimate, Reported, Modelled, Synthetic
data, Hypothesis or Proposed. The internal register is [`docs/CLAIMS_AUDIT.md`](docs/CLAIMS_AUDIT.md) — read it
before changing any number.

## Where things live

| Area | Path |
| --- | --- |
| Brand, navigation, capabilities, method copy | `constants/site-constants.ts` |
| Case-study index (cards, evidence) | `constants/work-constants.ts` |
| Contact details | `constants/social-constants.ts` |
| Case-study pages | `components/cases/` |
| Diagrams and visuals (SVG) | `components/visuals/` |
| Growth Engine scene | `components/growth-engine/`, `constants/growth-engine-constants.ts` |
| 3D gating (mobile poster, reduced motion, WebGL) | `constants/scene-config.ts`, `hooks/use-deferred-3d.ts` |
| Design tokens | `app/globals.css` |

The live Growth Engine runs on desktops with hardware WebGL. Phones, reduced-motion users and software
renderers get the static poster (`public/assets/growth-engine/`). Preview a single beat in development with
`/?engine-t=1.5&engine-converge=0.5`.

## Develop

```bash
npm install
npm run dev
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, the sitemap and Open Graph tags are
absolute.

On Windows, Turbopack fails on very long folder paths. Either clone to a short path (for example `C:\code`) or
run `npx next dev --webpack` / `npx next build --webpack`.
