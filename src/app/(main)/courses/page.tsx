import { ClosingCta } from "@/components/sections/closing-cta";
import { RplDocuments } from "@/components/sections/rpl-documents";
import { RplProcess } from "@/components/sections/rpl-process";
import { JsonLd } from "@/components/seo/json-ld";
import { listSections } from "@/features/courses/queries";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import FaqCommon from "../components/faq-common";
import CourseCategories from "./components/course-categories";
import HeroSection from "./components/hero";

export const metadata = {
  title: "RPL Qualifications Australia: Browse by Industry",
  description:
    "Browse nationally recognised qualifications you can get through RPL, by industry. 100% online assessment, no classes or exams. Check your eligibility free.",
  alternates: {
    canonical: absoluteUrl("/courses"),
  },
  openGraph: {
    title: "RPL Qualifications in Australia, by Industry",
    description:
      "Find your qualification and see how Recognition of Prior Learning turns your experience into a nationally recognised certificate.",
    url: absoluteUrl("/courses"),
    type: "website",
    images: [
      {
        url: "/qualifications-bg.jpg",
        width: 1200,
        height: 630,
        alt: "RPL Qualifications Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPL Qualifications in Australia, by Industry",
    description: "Find your qualification and get recognised for the skills you already have.",
    images: ["/qualifications-bg.jpg"],
  },
};

export default async function Page() {
  const sections = await listSections();

  // Collection page listing the industries, so search engines see the hub structure.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RPL Qualifications in Australia",
    url: absoluteUrl("/courses"),
    description: "Nationally recognised qualifications available through RPL, by industry.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: sections.map((section, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: section.title,
        url: absoluteUrl(`/section/${section.link}`),
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          ["Courses", "/courses"],
        ])}
      />
      <HeroSection />
      <CourseCategories />
      <RplProcess />
      <RplDocuments />
      <FaqCommon />
      <ClosingCta />
    </>
  );
}
