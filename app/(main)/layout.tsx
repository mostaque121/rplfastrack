import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { RPLProvider } from "@/components/rpl-context";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppChatButton } from "@/components/whatsapp-chat-button";
import { Metadata } from "next/types";
import { getAllSections } from "./action/courses";

export const metadata: Metadata = {
  metadataBase: new URL("https://rplfastrack.com"),
  title: {
    default: "RPL Fast Track",
    template: "%s | RPL Fast Track",
  },
  description:
    "Get nationally recognized qualifications in Australia through our RPL Fast Track process. Convert your skills, experience, and prior learning into formal certification quickly and affordably.",
  keywords: [
    "RPL Australia",
    "Recognition of Prior Learning",
    "RPL certificate",
    "Fast track RPL",
    "RPL qualifications",
    "Skills assessment Australia",
    "Trade recognition Australia",
    "RPL courses",
    "RPL providers",
    "Get RPL certified",
    "Career recognition Australia",
    "RPL for migration",
    "RPL for electricians",
    "RPL for chefs",
    "RPL for carpenters",
    "Diploma through RPL",
    "Australian RPL process",
    "RPL skill assessment",
    "RPL application",
    "Recognition of work experience",
    "plumbing rpl",
    "rpl carpentry",
    "rpl certificates",
    "fast rpl",
  ],
  authors: [
    { name: "RPL Fast Track Australia", url: "https://rplfastrack.com" },
  ],
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RPL Fast Track Australia",
    description:
      "Get nationally recognized qualifications in Australia through our RPL Fast Track process. Convert your experience into certification quickly and affordably.",
    url: "https://rplfastrack.com",
    locale: "en_US",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const sections = await getAllSections();

  return (
    <main>
      <RPLProvider initialQualifications={sections}>
        <Navbar />
        <div>{children}</div>
        {whatsAppNumber && (
          <WhatsAppChatButton phoneNumber={whatsAppNumber} size="lg" />
        )}
        <Footer />
        <Toaster />
      </RPLProvider>
    </main>
  );
}
