import { JsonLd } from "@/components/seo/json-ld";
import { ORG_ID, WEBSITE_ID } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import ContactForm from "./components/contact-form";
import ContactInfo from "./components/contact-info";
import ContactHero from "./components/hero";
import WhatHappensNext from "./components/what-happens-next";

export const metadata = {
  title: "Contact Us: Talk to an RPL Consultant",
  description:
    "Call, WhatsApp, email or send a form to RPL Fast Track. Speak to an RPL consultant about your eligibility and the qualification your experience can lead to.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact Us - RPL Fast Track",
    description:
      "Reach out to RPL Fast Track Australia for expert guidance on your Recognition of Prior Learning journey.",
    url: absoluteUrl("/contact"),
    type: "website",
    images: [
      {
        url: "/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Contact RPL Fast Track",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - RPL Fast Track",
    description:
      "Contact RPL Fast Track Australia for help with your skills recognition and RPL process.",
    images: ["/contact-hero.jpg"],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact RPL Fast Track",
  url: absoluteUrl("/contact"),
  inLanguage: "en-AU",
  isPartOf: { "@id": WEBSITE_ID },
  // The full organisation (address, hours, phone) is in the layout's JSON-LD
  mainEntity: { "@id": ORG_ID },
};

export default function ContactUs() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <ContactHero />
      {/* One card: navy details panel on the left, the form on the right. */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl lg:grid-cols-[2fr_3fr]">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <WhatHappensNext />
    </>
  );
}
