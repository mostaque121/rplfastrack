import AboutRpl from "./components/about-rpl";
import EmployerRecognition from "./components/australian-recognize";
import ClientsFavourite from "./components/clients-favourite";
import ContactSection from "./components/contact-common";
import DocumentsNeed from "./components/documents-need";
import FaqCommon from "./components/faq-common";
import HomeHero from "./components/home-hero";

import ReviewCommon from "./components/review-common";
import RplProcess from "./components/rpl-process";

export const metadata = {
  title: "RPL Fast Track - Accelerate Your Skills Recognition in Australia",
  description:
    "Get nationally recognized qualifications in Australia through RPL. Fast-track your career by validating your skills and work experience today.",
};

export default function page() {
  return (
    <div>
      <HomeHero />
      <AboutRpl />
      <ClientsFavourite />
      <EmployerRecognition />
      <RplProcess />
      <DocumentsNeed />
      <FaqCommon />
      <ReviewCommon />
      <ContactSection />
    </div>
  );
}
