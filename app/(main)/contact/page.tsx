import ContactForm from "./components/contact-form";
import ContactInfo from "./components/contact-info";
import ContactHero from "./components/hero";

export const metadata = {
  title: "Contact Us ",
  description:
    "Get in touch with RPL Fast Track Australia. Whether you have questions about our courses, services, or need assistance with Recognition of Prior Learning (RPL), our dedicated team is here to help you achieve your goals.",
  alternates: {
    canonical: "https://rplfastrack.com/contact",
  },
  openGraph: {
    title: "Contact Us - RPL Fast Track",
    description:
      "Reach out to RPL Fast Track Australia for expert guidance on your Recognition of Prior Learning journey.",
    url: "https://rplfastrack.com/contact",
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

export default async function ContactUs() {
  return (
    <div className="bg-white">
      <ContactHero />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
