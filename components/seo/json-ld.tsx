import { type FC } from "react";
import { HERO_LOCATION, HERO_NAME, HERO_ROLE } from "@/constants/hero-constants";
import {
  CONTACT_POINT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/constants/seo-constants";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: HERO_NAME,
      jobTitle: HERO_ROLE,
      email: `mailto:${CONTACT_POINT_EMAIL}`,
      url: SITE_URL,
      sameAs: SOCIAL_PROFILES,
      address: { "@type": "PostalAddress", addressLocality: HERO_LOCATION },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const JsonLd: FC = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
  />
);
