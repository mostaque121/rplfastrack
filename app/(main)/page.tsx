import AboutRpl from "./components/about-rpl";
import EmployerRecognition from "./components/australian-recognize";
import ClientsFavourite from "./components/clients-favourite";
import ContactSection from "./components/contact-common";
import DocumentsNeed from "./components/documents-need";
import FaqCommon from "./components/faq-common";
import HomeHero from "./components/home-hero";

import ReviewCommon from "./components/review-common";
import RplProcess from "./components/rpl-process";
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
