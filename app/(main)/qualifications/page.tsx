import ContactSection from "../components/contact-common";
import DocumentsNeed from "../components/documents-need";
import CourseCategories from "./components/course-categories";
import EligibilityForRPL from "./components/eligibility";
import HeroSection from "./components/hero";
import RPLTimeline from "./components/process-of-rpl";

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
