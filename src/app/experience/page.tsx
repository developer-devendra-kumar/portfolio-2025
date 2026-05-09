import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Experience from "@/components/Experience";
import SectionPageShell from "@/components/SectionPageShell";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/experience",
    title: content.experience.title,
    description:
      content.experience.items[0]?.highlights[0] ?? content.seo.description,
  });
}

export default async function ExperiencePage() {
  const result = await loadSiteContent();
  const content = result.data;

  if (!content.featureFlags.showExperience) {
    notFound();
  }

  return (
    <SectionPageShell warning={result.warning}>
      <Experience content={content.experience} />
    </SectionPageShell>
  );
}
