import { notFound } from "next/navigation";
import type { BreadcrumbList } from "schema-dts";
import { Course, WithContext } from "schema-dts";
import striptags from "striptags";
import {
  getAllSections,
  getCourseByLink,
  getSectionByLink,
} from "../../action/courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import ReviewCommon from "../../components/review-common";
import RplProcess from "../../components/rpl-process";
import { organization, serviceSchema } from "../../scheema/scheema";
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
    const data = await getCourseByLink(link);
    if (!data) {
      return {};
    }

    const pageTitle = `${data.metaTitle}`;
    const pageDescription = `${data.metaDescription}`;

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
        canonical: `https://rplfastrack.com/courses/${data.link}`,
      },
      openGraph: {
        title: pageTitle,
        description: `${data.metaDescription}`,
        url: `https://rplfastrack.com/courses/${data.link}`,
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
        description: `${data.metaDescription}`,
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
  const courseSchema: WithContext<Course> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    url: `https://rplfastrack.com/courses/${course.link}`,
    inLanguage: "en",
    description: striptags(course.description),
    provider: organization,
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rplfastrack.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: "https://rplfastrack.com/courses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.section.title,
        item: `https://rplfastrack.com/section/${course.section.link}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: course.title,
        item: `https://rplfastrack.com/courses/${course.link}`,
      },
    ],
  };

  const section = await getSectionByLink(course.section.link);
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
