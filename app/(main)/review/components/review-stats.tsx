import { Card } from "@/components/ui/card";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

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
interface ReviewStatsProps {
  reviews: UserReview[];
}

export default function ReviewStats({ reviews }: ReviewStatsProps) {
  const totalReviews = reviews.length;
  const starCounts = [0, 0, 0, 0, 0];
  let totalStars = 0;

  reviews.forEach((review) => {
    if (review.givenStar >= 1 && review.givenStar <= 5) {
      starCounts[5 - review.givenStar] += 1;
      totalStars += review.givenStar;
    }
  });

  const avgStar = totalReviews > 0 ? totalStars / totalReviews : 0;
  const wholeStars = Math.floor(avgStar);
  const decimalPart = avgStar - wholeStars;
  const emptyStars = 5 - (wholeStars + (decimalPart >= 0.5 ? 1 : 0));

  return (
    <div className="py-12 container mx-auto px-4 md:px-8">
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-primary">{avgStar}</div>
            <div className="flex mt-2">
              {/* Render whole stars */}
              {[...Array(wholeStars)].map((_, index) => (
                <MdStar
                  key={index}
                  className="text-emerald-600 h-5 w-5 sm:h-6 sm:w-6"
                />
              ))}

              {/* Render fractional star based on updated logic */}
              {decimalPart >= 0.75 ? (
                <MdStar className="text-emerald-600 h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                decimalPart >= 0.25 && (
                  <MdStarHalf className="text-emerald-600 h-5 w-5 sm:h-6 sm:w-6" />
                )
              )}

              {/* Render remaining empty stars */}
              {[...Array(emptyStars)].map((_, index) => (
                <MdStarOutline
                  key={index + wholeStars + 1}
                  className="text-gray-300 h-5 w-5 sm:h-6 sm:w-6"
                />
              ))}
            </div>
            <div className="mt-2 text-muted-foreground">
              Based on {totalReviews} reviews
            </div>
          </div>

          <div className="col-span-2">
            <div className="space-y-2">
              {starCounts.map((count, index) => {
                const starValue = 5 - index;
                const percentage =
                  totalReviews > 0
                    ? ((count / totalReviews) * 100).toFixed(1)
                    : 0;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex items-center w-20">
                      <span className="mr-2">{starValue}</span>
                      <MdStar className="w-4 h-4 fill-emerald-600 text-primary" />
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-24 text-right text-muted-foreground text-sm">
                      {count} reviews
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
