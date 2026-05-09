import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudies from "@/components/CaseStudies";
import SectionPageShell from "@/components/SectionPageShell";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/case-studies",
    title: content.caseStudies.title,
    description:
      content.caseStudies.items[0]?.problem ?? content.seo.description,
  });
}

export default async function CaseStudiesPage() {
  const result = await loadSiteContent();
  const content = result.data;

  if (!content.featureFlags.showCaseStudies) {
    notFound();
  }

  return (
    <SectionPageShell warning={result.warning}>
      <CaseStudies content={content.caseStudies} />
    </SectionPageShell>
  );
}
