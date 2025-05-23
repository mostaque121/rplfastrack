import { getAllSections } from "../action/courses";
import ContactSection from "../components/contact-common";
import ReviewCommon from "../components/review-common";
import {
  aboutPageBreadcrumb,
  aboutWebPageSchema,
  serviceSchema,
} from "../scheema/scheema";
import HeroAboutUs from "./components/hero";
import IntroductionAboutUs from "./components/introduction";
import OurIndustry from "./components/our-Industry";
import OurMission from "./components/our-mission";
import OurStory from "./components/our-story";
import WhyChooseUs from "./components/why-choose-us";

export const metadata = {
  title: "About Us",
  description:
    "RPL Fast Track is committed to helping skilled individuals gain recognition through RPL in Australia. Learn about our mission, team, and values.",
  keywords: [
    "About RPL Fast Track",
    "RPL experts Australia",
    "RPL support",
    "Skills recognition services",
    "Trusted RPL provider",
    "Get RPL certified",
    "Fast track qualifications",
    "Work experience validation",
    "Recognition of Prior Learning experts",
  ],
  alternates: {
    canonical: "https://rplfastrack.com/about-us",
  },
  openGraph: {
    title: "About Us - RPL Fast Track",
    description:
      "Meet the team behind RPL Fast Track. Learn how we help people get certified in Australia through Recognition of Prior Learning.",
    url: "https://rplfastrack.com/about-us",
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
      "Learn about RPL Fast Track’s mission and how we help skilled individuals in Australia get recognized for their experience.",
    images: ["/about-us-hero.jpg"],
  },
};

export default async function AboutUs() {
  const industries = await getAllSections();
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageBreadcrumb),
        }}
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
