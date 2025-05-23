import DocumentsNeed from "../components/documents-need";
import FaqCommon from "../components/faq-common";
import EligibilityForRPL from "../courses/components/eligibility";
import {
  aboutRplBreadcrumb,
  aboutRplPageSchema,
  rplConceptSchema,
} from "../scheema/scheema";
import BenefitsOfRPL from "./components/benefits-of-rpl";
import Cta from "./components/cta";
import AboutRplHero from "./components/hero";
import RplProcessTimeline from "./components/rpl-process-timeline";
import WhatIsRPL from "./components/what-is-rpl";

export const metadata = {
  title: "About RPL - Learn Recognition of Prior Learning",
  description:
    "Learn how Recognition of Prior Learning (RPL) helps you convert skills and experience into nationally recognized qualifications in Australia.",
  keywords: [
    "What is RPL",
    "Recognition of Prior Learning Australia",
    "RPL process explained",
    "Skills assessment",
    "Australian qualifications",
    "Work experience recognition",
    "How RPL works",
    "Fast track certification",
    "Career pathway RPL",
    "RPL benefits",
  ],
  alternates: {
    canonical: "https://rplfastrack.com/about-rpl",
  },
  openGraph: {
    title: "About RPL - Recognition of Prior Learning Explained",
    description:
      "Discover how RPL allows skilled individuals to gain official qualifications based on their experience. See how the process works in Australia.",
    url: "https://rplfastrack.com/about-rpl",
    type: "article",
    images: [
      {
        url: "/recognition.jpg",
        width: 1200,
        height: 630,
        alt: "About RPL Fast Track",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About RPL - Recognition of Prior Learning in Australia",
    description:
      "Understand the RPL process and how you can get certified for your existing skills and work experience in Australia.",
    images: ["/recognition.jpg"],
  },
};

export default function AboutRPLPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutRplPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(rplConceptSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutRplBreadcrumb),
        }}
      />
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
