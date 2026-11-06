import striptags from "striptags";

import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { FaqSection, faqPageSchema } from "@/components/faq/faq-section";
import { RplProcess } from "@/components/sections/rpl-process";
import { WhoIsEligible } from "@/components/sections/who-is-eligible";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, siteConfig } from "@/config/site";
import { listSections, getCourseForPage, getSectionByLink } from "@/features/courses/queries";
import { redirectOrNotFound } from "@/features/courses/redirects";
import { listGuides } from "@/features/guides/queries";
import { aqfLevel, breadcrumbSchema, jsonLdGraph, organizationRef, WEBSITE_ID } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import QualificationContent from "./components/content";
import QualificationHeroSection from "./components/hero";
import RelatedCourses from "./components/related-courses";
import ContactSection from "../../components/contact-common";
import ReviewCommon from "../../components/review-common";

export async function generateMetadata({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;

  try {
    const data = await getCourseForPage(link);
    if (!data) {
      return {};
    }

    // metaTitle is the complete title (it already carries "Fast Track RPL"), so no site-name suffix
    const pageTitle = data.metaTitle;
    const pageDescription = data.metaDescription;

    return {
      title: { absolute: pageTitle },
      description: pageDescription,
      alternates: {
        canonical: absoluteUrl(`/courses/${data.link}`),
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: absoluteUrl(`/courses/${data.link}`),
        type: "website",
        locale: siteConfig.locale,
        siteName: siteConfig.name,
        images: [
          {
            url: data.imageUrl,
            width: 1200,
            height: 630,
            alt: data.imageAlt || `${data.title} course image`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: [data.imageUrl],
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
  const url = absoluteUrl(`/courses/${course.link}`);
  const description = striptags(course.heroIntro || course.description).trim();
  const level = aqfLevel(course.title);
  // One @graph: the page, the course it describes and the breadcrumb, linked by @id.
  // No Offer: we don't publish prices, and a price-less Offer is invalid. No ratings.
  const pageSchema = jsonLdGraph(
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: course.metaTitle,
      description: course.metaDescription,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${url}#course` },
      primaryImageOfPage: new URL(course.imageUrl, SITE_URL).href,
      dateModified: new Date(course.updatedAt).toISOString(),
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "Course",
      "@id": `${url}#course`,
      name: course.title,
      ...(course.code && { courseCode: course.code }),
      url,
      description,
      inLanguage: siteConfig.language,
      image: [new URL(course.imageUrl, SITE_URL).href],
      provider: organizationRef,
      educationalCredentialAwarded: course.title,
      ...(level && { educationalLevel: `AQF Level ${level}` }),
      about: course.section.title,
      hasCourseInstance: [
        {
          "@type": "CourseInstance",
          courseMode: "online",
          ...(course.duration && {
            description: `Typical time to complete: ${course.duration}. Start any time.`,
          }),
        },
      ],
    },
    {
      ...breadcrumbSchema([
        ["Home", "/"],
        ["Courses", "/courses"],
        [course.section.title, `/section/${course.section.link}`],
        [course.title, `/courses/${course.link}`],
      ]),
      "@id": `${url}#breadcrumb`,
    },
  );

  // Courses with no guide linked in the admin fall back to the general RPL guides
  const guides =
    course.guides?.length > 0
      ? course.guides
      : (await listGuides()).slice(0, 3).map(({ title, slug }) => ({ guide: { title, slug } }));
  const section = await getSectionByLink(course.section.link);
  const hasFaqs = course.faqs.length > 0;
  const hasRelated = (section?.courses ?? []).some((c) => c.link !== course.link);
  // Light bands alternate white/surface after the white content block. FAQs and related courses
  // are optional, so each tone depends on what is shown above it.
  const faqTone = "surface";
  const relatedTone = hasFaqs ? "white" : "surface";
  const lastTone = hasRelated ? relatedTone : hasFaqs ? faqTone : "white";
  const eligibleTone = lastTone === "white" ? "surface" : "white";
  return (
    <div>
      <DraftPreviewBanner path={`/courses/${course.link}`} />
      <JsonLd data={pageSchema} />
      {hasFaqs && <JsonLd data={faqPageSchema(course.faqs)} />}
      <QualificationHeroSection data={course} section={course.section} />
      <QualificationContent data={{ ...course, guides }} />
      <FaqSection title={`${course.title}: FAQs`} faqs={course.faqs} tone={faqTone} />
      <RelatedCourses
        qualifications={section?.courses}
        industryLink={course.section.link}
        industryTitle={course.section.title}
        currentLink={course.link}
        tone={relatedTone}
      />
      <WhoIsEligible tone={eligibleTone} />
      <RplProcess />
      <ReviewCommon />
      <ContactSection />
    </div>
  );
}
