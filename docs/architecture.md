# Architecture

How the pieces fit together across React Three Fiber, Next.js, and the static performance pipeline.

---

## 1. Project Structure

Organized by *kind*, so anything you want to change has one obvious home. No file exceeds ~250 lines.

```
app/
  layout.tsx              Root layout, fonts, full SEO metadata, JSON-LD
  page.tsx                Client root rendering <HomePage />
  sitemap.ts robots.ts    Generated from your own content
  manifest.ts icon.tsx    PWA manifest and generated favicons
  globals.css             Tailwind v4 @theme, custom keyframes & glass styles

components/
  sections/               Thin page sections, composition only (Hero, About, Services, ...)
  globe/                  WebGL shader globe, meshes, scrim, and poster fallback
  projects/               Pinned showcase and responsive vertical project stack
  contact/                Client-side contact form, floating fields, budget selector
  services/               Stacking service cards with 3D scale transforms
  about/                  Stats, bio, and infinite marquee tickers
  navbar/                 Responsive navigation header and mobile menu
  seo/                    JSON-LD structured data generator
  ui/                     Cross-section primitives
  portfolio/              Shared components: Astronaut, Particles, Timeline, Parallax, Loader

constants/                All copy, data and tuning, no strings in components
  scene-config.ts         Central 3D model, scale, camera & mobile capability config
  globe-constants.ts      GLSL shader uniforms, geometry counts, section pathing
  hero-constants.ts       Name, title, tagline, rotating words, stats
  projects-constants.ts   Projects data and spring animation settings
  ...

types/                    TypeScript interfaces, one file per domain
hooks/                    Reusable behavior (scroll, pointer, in-view, 3D deferral)
helpers/                  Pure functions (math, formatting, geometry, scroll)
animations/               Motion variants and springs
lib/globe/                GLSL vertex and fragment shader sources
public/models/            Bundled 3D GLTF/GLB models
public/assets/            Background textures, logos, and icons
```

---

## 2. The Render Path

```
app/page.tsx  →  <HomePage />  (client)
                   ├─ <PageLoader />        CSS-driven entrance transition
                   ├─ <GlobeLayer />        WebGL backdrop (stage 1) or <GlobePoster />
                   └─ <div class="relative z-10">
                        Navbar · Hero (stage 0) · About · Services · Projects
                        Experiences · Testimonial · Contact · Footer
```

`Hero` and `ThemedGlobe` are dynamically imported with `{ ssr: false }`. Both mount a `<Canvas>`, and WebGL has no server equivalent.

**The `z-10` wrapper is load-bearing.** The globe renders at `z-0` behind everything. Sections are `relative` with no `z-index` of their own; lifting the page content into its own stacking context pins the globe cleanly behind it.

---

## 3. Performance Budget & WebGL Optimization

1. **Hardware Detection:** `hasHardwareWebGL()` inspects `UNMASKED_RENDERER_WEBGL` to detect and bypass SwiftShader or software CPU rasterizers, serving high-performance CSS fallbacks instead.
2. **Device Pixel Ratio (DPR) Clamping:** Both `HeroScene` and `ThemedGlobe` clamp DPR to `[1, 1.5]` (or `[1, 1.25]` on mobile), preventing high-density Retina displays (3x) from burning fillrate.
3. **Visibility-Throttled Frameloop:** `hooks/use-scene-active.ts` feeds `<Canvas frameloop={active ? "always" : "never"}>`. When scrolled off-screen or when the browser tab is hidden, WebGL stops rendering entirely.
4. **Staged Idle Unlocking:** `hooks/use-deferred-3d.ts` staggers context creation: Stage 0 (Hero) claims the first idle callback, Stage 1 (Globe) claims the second, preventing Long Tasks during initial hydration.
5. **Composited CSS Over JS Loops:** Infinite animations (e.g., `.scroll-hint-sweep`, `.marquee`) run via compositor keyframes rather than `requestAnimationFrame` timers.
6. **Reduced-Motion Support:** Full compliance with `prefers-reduced-motion: reduce`. Floats, tilts, and canvas transforms are automatically suppressed or paused.
