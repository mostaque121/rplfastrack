import { JsonLd } from "@/components/seo/json-ld";
import { homePageSchema, serviceSchema } from "@/lib/seo";

import AboutRpl from "./components/about-rpl";
import EmployerRecognition from "./components/australian-recognize";
import ClientsFavourite from "./components/clients-favourite";
import ContactSection from "./components/contact-common";
import FaqCommon from "./components/faq-common";
import HomeHero from "./components/home-hero";
import ReviewCommon from "./components/review-common";
import RplProcess from "./components/rpl-process";
export const metadata = {
  title: { absolute: "RPL Fast Track: Recognition of Prior Learning in Australia" },
  description:
    "Turn your work experience into a nationally recognised Australian qualification through RPL. 100% online assessment, no classes or exams. Check your eligibility free.",
  alternates: {
    canonical: "/",
  },
};

export default async function page() {
  return (
    <div>
      <JsonLd data={serviceSchema} />
      <JsonLd data={homePageSchema} />
      <HomeHero />
      <AboutRpl />
      <ClientsFavourite />
      <EmployerRecognition />
      <RplProcess />
      <FaqCommon />
      <ReviewCommon />
      <ContactSection />
    </div>
  );
}
