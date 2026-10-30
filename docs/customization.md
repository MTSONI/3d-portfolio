# Customization Guide

This starter is organized so you can customize visual identity, copy, 3D models, and colors in minutes without editing internal Three.js or layout components.

---

## 1. Content: The `constants/` Folder

Every string and data item on the site lives in `constants/`, typed against `types/`:

| Export | File | Component Target |
| :--- | :--- | :--- |
| `HERO_NAME`, `HERO_ROLE`, `HERO_LOCATION`, `HERO_TAGLINE` | `hero-constants.ts` | Headline block and metadata |
| `FLIP_WORDS` | `hero-constants.ts` | Animated word rotation in Hero |
| `STATS` | `hero-constants.ts` | Stat metrics strip |
| `MY_PROJECTS` | `projects-constants.ts` | Pinned showcase and modal cards |
| `SERVICES` | `services-constants.ts` | Stacking service cards |
| `EXPERIENCES` | `experience-constants.ts` | Experience timeline |
| `REVIEWS` | `reviews-constants.ts` | Testimonial review cards |
| `SKILL_CHIPS` | `skills-constants.ts` | Infinite marquee skill tickers |
| `MY_SOCIALS`, `CONTACT_EMAIL` | `social-constants.ts` | Navbar, footer, and contact links |
| `NAV_ITEMS` | `navigation-constants.ts` | Header navigation and anchor hashes |

---

## 2. 3D Scene Tuning: `constants/scene-config.ts`

To adjust the 3D hero model, scale, camera, or mobile rendering:

```typescript
export const HERO_3D_CONFIG = {
  modelPath: "/models/astronaut.glb", // Place your .glb in public/models/
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
  enableGlobeOnMobile: false, // Set to true to enable WebGL globe on mobile screens
};
```

---

## 3. Colors: `app/globals.css` & `constants/globe-constants.ts`

### Tailwind CSS v4 Theme
Edit the `@theme` block in `app/globals.css`:
```css
@theme {
  --color-primary: #030412;   /* page background */
  --color-midnight: #06091f;
  --color-navy: #161a31;
  --color-indigo: #1f1e39;
  --color-storm: #282b4b;     /* borders, dividers */
  --color-aqua: #33c2cc;      /* accent 1 */
  --color-mint: #57db96;
  --color-royal: #5c33cc;     /* primary brand purple */
  --color-lavender: #7a57db;
  --color-coral: #ea4884;     /* hot accent */
}
```

### Globe Shader Palette
Edit `THEME` in `constants/globe-constants.ts`:
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

---

## 4. Swapping the 3D Model

1. Place your `.glb` file inside `public/models/`.
2. Update `HERO_3D_CONFIG.modelPath` in `constants/scene-config.ts`.
3. If your model uses custom bones or animations, update `components/portfolio/astronaut.tsx`.
4. Adjust scale and position in `constants/scene-config.ts`.
