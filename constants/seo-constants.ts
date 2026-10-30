import { HERO_LOCATION, HERO_NAME, HERO_ROLE } from "./hero-constants";
import { CONTACT_EMAIL, MY_SOCIALS } from "./social-constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = `${HERO_NAME} | ${HERO_ROLE}`;

export const SITE_TITLE = `${HERO_NAME} | ${HERO_ROLE}`;

export const SITE_DESCRIPTION =
  "Creative 3D developer portfolio starter built with React, Next.js, Three.js and Tailwind CSS.";

export const SITE_TAGLINE =
  "High-performance 3D web experiences built with React, Next.js and Three.js.";

export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = `${HERO_NAME}, ${HERO_ROLE} portfolio`;
export const OG_LOCALE = "en_US";

export const OG_IMAGES = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT,
  },
];

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const SITE_KEYWORDS = [
  HERO_NAME,
  "Software Engineer",
  "Senior Software Engineer",
  "Full Stack Developer",
  "Next.js Developer",
  "React Developer",
  "Three.js Developer",
  "WebGL Developer",
  "Frontend Developer",
  "Web Developer Portfolio",
  "3D Portfolio",
  HERO_LOCATION,
  "Remote Developer",
];

export const HOME_TITLE = `${HERO_NAME} | ${HERO_ROLE} & Creative Developer`;

export const HOME_DESCRIPTION =
  "Creative developer portfolio starter with interactive 3D WebGL scenes, smooth scroll transitions, and modern React 19 architecture.";

export const SITE_SECTIONS = [
  {
    name: "Home",
    hash: "#home",
    description: `${HERO_NAME}, ${HERO_ROLE} building scalable web and 3D experiences.`,
  },
  {
    name: "About",
    hash: "#about",
    description: `Background, stack and technical skills of ${HERO_NAME}.`,
  },
  {
    name: "Services",
    hash: "#services",
    description:
      "Web applications, interactive 3D experiences, modern frontends, and technical consulting.",
  },
  {
    name: "Work",
    hash: "#work",
    description:
      "Selected projects and case studies built with React, Next.js, and Three.js.",
  },
  {
    name: "Testimonials",
    hash: "#testimonials",
    description: `What clients and teammates say about working with ${HERO_NAME}.`,
  },
  {
    name: "Contact",
    hash: "#contact",
    description: `Get in touch with ${HERO_NAME} for projects and collaborations.`,
  },
] as const;

export const SOCIAL_PROFILES = MY_SOCIALS.map((social) => social.href);

export const CONTACT_POINT_EMAIL = CONTACT_EMAIL;
