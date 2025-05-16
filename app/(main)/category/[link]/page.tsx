import { notFound } from "next/navigation";
import { getAllSections, getSectionByLink } from "../../action/courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import EligibilityForRPL from "../../qualifications/components/eligibility";
import RPLTimeline from "../../qualifications/components/process-of-rpl";
import CaregoryQualifications from "./components/category-qualifications";
import HeroSection from "./components/hero";
import RelatedIndustry from "./components/related-industry";

export default async function Page({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;
  const allSections = await getAllSections();
  const section = await getSectionByLink(link);
  if (!section) {
    notFound();
  }
  return (
    <div>
      <HeroSection data={section} />
      <CaregoryQualifications qualifications={section.courses} />
      <RelatedIndustry industries={allSections} />
      <EligibilityForRPL />
      <RPLTimeline />
      <DocumentsNeed />
      <ContactSection />
    </div>
  );
}
