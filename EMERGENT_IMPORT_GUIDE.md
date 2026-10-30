# Emergent Import Guide: 3D Developer Portfolio Starter

This guide provides technical specifications, component indices, and operational guidance for AI coding agents and human engineers importing this repository into **Emergent** or building a bespoke 3D portfolio on top of it.

---

## 1. Executive Overview & Capabilities

This repository is a production-ready, high-performance 3D developer portfolio starter built on:
- **Framework:** Next.js 16 (App Router with Turbopack)
- **UI Engine:** React 19 + TypeScript (Strict mode)
- **3D Graphics:** Three.js (r184) + React Three Fiber (v9) + `@react-three/drei` (v10)
- **Shaders & Post-Processing:** Custom GLSL shaders + `postprocessing` bloom pass
- **Animation:** `motion` (v12) + `maath/easing` + Tailwind CSS v4 CSS keyframes
- **Styling:** Tailwind CSS v4 with modern `@theme` design tokens
- **Architecture:** 100% self-contained static architecture (Zero external databases, zero paid third-party dependencies, zero secrets required to run or build).

---

## 2. What This Repository Already Provides

1. **Self-Contained Static Architecture:**
   - 100% static compilation (`○ Static`) during `next build`.
   - Deployable anywhere: Vercel, Netlify, Cloudflare Pages, GitHub Pages, AWS S3/CloudFront, or local containers.
2. **Interactive Hero 3D Scene:**
   - High-performance 3D rigged character with smooth floating motion and cursor-responsive camera tilt.
3. **Interactive Background Shader Globe:**
   - Procedurally generated spike sphere with 4 orbiting light orbs.
   - Passive scroll interpolation moving the globe across 6 section-specific 3D coordinates.
   - Mouse hover proximity repulsion and breathing shader pulses.
   - Dynamic bloom post-processing with 4x MSAA render target.
4. **Resilient Static & Reduced-Motion Fallbacks:**
   - Automatic hardware WebGL capability detection (SwiftShader and CPU rasterizers are rejected in favor of high-performance CSS fallbacks).
   - Zero-cost painted CSS gradient poster fallback (`GlobePoster`) for devices without WebGL.
   - Full accessibility compliance with `prefers-reduced-motion: reduce`.
5. **Interactive Portfolio Sections:**
   - Multi-layer 2.5D parallax hero landscape.
   - About section with dual infinite tech-stack marquee tickers.
   - Pinned horizontal showcase for desktop (`lg+`) and stacked vertical cards for mobile.
   - Interactive project details modal.
   - Services sticky cards with 3D stacking transitions.
   - Vertical experience timeline with scroll-linked glowing beam.
   - Testimonial review cards.
   - Contact form with client-side validation, completion progress bar, interactive radial mouse glow, and 2D particle canvas background.
   - Full SEO metadata: Open Graph, Twitter cards, JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`, `ProfessionalService`), sitemap generator, and robots.txt.

---

## 3. Available 3D Components & Architecture

| Component | Path | Responsibility & Features |
| :--- | :--- | :--- |
| **`HeroScene`** | `components/sections/hero-scene.tsx` | Hosts the R3F `<Canvas>` for the hero character. Clamps DPR (`[1, 1.25]` mobile, `[1, 1.5]` desktop), throttles frameloop via `useSceneActive` when scrolled out of view, and respects reduced-motion. |
| **`Astronaut`** | `components/portfolio/astronaut.tsx` | Skinned mesh hierarchy loading `/models/astronaut.glb`. Handles bone rigging, skeletal animations via `useAnimations`, and spring entrance physics. |
| **`ThemedGlobe`** | `components/globe/themed-globe.tsx` | Fixed full-screen background `<Canvas>`. Power-efficient GL settings, transparent clearColor, and frameloop throttling. |
| **`GlobeScene`** | `components/globe/globe-scene.tsx` | Manages procedural spike geometry (`createSpikeGeometry`), 4 orbiting light spheres, passive scroll yaw, camera view offset matrix, and pointer repulsion. |
| **`GlobeMeshes`** | `components/globe/globe-meshes.tsx` | Mesh composition applying custom GLSL shaders (`lib/globe/globe-shaders.ts`) to procedural spike geometry and orbs. |
| **`GlobePoster`** | `components/globe/globe-poster.tsx` | Zero-GPU CSS radial gradient painted fallback rendered when WebGL is unaccelerated, deferred, or reduced-motion is requested. |
| **`Particles`** | `components/portfolio/particles.tsx` | 2D HTML5 canvas particle field with smooth mouse repulsion and spring damping, lazy-loaded via IntersectionObserver in the contact section. |
| **`ParallaxBackground`** | `components/portfolio/parallax-background.tsx` | 2.5D multi-plane depth effect animating sky, mountains, and planets via composited transforms (`useScroll`, `useTransform`). |

---

## 4. How to Run and Build Locally

### Prerequisites
- Node.js 20.9+ or Node.js 22/24 LTS
- npm, pnpm, yarn, or bun

### Commands
```bash
# Install dependencies
npm install

# Start local development server with Turbopack (http://localhost:3000)
npm run dev

