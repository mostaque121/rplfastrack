import { getAllSections } from "../action/courses";
import ContactSection from "../components/contact-common";
import ReviewCommon from "../components/review-common";
import HeroAboutUs from "./components/hero";
import IntroductionAboutUs from "./components/introduction";
import OurIndustry from "./components/our-Industry";
import OurMission from "./components/our-mission";
import OurStory from "./components/our-story";
import WhyChooseUs from "./components/why-choose-us";
export default async function AboutUs() {
  const industries = await getAllSections();
  return (
    <div>
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
