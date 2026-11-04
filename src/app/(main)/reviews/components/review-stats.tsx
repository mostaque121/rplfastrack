import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

import { Card } from "@/components/ui/card";

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

  const avgStar = totalReviews > 0 ? Number((totalStars / totalReviews).toFixed(1)) : 0;

  const wholeStars = Math.floor(avgStar);
  const decimalPart = avgStar - wholeStars;
  const emptyStars = 5 - (wholeStars + (decimalPart >= 0.5 ? 1 : 0));

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <Card className="mb-8 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-primary">{avgStar}</div>
            <div className="mt-2 flex">
              {/* Render whole stars */}
              {[...Array(wholeStars)].map((_, index) => (
                <MdStar key={index} className="h-5 w-5 text-brand sm:h-6 sm:w-6" />
              ))}

              {/* Render fractional star based on updated logic */}
              {decimalPart >= 0.75 ? (
                <MdStar className="h-5 w-5 text-brand sm:h-6 sm:w-6" />
              ) : (
                decimalPart >= 0.25 && <MdStarHalf className="h-5 w-5 text-brand sm:h-6 sm:w-6" />
              )}

              {/* Render remaining empty stars */}
              {[...Array(emptyStars)].map((_, index) => (
                <MdStarOutline
                  key={index + wholeStars + 1}
                  className="h-5 w-5 text-gray-300 sm:h-6 sm:w-6"
                />
              ))}
            </div>
            <div className="mt-2 text-muted-foreground">Based on {totalReviews} reviews</div>
          </div>

          <div className="col-span-2">
            <div className="space-y-2">
              {starCounts.map((count, index) => {
                const starValue = 5 - index;
                const percentage = totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : 0;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex w-20 items-center">
                      <span className="mr-2">{starValue}</span>
                      <MdStar className="h-4 w-4 fill-brand text-primary" />
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted">
                      <div
                        className="h-2.5 rounded-full bg-brand"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-24 text-right text-sm text-muted-foreground">
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
