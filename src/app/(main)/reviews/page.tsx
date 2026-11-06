import { ClosingCta } from "@/components/sections/closing-cta";
import { listReviews } from "@/features/reviews/queries";
import { absoluteUrl } from "@/lib/url";

import ReviewHero from "./components/review-hero";
import ReviewList from "./components/review-list";
import ReviewStats from "./components/review-stats";

export const metadata = {
  title: { absolute: "RPL Fast Track Reviews: Real Client Experiences" },
  description:
    "Read real RPL Fast Track reviews from tradies and workers who turned their experience into a nationally recognised qualification. See their stories.",
  alternates: {
    canonical: absoluteUrl("/reviews"),
  },
  openGraph: {
    title: "Client Reviews - RPL Fast Track Australia",
    description:
      "Discover what our clients say about their Recognition of Prior Learning journey with RPL Fast Track. Trusted by skilled professionals across Australia.",
    url: absoluteUrl("/reviews"),
    type: "website",
    images: [
      {
        url: "/review-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Client Reviews - RPL Fast Track",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews - RPL Fast Track",
    description:
      "See reviews from satisfied clients who successfully fast-tracked their qualifications with RPL Fast Track Australia.",
    images: ["/review-hero.jpg"],
  },
};

export default async function Page() {
  const reviews = await listReviews();
  return (
    <>
      <ReviewHero />
      <ReviewStats reviews={reviews} />
      <ReviewList reviews={reviews} />
      <ClosingCta />
    </>
  );
}
