import { getAllReviews } from "../action/review";
import ReviewHero from "./components/review-hero";
import ReviewList from "./components/review-list";
import ReviewStats from "./components/review-stats";

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
