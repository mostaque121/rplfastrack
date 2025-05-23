import { notFound } from "next/navigation";
import { BreadcrumbList, CollectionPage, WithContext } from "schema-dts";
import { getAllSections, getSectionByLink } from "../../action/courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import EligibilityForRPL from "../../courses/components/eligibility";
import RPLTimeline from "../../courses/components/process-of-rpl";
import CaregoryQualifications from "./components/category-qualifications";
import HeroSection from "./components/hero";
import RelatedIndustry from "./components/related-industry";

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

    const keywords = data.courses.map((course) => course.title).join(", ");
    return {
      title: `${data.title}`,
      description: `${data.metaDescription}`,
      keywords: `RPL, Fast Track, Australia, courses, ${data.title}, ${keywords}, ${data.title} courses, ${data.title} training`,
      alternates: {
        canonical: `https://rplfastrack.com/section/${link}`,
      },
      openGraph: {
        title: `Courses in ${data.title}`,
        description: `${data.metaDescription}`,
        url: `https://rplfastrack.com/section/${data.link}`,
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
    const sections = await getAllSections();
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
  const sectionScheema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${section.title} | RPL Fast Track`,
    url: `https://rplfastrack.com/section/${section.link}`,
    description:
      "Find Recognition of Prior Learning (RPL) courses related to Community Services industry.",
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
        name: section.title,
        item: `https://rplfastrack.com/section/${section.link}`,
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
