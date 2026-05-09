import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "@/components/About";
import SectionPageShell from "@/components/SectionPageShell";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/about",
    title: content.about.title,
    description: content.about.paragraphs[0] ?? content.seo.description,
  });
}

export default async function AboutPage() {
  const result = await loadSiteContent();
  const content = result.data;

  if (!content.featureFlags.showAbout) {
    notFound();
  }

  return (
    <SectionPageShell warning={result.warning}>
      <About content={content.about} />
    </SectionPageShell>
  );
}
