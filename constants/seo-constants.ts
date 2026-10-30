import { HERO_NAME } from "./hero-constants";
import { BRAND, POSITIONING } from "./site-constants";
import { CONTACT_EMAIL, MY_SOCIALS } from "./social-constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = `${BRAND} — ${HERO_NAME}`;

export const SITE_TITLE = `${HERO_NAME} · ${BRAND}`;

export const SITE_DESCRIPTION = `${POSITIONING} Strategy, go-to-market, AI automation and execution — case studies by ${HERO_NAME}.`;

export const OG_LOCALE = "en_IN";

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const SITE_KEYWORDS = [
  HERO_NAME,
  BRAND,
  "growth strategy",
  "go-to-market",
  "AI automation",
  "unit economics",
  "growth experiments",
  "Wispr Flow India",
  "VJTI",
  "Mumbai",
];

export const SOCIAL_PROFILES = MY_SOCIALS.map((social) => social.href);

export const CONTACT_POINT_EMAIL = CONTACT_EMAIL;