# Run static analysis and linting (0 errors, 0 warnings)
npm run lint

# Compile optimized static production build
npm run build

# Preview production build locally
npm run start
```

### Environment Variables
Zero environment variables are required to run, build, or deploy. Optional overrides:
```env
# Optional: Production site URL (drives canonical links, sitemap, and Open Graph metadata)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Google Search Console verification token
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

---

## 5. Centralized Customization Guide

All visual identity, copy, links, and 3D tuning are centralized in typed files under `constants/`. **Do not rewrite 3D or layout components to change content.**

### 5.1 3D Scene & WebGL Settings (`constants/scene-config.ts`)
```typescript
export const HERO_3D_CONFIG = {
  modelPath: "/models/astronaut.glb", // Swap with your own .glb model
  cameraPosition: [0, 1, 3],
  desktopScale: 0.3,
  desktopPosition: [1.3, -1, 0],
  mobileScale: 0.23,
  mobilePosition: [0, -1.5, 0],
  dprDesktop: [1, 1.5],
  dprMobile: [1, 1.25],
};

export const SCENE_CAPABILITY_CONFIG = {
  enableHeroOnMobile: true,
  enableGlobeOnMobile: false, // Set to true to run WebGL globe on mobile screens
};
```

### 5.2 Theme Colors & Design Tokens (`app/globals.css`)
Edit the `@theme` block in `app/globals.css`:
```css
@theme {
  --color-primary: #030412;
  --color-midnight: #06091f;
  --color-aqua: #33c2cc;
  --color-royal: #5c33cc;
  --color-coral: #ea4884;
  --color-mint: #57db96;
}
```

### 5.3 Globe Shader Colors (`constants/globe-constants.ts`)
```typescript
export const THEME = {
  deep: "#1f1e39",
  base: "#6a3fd6",
  hot: "#ea4884",
  spark: "#33c2cc",
  rim: "#33c2cc",
  core: "#08071a",
};
```

### 5.4 Personal Identity & Hero (`constants/hero-constants.ts`)
```typescript
export const HERO_NAME = "Your Name";
export const HERO_ROLE = "Your Professional Title";
export const HERO_LOCATION = "City, Country";
export const HERO_TAGLINE = "Your one-sentence positioning statement.";
export const FLIP_WORDS = ["Creative", "Performant", "Immersive"];
```

### 5.5 Projects & Case Studies (`constants/projects-constants.ts`)
Edit `MY_PROJECTS` array. Each project specifies title, category, description, subDescription bullet points, project link, and tech stack tags.

### 5.6 Services (`constants/services-constants.ts`)
Edit `SERVICES` array (title, description, bullets, icon SVG path).

### 5.7 Experience Timeline (`constants/experience-constants.ts`)
Edit `EXPERIENCES` array (title, job, date, bullet points).

### 5.8 Testimonials (`constants/reviews-constants.ts`)
Edit `REVIEWS` array (name, role, body, accent gradient).

### 5.9 Socials & Email (`constants/social-constants.ts`)
Edit `MY_SOCIALS` and `CONTACT_EMAIL`.

---

## 6. What Emergent Should AVOID Rebuilding

When using this starter in Emergent to build a user's portfolio, **DO NOT REBUILD OR DUPLICATE**:
1. ❌ **Do not install a secondary 3D engine or canvas:** R3F, Three.js, and Drei are already wired with frameloop gating, dynamic imports, and canvas Suspense.
2. ❌ **Do not rewrite the scroll-linked globe pathing:** `useGlobePath` already calculates smooth cubic hermite interpolation across the 6 page sections.
3. ❌ **Do not re-implement horizontal pinning:** `PinnedShowcase` uses native sticky positioning and Motion transforms without requiring heavy scroll libraries like Locomotive or GSAP.
4. ❌ **Do not add database or authentication servers:** The template is intentionally static. If form lead capture is needed, plug a third-party serverless webhook (e.g. Formspree, Resend, EmailJS) into `hooks/use-contact-form.ts` rather than provisioning a database.
5. ❌ **Do not bypass the stacking context:** `div#site-content` in `components/portfolio/home-page.tsx` must keep `relative z-10` so that the fixed background globe at `z-0` stays behind text content.

---

## 7. Remaining Limitations & Edge Cases

1. **Custom GLTF/GLB Bone Hierarchy:**
   - The included `Astronaut` component maps to the specific bone names of `public/models/astronaut.glb` (`metarig_rootJoint`, `Cube001_0`, etc.).
   - If importing a completely different 3D model, create a new R3F component or use `@react-three/drei`'s `useGLTF` to inspect and bind the new model's node structure.
2. **WebGL Context Limits on Low-End Mobile Devices:**
   - By default, `SCENE_CAPABILITY_CONFIG.enableGlobeOnMobile` is `false`, displaying the lightweight `GlobePoster` on mobile while running the 3D character in the Hero. If enabling the globe on mobile, test performance across target mobile hardware.
3. **Third-Party Model Attribution:**
   - The bundled astronaut model is third-party fan art from Sketchfab licensed under CC Attribution. When replacing or keeping this asset, maintain attribution in `NOTICE` or replace it with a royalty-free or proprietary `.glb` model.
