import { type Metadata } from "next";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { HomeHero } from "@/components/home/home-hero";
import {
  AboutTeaser,
  ContactBlock,
  SelectedWork,
  WorkbenchTeaser,
} from "@/components/home/home-sections";
import { MethodSection } from "@/components/home/method-section";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants/seo-constants";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "profile", firstName: "Meet", lastName: "Soni", url: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <CapabilitiesSection />
      <MethodSection />
      <SelectedWork />
      <WorkbenchTeaser />
      <AboutTeaser />
      <ContactBlock />
    </>
  );
}
