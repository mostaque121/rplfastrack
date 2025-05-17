import { getAllReviews } from "../action/review";
import ReviewHero from "./components/review-hero";
import ReviewList from "./components/review-list";
import ReviewStats from "./components/review-stats";

export const metadata = {
  title: "Client Reviews",
  description:
    "Read real client reviews and testimonials about their experience with RPL Fast Track. See how we've helped individuals achieve recognition for their skills in Australia.",
  alternates: {
    canonical: "https://rplfastrack.com/reviews",
  },
  openGraph: {
    title: "Client Reviews - RPL Fast Track Australia",
    description:
      "Discover what our clients say about their Recognition of Prior Learning journey with RPL Fast Track. Trusted by skilled professionals across Australia.",
    url: "https://rplfastrack.com/reviews",
    type: "article",
    images: [
      {
        url: "/review-hero.jpg", // Replace with your actual hero image
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
    images: ["/review-hero.jpg"], // Replace with actual image
    site: "@rplfastrack", // Add your Twitter handle if available
  },
};

export default async function Page() {
  const reviews = await getAllReviews();
  return (
    reviews && (
      <div>
        <ReviewHero />
        <ReviewStats reviews={reviews} />
        <ReviewList reviews={reviews} />
      </div>
    )
  );
}
