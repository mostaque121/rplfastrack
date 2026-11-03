import { absoluteUrl } from "@/lib/url";
import ContactSection from "../components/contact-common";
import DocumentsNeed from "../components/documents-need";
import {
  allCoursesSchema,
  coursesBreadcrumb,
  serviceSchema,
} from "../scheema/scheema";
import CourseCategories from "./components/course-categories";
import EligibilityForRPL from "./components/eligibility";
import HeroSection from "./components/hero";
import RPLTimeline from "./components/process-of-rpl";

export const metadata = {
  title: "Qualifications - Explore Recognized Certifications",
  description:
    "Explore nationally recognized qualifications through Recognition of Prior Learning (RPL) in Australia. Fast-track your certification and career advancement today.",
  alternates: {
    canonical: absoluteUrl("/courses"),
  },
  openGraph: {
    title: "Courses - Recognized Certifications via RPL",
    description:
      "Discover how RPL helps you achieve Australian qualifications by assessing your existing skills and experience.",
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
    title: "Qualifications - Recognized Certifications via RPL",
    description:
      "Achieve Australian qualifications quickly by validating your skills with RPL.",
    images: ["/qualifications-bg.jpg"],
  },
};

export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allCoursesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesBreadcrumb) }}
      />
      <HeroSection />
      <CourseCategories />
      <EligibilityForRPL />
      <RPLTimeline />
      <DocumentsNeed />
      <ContactSection />
    </div>
  );
}
