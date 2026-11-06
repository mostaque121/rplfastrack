import { JsonLd } from "@/components/seo/json-ld";
import { listSections } from "@/features/courses/queries";
import { aboutWebPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import ContactSection from "../components/contact-common";
import ReviewCommon from "../components/review-common";
import HeroAboutUs from "./components/hero";
import IntroductionAboutUs from "./components/introduction";
import OurIndustry from "./components/our-industry";
import OurMission from "./components/our-mission";
import OurStory from "./components/our-story";
import WhyChooseUs from "./components/why-choose-us";

export const metadata = {
  title: "About Us: RPL Consultants Helping Australians Get Qualified",
  description:
    "RPL Fast Track is committed to helping skilled individuals gain recognition through RPL in Australia. Learn about our mission, team, and values.",
  alternates: {
    canonical: absoluteUrl("/about-us"),
  },
  openGraph: {
    title: "About Us - RPL Fast Track",
    description:
      "Meet the team behind RPL Fast Track. Learn how we help people get certified in Australia through Recognition of Prior Learning.",
    url: absoluteUrl("/about-us"),
    type: "article",
    images: [
      {
        url: "/about-us-hero.jpg",
        width: 1200,
        height: 630,
        alt: "About RPL Fast Track Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Meet RPL Fast Track",
    description:
      "Learn about RPL Fast Track’s mission and how we help skilled individuals in Australia get recognised for their experience.",
    images: ["/about-us-hero.jpg"],
  },
};

export default async function AboutUs() {
  const industries = await listSections();
  return (
    <div>
      <JsonLd data={serviceSchema} />
      <JsonLd data={aboutWebPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          ["About Us", "/about-us"],
        ])}
      />
      <HeroAboutUs />
      <IntroductionAboutUs />
      <OurStory />
      <OurMission />
      <WhyChooseUs />
      <OurIndustry industries={industries} />
      <ReviewCommon />
      <ContactSection />
    </div>
  );
}
