import Header from "@/components/Header";
import { loadSiteContentData } from "@/content/loadSiteContent";
import {
  getVisibleNavigation,
  withDedicatedPageHrefs,
} from "@/content/sectionVisibility";

export default async function SiteHeader() {
  const content = await loadSiteContentData();
  const visibleNavigation = getVisibleNavigation(content);
  const navigation = withDedicatedPageHrefs(visibleNavigation);

  return <Header navigation={navigation} />;
}
