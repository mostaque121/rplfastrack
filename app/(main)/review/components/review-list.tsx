import ReviewCard from "@/components/review-card";

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
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};
interface ReviewListProps {
  reviews: UserReview[];
}
export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className=" bg-white pb-16  overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl mb-4 font-semibold">Clients Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard review={review} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
