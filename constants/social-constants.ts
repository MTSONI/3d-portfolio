/**
 * Contact details — the single source for every email, phone and profile link.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/in/meetsoni2511/";

export const GITHUB_URL = "https://github.com/MTSONI";

export const MY_SOCIALS = [
  { name: "LinkedIn", href: LINKEDIN_URL },
  { name: "GitHub", href: GITHUB_URL },
] as const;

export const CONTACT_EMAIL = "meetsoni2511@gmail.com";

/** Display form of the phone number. */
export const CONTACT_PHONE = "+91 88980 02511";

/** E.164 form for `tel:` links. */
export const CONTACT_PHONE_HREF = "tel:+918898002511";
