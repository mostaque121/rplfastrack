import DocumentsNeed from "../components/documents-need";
import FaqCommon from "../components/faq-common";
import EligibilityForRPL from "../qualifications/components/eligibility";
import BenefitsOfRPL from "./components/benefits-of-rpl";
import Cta from "./components/cta";
import AboutRplHero from "./components/hero";
import RplProcessTimeline from "./components/rpl-process-timeline";
import WhatIsRPL from "./components/what-is-rpl";

export const metadata = {
  title: "About RPL - Recognition of Prior Learning | RPL Experts",
  description:
    "Learn about Recognition of Prior Learning (RPL) and how it can help you convert your experience into formal qualifications.",
};

export default function AboutRPLPage() {
  return (
    <>
      <AboutRplHero />
      <WhatIsRPL />
      <BenefitsOfRPL />
      <EligibilityForRPL />
      <RplProcessTimeline />
      <DocumentsNeed />
      <FaqCommon />
      <Cta />
    </>
  );
}
