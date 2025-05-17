import { getAllSections } from "../action/courses";
import ContactSection from "../components/contact-common";
import DocumentsNeed from "../components/documents-need";
import CourseCategories from "./components/course-categories";
import EligibilityForRPL from "./components/eligibility";
import HeroSection from "./components/hero";
import RPLTimeline from "./components/process-of-rpl";

export async function generateMetadata() {
  try {
    const sections = await getAllSections();
    const keywords = sections.map((section) => section.title).join(", ");

    return {
      title: "Qualifications - Explore Recognized Certifications",
      description:
        "Explore nationally recognized qualifications through Recognition of Prior Learning (RPL) in Australia. Fast-track your certification and career advancement today.",
      keywords: `"RPL qualifications",
    "Recognized certifications Australia",
    "Skills recognition",
    "Trade qualifications Australia",
    "RPL certification",
    "Australian qualifications",
    "Fast track qualifications",
    "RPL assessment",
    "Prior learning recognition",
    "Career advancement Australia", ${keywords}`,
      alternates: {
        canonical: "https://rplfastrack.com/qualifications",
      },
      openGraph: {
        title: "Qualifications - Recognized Certifications via RPL",
        description:
          "Discover how RPL helps you achieve Australian qualifications by assessing your existing skills and experience.",
        url: "https://rplfastrack.com/qualifications",
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
        title: "Qualifications - Recognized Certifications via RPL",
        description:
          "Achieve Australian qualifications quickly by validating your skills with RPL.",
        images: ["/qualifications-bg.jpg"],
      },
    };
  } catch {
    return {};
  }
}

export default function Page() {
  return (
    <div>
      <HeroSection />
      <CourseCategories />
      <EligibilityForRPL />
      <RPLTimeline />
      <DocumentsNeed />
      <ContactSection />
    </div>
  );
}
