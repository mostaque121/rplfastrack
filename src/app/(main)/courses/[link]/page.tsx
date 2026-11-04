import { Course, WithContext } from "schema-dts";
import striptags from "striptags";

import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { FaqSection, faqPageSchema } from "@/components/faq/faq-section";
import { SITE_URL, siteConfig } from "@/config/site";
import { listSections, getCourseForPage, getSectionByLink } from "@/features/courses/queries";
import { redirectOrNotFound } from "@/features/courses/redirects";
import { organization, serviceSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import QualificationContent from "./components/content";
import EligibilityForRPLSimple from "./components/eligibility";
import QualificationHeroSection from "./components/hero";
import RelatedCourses from "./components/related-courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import ReviewCommon from "../../components/review-common";
import RplProcess from "../../components/rpl-process";

import type { BreadcrumbList } from "schema-dts";

export async function generateMetadata({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;

  try {
    const data = await getCourseForPage(link);
    if (!data) {
      return {};
    }

    const pageTitle = `${data.metaTitle}`;
    const pageDescription = `${data.metaDescription}`;

    return {
      title: pageTitle,
      description: pageDescription,
      alternates: {
        canonical: absoluteUrl(`/courses/${data.link}`),
      },
      openGraph: {
        title: pageTitle,
        description: `${data.metaDescription}`,
        url: absoluteUrl(`/courses/${data.link}`),
        type: "article",
        images: [
          {
            url: data.imageCoverLink,
            width: 1200,
            height: 630,
            alt: data.imageAlt || `${data.title} course image`,
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
    const sections = await listSections();

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

export default async function Page({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;
  const course = await getCourseForPage(link);
  if (!course) {
    return redirectOrNotFound(`/courses/${link}`);
  }
  const courseSchema: WithContext<Course> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    ...(course.code && { courseCode: course.code }),
    url: absoluteUrl(`/courses/${course.link}`),
    description: striptags(course.heroIntro || course.description).trim(),
    inLanguage: siteConfig.language,
    image: [course.imageCoverLink, course.imageSquareLink],
    provider: organization,
    offers: [
      {
        "@type": "Offer",
        url: absoluteUrl(`/courses/${course.link}`),
        category: "Paid",
        availability: "https://schema.org/InStock",
        priceCurrency: "AUD",
        description: "Contact us for pricing information",
      },
    ],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT0S",
        location: {
          "@type": "Place",
          name: "Online",
        },
        description: "This course is available year-round and can be started anytime.",
      },
    ],
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: absoluteUrl("/courses"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.section.title,
        item: absoluteUrl(`/section/${course.section.link}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: course.title,
        item: absoluteUrl(`/courses/${course.link}`),
      },
    ],
  };

  const section = await getSectionByLink(course.section.link);
  return (
    <div>
      <DraftPreviewBanner path={`/courses/${course.link}`} />
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
      {course.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(course.faqs)) }}
        />
      )}
      <QualificationHeroSection data={course} section={course.section} />
      <QualificationContent data={course} />
      <FaqSection title={`${course.title}: FAQs`} faqs={course.faqs} />
      <RelatedCourses qualifications={section?.courses} industryLink={course.section.link} />
      <EligibilityForRPLSimple />
      <DocumentsNeed />
      <RplProcess />
      <ReviewCommon />
      <ContactSection />
    </div>
  );
}
