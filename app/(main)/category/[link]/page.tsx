import { notFound } from "next/navigation";
import { getAllSections, getSectionByLink } from "../../action/courses";
import ContactSection from "../../components/contact-common";
import DocumentsNeed from "../../components/documents-need";
import EligibilityForRPL from "../../qualifications/components/eligibility";
import RPLTimeline from "../../qualifications/components/process-of-rpl";
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
      description: `Explore our comprehensive range of courses in ${data.title} at RPL Fast Track Australia. Our programs are designed to enhance your skills and qualifications in the field, empowering you for career advancement.`,
      keywords: `RPL, Fast Track, Australia, courses, ${data.title}, ${keywords}, ${data.title} courses, ${data.title} training`,
      alternates: {
        canonical: `https://rplfastrack.com/category/${link}`,
      },
      openGraph: {
        title: `Courses in ${data.title}`,
        description: `Join our diverse courses in ${data.title} at RPL Fast Track Australia. Elevate your career with our expert-led training programs tailored to your needs.`,
        url: `https://rplfastrack.com/category/${data.link}`,
        images: [`${data.imageCoverLink}`],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Courses in ${data.title}`,
        description: `Discover our specialized courses in ${data.title} at RPL Fast Track Australia. Take the next step in your career today!`,
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
