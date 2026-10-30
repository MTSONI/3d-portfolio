import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo-constants";
import { CASES, WORKBENCH } from "@/constants/work-constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const cases = [...CASES.map((item) => item.slug), WORKBENCH.slug].map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    changeFrequency: "monthly" as const,
    priority: slug === "wispr-flow-india-growth" ? 0.9 : 0.7,
  }));
  return [...pages, ...cases];
}
