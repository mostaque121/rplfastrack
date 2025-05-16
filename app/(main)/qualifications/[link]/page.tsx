import { notFound } from "next/navigation";
import { getCourseByLink, getSectionByLink } from "../../action/courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import ReviewCommon from "../../components/review-common";
import RplProcess from "../../components/rpl-process";
import QualificationContent from "./components/content";
import EligibilityForRPLSimple from "./components/eligibility";
import QualificationHeroSection from "./components/hero";
import RelatedCourses from "./components/related-courses";
export default async function Page({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;
  const course = await getCourseByLink(link);
  if (!course) {
    notFound();
  }
  const section = await getSectionByLink(course.section.link);
  return (
    <div>
      <QualificationHeroSection data={course} section={course.section} />
      <QualificationContent data={course} />
      <RelatedCourses
        qualifications={section?.courses}
        industryLink={course.section.link}
      />
      <EligibilityForRPLSimple />
      <DocumentsNeed />
      <RplProcess />
      <ReviewCommon />
      <ContactSection />
    </div>
  );
}
