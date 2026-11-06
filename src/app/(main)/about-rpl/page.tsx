import { ClosingCta } from "@/components/sections/closing-cta";
import { RplDocuments } from "@/components/sections/rpl-documents";
import { RplProcess } from "@/components/sections/rpl-process";
import { WhoIsEligible } from "@/components/sections/who-is-eligible";
import { JsonLd } from "@/components/seo/json-ld";
import { GuidesBand } from "@/features/guides/components/guides-band";
import { aboutRplPageSchema, breadcrumbSchema, rplConceptSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import FaqCommon from "../components/faq-common";
import BenefitsOfRPL from "./components/benefits-of-rpl";
import AboutRplHero from "./components/hero";
import RplVsStudy from "./components/rpl-vs-study";
import WhatIsRPL from "./components/what-is-rpl";

export const metadata = {
  title: "What is RPL? Recognition of Prior Learning Explained",
  description:
    "What is RPL? Learn how Recognition of Prior Learning turns your work experience into a nationally recognised Australian qualification, who is eligible and what you need.",
  alternates: {
    canonical: absoluteUrl("/about-rpl"),
  },
  openGraph: {
    title: "About RPL - Recognition of Prior Learning Explained",
    description:
      "Discover how RPL allows skilled individuals to gain official qualifications based on their experience. See how the process works in Australia.",
    url: absoluteUrl("/about-rpl"),
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
      <JsonLd data={aboutRplPageSchema} />
      <JsonLd data={rplConceptSchema} />
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          ["About RPL", "/about-rpl"],
        ])}
      />
      <AboutRplHero />
      <WhatIsRPL />
      <BenefitsOfRPL />
      <RplVsStudy />
      <WhoIsEligible />
      <RplProcess />
      <RplDocuments />
      <FaqCommon />
      <GuidesBand slugs={["how-to-get-rpl-in-australia", "rpl-evidence", "rpl-cost"]} />
      <ClosingCta tone="white" />
    </>
  );
}
