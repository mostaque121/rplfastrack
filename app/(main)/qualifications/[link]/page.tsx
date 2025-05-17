import { notFound } from "next/navigation";
import {
  getAllSections,
  getCourseByLink,
  getSectionByLink,
} from "../../action/courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import ReviewCommon from "../../components/review-common";
import RplProcess from "../../components/rpl-process";
import QualificationContent from "./components/content";
import EligibilityForRPLSimple from "./components/eligibility";
import QualificationHeroSection from "./components/hero";
import RelatedCourses from "./components/related-courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;

  try {
    const data = await getSectionByLink(link);
    if (!data) {
      return {};
    }

    const pageTitle = `${data.title}`;
    const pageDescription = `Enroll in the ${data.title} course at RPL Fast Track Australia. Gain nationally recognized qualifications through practical training and Recognition of Prior Learning (RPL).`;

    const bestKeywords = [
      "Recognition of Prior Learning",
      "RPL Australia",
      "RPL qualifications",
      "RPL course",
      "certification Australia",
      "vocational training",
      "career advancement",
      "nationally recognized qualification",
      "skills recognition",
      "RPL Fast Track",
      data.title,
    ].join(", ");

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: bestKeywords,
      alternates: {
        canonical: `https://rplfastrack.com/qualifications/${data.link}`,
      },
      openGraph: {
        title: pageTitle,
        description: `Explore the ${data.title} course at RPL Fast Track. Develop your skills and fast-track your career with recognized Australian qualifications.`,
        url: `https://rplfastrack.com/qualifications/${data.link}`,
        type: "article",
        images: [
          {
            url: data.imageCoverLink,
            width: 1200,
            height: 630,
            alt: `${data.title} course image`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: `Get certified in ${data.title} at RPL Fast Track Australia. Recognition for your existing skills through quality training.`,
        images: [data.imageCoverLink],
        site: "@RPLFastTrack",
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  try {
    const sections = await getAllSections();

    if (!sections || sections.length === 0) return [];

    const allCourses = sections.flatMap((section) => section.courses ?? []);

    return allCourses.map((course) => ({
      link: course.link,
    }));
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    return [];
  }
}

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
