import ReviewCard from "../../components/card/review-card";

interface Course {
  id: string;
  title: string;
  link: string;
}
type UserReview = {
  id: string;
  purchasedCourseId: string;
  purchasedCourse: Course;
  userName: string;
  userImage: string | null;
  reviewImage: string | null;
  reviewText: string;
  givenStar: number;
  reviewDate: Date;
};
interface ReviewListProps {
  reviews: UserReview[];
}
export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="overflow-hidden bg-white pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="mb-4 text-2xl font-semibold">Clients Feedback</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard review={review} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
