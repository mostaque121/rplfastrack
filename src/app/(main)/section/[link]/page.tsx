import { BreadcrumbList, CollectionPage, WithContext } from "schema-dts";

import { FaqSection, faqPageSchema } from "@/components/faq/faq-section";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { RplDocuments } from "@/components/sections/rpl-documents";
import { RplProcess } from "@/components/sections/rpl-process";
import { WhoIsEligible } from "@/components/sections/who-is-eligible";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/config/site";
import { listSections, getSectionByLink } from "@/features/courses/queries";
import { redirectOrNotFound } from "@/features/courses/redirects";
import { GuideCard } from "@/features/guides/components/guide-card";
import { listGuides } from "@/features/guides/queries";
import { absoluteUrl } from "@/lib/url";

import CategoryQualifications from "./components/category-qualifications";
import HeroSection from "./components/hero";
import RelatedIndustry from "./components/related-industry";
import SectionIntro from "./components/section-intro";

export async function generateMetadata({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;

  try {
    const data = await getSectionByLink(link);
    if (!data?.courses.length) {
      return {};
    }

    const title = data.metaTitle || `RPL for ${data.title}`;
    return {
      title: { absolute: title.length <= 43 ? `${title} | RPL Fast Track` : title },
      description: data.metaDescription,
      alternates: {
        canonical: absoluteUrl(`/section/${link}`),
      },
      openGraph: {
        title,
        description: data.metaDescription,
        url: absoluteUrl(`/section/${data.link}`),
        images: [data.imageUrl],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: data.metaDescription,
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
    if (!sections || sections.length === 0) {
      return [];
    }
    return sections.map((section) => ({
      link: section.link,
    }));
  } catch (error) {
    console.error("Failed to fetch section:", error);
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;
  const allSections = await listSections();
  const section = await getSectionByLink(link);
  // Sections have no draft status: one without published courses isn't public yet
  if (!section?.courses.length) {
    return redirectOrNotFound(`/section/${link}`);
  }
  const hasIntro = Boolean(section.intro);
  const hasFaqs = section.faqs.length > 0;
  const guides = (await listGuides()).slice(0, 3);
  const guidesTone = hasFaqs ? "white" : "surface";
  const sectionSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${section.title} | RPL Fast Track`,
    url: absoluteUrl(`/section/${section.link}`),
    description: section.metaDescription,
    about: {
      "@type": "Thing",
      name: section.title,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: section.courses.length,
      itemListElement: section.courses.map((course, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: course.title,
        url: absoluteUrl(`/courses/${course.link}`),
      })),
    },
  };

  const sectionBreadcrumb: WithContext<BreadcrumbList> = {
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
        name: section.title,
        item: absoluteUrl(`/section/${section.link}`),
      },
    ],
  };
  return (
    <>
      <JsonLd data={sectionSchema} />
      <JsonLd data={sectionBreadcrumb} />

      {hasFaqs && <JsonLd data={faqPageSchema(section.faqs)} />}

      {/* Light bands alternate white/surface; the optional intro and FAQs shift the tones after them. */}
      <HeroSection data={section} courseCount={section.courses.length} />
      <CategoryQualifications industry={section.title} qualifications={section.courses} />
      {hasIntro && <SectionIntro title={section.title} html={section.intro!} />}
      <WhoIsEligible tone={hasIntro ? "white" : "surface"} />
      <RplProcess />
      <RplDocuments tone="white" />
      <FaqSection title={`${section.title}: FAQs`} faqs={section.faqs} tone="surface" />
      <section className={`${guidesTone === "white" ? "bg-white" : "bg-surface"} py-14 md:py-24`}>
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading
            eyebrow="RPL guides"
            title={
              <>
                Guides to help you <Accent>get started</Accent>
              </>
            }
            description="Plain-English answers on how RPL works, what evidence to collect and what to expect."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.id}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <RelatedIndustry
        industries={allSections}
        currentLink={section.link}
        tone={guidesTone === "white" ? "surface" : "white"}
      />
      <ClosingCta tone={guidesTone} />
    </>
  );
}
