import { BreadcrumbList, CollectionPage, WithContext } from "schema-dts";

import { FaqSection, faqPageSchema } from "@/components/faq/faq-section";
import { RichText } from "@/components/rich-text/rich-text";
import { SITE_URL } from "@/config/site";
import { listSections, getSectionByLink } from "@/features/courses/queries";
import { redirectOrNotFound } from "@/features/courses/redirects";
import { absoluteUrl } from "@/lib/url";

import CaregoryQualifications from "./components/category-qualifications";
import HeroSection from "./components/hero";
import RelatedIndustry from "./components/related-industry";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import EligibilityForRPL from "../../courses/components/eligibility";
import RPLTimeline from "../../courses/components/process-of-rpl";

export async function generateMetadata({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;

  try {
    const data = await getSectionByLink(link);
    if (!data) {
      return {};
    }

    return {
      title: data.metaTitle || data.title,
      description: `${data.metaDescription}`,
      alternates: {
        canonical: absoluteUrl(`/section/${link}`),
      },
      openGraph: {
        title: `Courses in ${data.title}`,
        description: `${data.metaDescription}`,
        url: absoluteUrl(`/section/${data.link}`),
        images: [`${data.imageCoverLink}`],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Courses in ${data.title}`,
        description: `${data.metaDescription}`,
        image: `${data.imageCoverLink}`,
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
  if (!section) {
    return redirectOrNotFound(`/section/${link}`);
  }
  const sectionScheema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${section.title} | RPL Fast Track`,
    url: absoluteUrl(`/section/${section.link}`),
    description: section.metaDescription,
    about: {
      "@type": "Thing",
      name: section.title,
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sectionScheema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sectionBreadcrumb) }}
      />

      {section.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(section.faqs)) }}
        />
      )}

      <HeroSection data={section} />
      <CaregoryQualifications qualifications={section.courses} />
      {section.intro && (
        <section className="w-full bg-white py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 md:px-8">
            <h2 className="mb-4 text-2xl font-bold text-brand md:text-3xl">
              RPL for {section.title}
            </h2>
            <RichText html={section.intro} />
          </div>
        </section>
      )}
      <FaqSection title={`${section.title}: FAQs`} faqs={section.faqs} />
      <RelatedIndustry industries={allSections} />
      <EligibilityForRPL />
      <RPLTimeline />
      <DocumentsNeed />
      <ContactSection />
    </div>
  );
}
