<div align="center">

# 3D Developer Portfolio Starter

**A high-performance, production-ready 3D developer portfolio starter.** Built with Next.js 16, React 19, Three.js, React Three Fiber, Motion, and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)

</div>

---

## Highlights

- **Interactive 3D Hero:** Rigged 3D astronaut character with smooth floating physics and cursor-responsive camera rig powered by React Three Fiber and Drei.
- **Dynamic Shader Globe:** Custom GLSL spike mesh and orbiting light spheres that travel across 6 page sections in sync with user scrolling.
- **Hardware-Aware Performance:** Automatic WebGL capability detection, device pixel ratio clamping, frameloop throttling, and zero-GPU static CSS poster fallbacks.
- **Scroll & UI Animations:** Pinned horizontal showcase on desktop, 2.5D parallax hero landscape, infinite marquee skill tickers, and interactive contact particle field.
- **100% Static & Self-Contained:** Zero external databases, zero authentication servers, zero paid third-party dependencies, and zero secrets required to build or run.
- **Production SEO Out of the Box:** Open Graph, Twitter cards, JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`, `ProfessionalService`), automated sitemap, and robots.txt.
- **Emergent Ready:** Cleanly modularized and documented in [`EMERGENT_IMPORT_GUIDE.md`](EMERGENT_IMPORT_GUIDE.md) for instant import and customization by AI coding agents.

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/MTSONI/3d-portfolio.git
cd 3d-portfolio
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test

```bash
# Type check and lint (0 errors, 0 warnings)
npm run lint

# Compile optimized static production build
npm run build

# Preview production build locally
npm run start
```

---

## Customization

All copy, project data, social links, theme colors, and 3D parameters live in typed files under `constants/`. You do not need to modify component code to personalize the portfolio.

| Domain | File | Purpose |
| :--- | :--- | :--- |
| **3D Scene Config** | `constants/scene-config.ts` | 3D model paths, camera coordinates, scale, and mobile gating |
| **Hero & Identity** | `constants/hero-constants.ts` | Name, title, location, hero tagline, and metrics |
| **Globe Shaders** | `constants/globe-constants.ts` | Shader colors, spike geometry counts, and section pathing |
| **Projects** | `constants/projects-constants.ts` | Case studies, tags, project links, and screenshots |
| **Services** | `constants/services-constants.ts` | Service offerings, descriptions, and bullet points |
| **Experience** | `constants/experience-constants.ts` | Work history and milestones |
| **Testimonials** | `constants/reviews-constants.ts` | Client recommendations and quotes |
| **Skills & Tech** | `constants/skills-constants.ts` | Marquee skill items and category pills |
| **Socials & Email** | `constants/social-constants.ts` | Social media URLs and contact email |
| **Theme Colors** | `app/globals.css` | Tailwind v4 `@theme` design tokens and color palette |

For complete architectural details and Emergent instructions, refer to [`EMERGENT_IMPORT_GUIDE.md`](EMERGENT_IMPORT_GUIDE.md).

---

## Deployment

Because this starter compiles to 100% static output, you can deploy it to any static hosting platform with zero configuration:

- **Vercel:** Import repository and click Deploy.
- **Netlify:** Build command: `npm run build`, Publish directory: `.next`.
- **Cloudflare Pages / GitHub Pages / AWS S3:** Standard static Next.js deployment.

---

## Credits & Licensing

- **Code:** Licensed under [MIT](LICENSE).
- **3D Model (`public/models/astronaut.glb`):** Third-party fan art sourced from Sketchfab under Creative Commons Attribution (see [`NOTICE`](NOTICE)).
- **Icons & Logos:** Brand marks belong to their respective owners.
