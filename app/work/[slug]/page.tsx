import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_REGISTRY } from "@/components/cases/case-registry";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  Object.keys(CASE_REGISTRY).map((slug) => ({ slug }));

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = CASE_REGISTRY[slug];
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: "article", title: entry.title, description: entry.description, url: `/work/${slug}` },
    twitter: { title: entry.title, description: entry.description },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const entry = CASE_REGISTRY[slug];
  if (!entry) notFound();
  const { Component } = entry;
  return <Component />;
}
