import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/SectionPageShell";
import Services from "@/components/Services";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/services",
    title: content.services.title,
    description:
      content.services.items[0]?.description ?? content.seo.description,
  });
}

export default async function ServicesPage() {
  const result = await loadSiteContent();
  const content = result.data;

  if (!content.featureFlags.showServices) {
    notFound();
  }

  return (
    <SectionPageShell warning={result.warning}>
      <Services content={content.services} />
    </SectionPageShell>
  );
}
