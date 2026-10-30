# Technical Audit: 3D Developer Portfolio Starter

**Repository:** `MTSONI/3d-portfolio`  
**Base Source:** `HasnainIrfan/3d-portfolio`  
**Target Branch:** `emergent-ready`  
**Date:** October 2026  

---

## 1. Stack & Architecture Baseline

- **Framework:** Next.js 16.2.6 (App Router, Turbopack)
- **UI & Runtime:** React 19.2.4, React DOM 19.2.4, TypeScript 5 (Strict)
- **3D Engine:** Three.js r184, `@react-three/fiber` v9.6.1, `@react-three/drei` v10.7.7
- **Shaders & Post-Processing:** Custom GLSL shaders (spikes, glow orbs) + `postprocessing` v6.39.4 (Bloom)
- **Animation & Math:** `motion` v12.40.0, `maath` v0.10.8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), `@theme` design tokens
- **Compilation Mode:** 100% Static HTML/CSS/JS export (`○ Static`)

---

## 2. 3D Components & Graphics Architecture

### 2.1 Hero Astronaut Scene
- **Location:** `components/sections/hero-scene.tsx` & `components/portfolio/astronaut.tsx`
- **Engine:** R3F Canvas with Suspense fallback (`Loader`).
- **Assets:** Skinned mesh hierarchy loading `/models/astronaut.glb` (381 KB).
- **Animation:** Skinned bone rigging with `@react-three/drei` `useAnimations`, drop entrance physics via `motion/react` spring.
- **Rig / Camera Tracking:** Smooth mouse dampening with `maath/easing` (`easing.damp3`).
- **Optimizations Applied:**
  - Clamped DPR to `[1, 1.5]` desktop and `[1, 1.25]` mobile to eliminate GPU fillrate exhaustion.
  - Set `gl={{ powerPreference: "high-performance", antialias: false, stencil: false, alpha: true }}`.
  - Wired `useReducedMotion()` to pause `Float` oscillations and suppress camera tracking on accessibility requests.
  - Linked `frameloop={active ? "always" : "never"}` via `useSceneActive` IntersectionObserver.

### 2.2 Themed Shader Globe
- **Location:** `components/globe/themed-globe.tsx`, `globe-scene.tsx`, `globe-meshes.tsx`
- **Engine:** Fixed background WebGL canvas positioned at `z-0` behind document content.
- **Geometry:** Procedural spike geometry (`createSpikeGeometry`) generated on the fly.
- **Shaders:** Custom vertex & fragment GLSL shaders (`lib/globe/globe-shaders.ts`) handling dynamic vertex displacement, lighting, pointer proximity repulsion, and breathing pulses.
- **Orbs:** 4 independent orbiting light spheres following spherical trajectories (`ORBITS`).
- **Scroll Pathing:** `useGlobePath` interpolates 3D position, scale, and presence across 6 page sections (`home`, `about`, `services`, `work`, `testimonials`, `contact`).
- **Post-Processing:** BloomEffect with 4x MSAA render target, deferred via idle callback.

### 2.3 2D Interactive Particle Canvas
- **Location:** `components/portfolio/particles.tsx` & `hooks/use-particle-field.ts`
- **Engine:** HTML5 2D canvas with mouse repulsion and spring damping.
- **Lifecycle:** Gated by `useInViewOnce` IntersectionObserver in the Contact section.

### 2.4 Parallax Background
- **Location:** `components/portfolio/parallax-background.tsx`
- **Engine:** 2.5D multi-plane depth effect using `motion/react` transforms across sky, mountains, and planets.
- **Fallback:** When reduced-motion or low-spec hardware is detected, renders static sky and CSS gradient without running motion transforms.

---

## 3. Performance & WebGL Optimizations

1. **Hardware WebGL vs. Software Rasterizer Detection:**
   - `hooks/use-deferred-3d.ts` queries `WEBGL_debug_renderer_info` (`UNMASKED_RENDERER_WEBGL`).
   - SwiftShader, llvmpipe, softpipe, and CPU rasterizers are rejected to prevent 4-7s of Total Blocking Time.
2. **Zero-GPU Static Fallback (`GlobePoster`):**
   - High-fidelity CSS radial gradient poster rendered whenever WebGL is unsupported, deferred, or reduced-motion is requested.
3. **Staged Idle Context Creation:**
   - WebGL contexts are staggered across idle callbacks (`useDeferred3D(0)` for Hero, `useDeferred3D(1)` for Globe) to prevent long tasks during hydration.
4. **Visibility-Based Render Loop Throttling:**
   - Scenes pause automatically when scrolled out of view or when the browser tab is hidden in the background.
5. **Mobile 3D Gating:**
   - Refactored `use-deferred-3d.ts` and created `constants/scene-config.ts` to allow capable mobile devices to render the Hero 3D character while keeping the background on the lightweight CSS `GlobePoster`.

---

## 4. Decoupled Infrastructure

The original repository included heavy backend infrastructure intended for a personal production deployment. All unnecessary server and database code was removed:
- **Removed Supabase Integration:** Dropped `@supabase/supabase-js` and `@supabase/ssr` (pruned 10 packages).
- **Removed Admin Inbox:** Deleted `/admin`, `/admin/login`, and all associated server actions and components.
- **Removed Middleware:** Deleted `proxy.ts`.
- **Removed Database Migrations:** Deleted `supabase/` folder containing migrations and Deno edge functions.
- **Removed Author CV:** Deleted `Hasnain.pdf`.
- **Client-Side Contact Form:** Refactored `hooks/use-contact-form.ts` into a clean, zero-backend submission handler with validation, progress tracking, and extension hooks for Formspree/Resend/Web3Forms.

---

## 5. Dependency & License Audit

- **Code:** Licensed under MIT License.
- **Dependencies Retained:** `@react-three/drei`, `@react-three/fiber`, `maath`, `motion`, `next`, `postprocessing`, `react`, `react-dom`, `react-responsive`, `tailwind-merge`, `three`.
- **3D Model (`astronaut.glb`):** Third-party fan art from Sketchfab under Creative Commons Attribution. Retained in `public/models/` with attribution preserved in `NOTICE`.
- **Security Audit:** Zero secrets, zero API keys, zero private server environment variables.
