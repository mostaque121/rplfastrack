import { SITE_URL, siteConfig } from "@/config/site";
import WhatsAppButton1 from "@/components/custom-ui/whatsapp-button";
import { RPLProvider } from "@/contexts/rpl-context";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next/types";
import { getAllSections } from "./action/courses";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import { organization } from "./scheema/scheema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RPL Fast Track",
    template: "%s | RPL Fast Track",
  },
  description:
    "Get nationally recognized qualifications in Australia through our RPL Fast Track process. Convert your skills, experience, and prior learning into formal certification quickly and affordably.",
  authors: [{ name: "RPL Fast Track Australia", url: SITE_URL }],
  creator: "RPL Fast Track Australia",
  publisher: "RPL Fast Track Australia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "RPL Fast Track Australia",
    description:
      "Get nationally recognized qualifications in Australia through our RPL Fast Track process. Convert your experience into certification quickly and affordably.",
    url: SITE_URL,
    locale: siteConfig.locale,
    siteName: "RPL Fast Track",
    type: "website",
    images: [
      {
        url: "/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "RPL Fast Track Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rplfastrack",
    site: "@rplfastrack",
    title: "RPL Fast Track Australia",
    description:
      "Gain recognition for your prior learning and fast track your career in Australia.",
    images: ["/home-hero.jpg"],
  },
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = await getAllSections();
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <RPLProvider initialQualifications={sections}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <main>
        <Navbar />
        {children}
        {whatsAppNumber && <WhatsAppButton1 phoneNumber={whatsAppNumber} />}
        <Footer />
        <Toaster />
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </main>
    </RPLProvider>
  );
}
