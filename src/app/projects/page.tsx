import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Projects from "@/components/Projects";
import SectionPageShell from "@/components/SectionPageShell";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/projects",
    title: content.projects.title,
    description: content.projects.intro,
  });
}

export default async function ProjectsPage() {
  const result = await loadSiteContent();
  const content = result.data;
  const flags = content.featureFlags;

  if (!flags.showProjects) {
    notFound();
  }

  return (
    <SectionPageShell warning={result.warning}>
      <Projects content={content.projects} mode="full" />
    </SectionPageShell>
  );
}
