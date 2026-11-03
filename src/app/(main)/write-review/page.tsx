import { absoluteUrl } from "@/lib/url";

import ReviewForm from "./components/review-form";
export const metadata = {
  title: "Write a Review",
  description:
    "Share your experience with RPL Fast Track and help others understand the value of Recognition of Prior Learning in Australia.",
  alternates: {
    canonical: absoluteUrl("/write-review"),
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Write a Review - RPL Fast Track",
    description:
      "Tell us how RPL Fast Track helped you. Submit your review and inspire others on their Recognition of Prior Learning journey.",
    url: absoluteUrl("/write-review"),
    type: "article",
    images: [
      {
        url: "/review-hero.jpg", // Replace with your actual image path
        width: 1200,
        height: 630,
        alt: "Write a Review - RPL Fast Track",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write a Review - RPL Fast Track",
    description:
      "Share your feedback about RPL Fast Track and help others benefit from Recognition of Prior Learning in Australia.",
    images: ["/review-hero.jpg"], // Replace with your actual image path
    site: "@rplfastrack", // Update if you have a Twitter handle
  },
};

export default async function Page() {
  return (
    <div>
      <ReviewForm />
    </div>
  );
}
