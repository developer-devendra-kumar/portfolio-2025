import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import SectionPageShell from "@/components/SectionPageShell";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/contact",
    title: content.contact.title,
    description: content.contact.headline,
  });
}

export default async function ContactPage() {
  const result = await loadSiteContent();
  const content = result.data;

  if (!content.featureFlags.showContact) {
    notFound();
  }

  return (
    <SectionPageShell warning={result.warning}>
      <Contact content={content.contact} />
    </SectionPageShell>
  );
}
