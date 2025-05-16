"use client";
import ReviewCard from "@/components/review-card";
import Link from "next/link";
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
interface ReviewCommonProps {
  reviews: UserReview[];
}

export default function ReviewCommonContent({ reviews }: ReviewCommonProps) {
  const totalReviews = reviews.length;

  // Count star ratings and calculate average
  const starCounts = [0, 0, 0, 0, 0]; // Index 0 = 5 stars, Index 1 = 4 stars, ..., Index 4 = 1 star
  let totalStars = 0;

  reviews.forEach((review) => {
    if (review.givenStar >= 1 && review.givenStar <= 5) {
      starCounts[5 - review.givenStar] += 1; // Count reverse index for star ratings
      totalStars += review.givenStar; // Sum up stars for average calculation
    }
  });

  const avgStar = totalReviews > 0 ? totalStars / totalReviews : 0;

  // Calculate stars to display
  const wholeStars = Math.floor(avgStar);
  const decimalPart = avgStar - wholeStars;
  const emptyStars = 5 - (wholeStars + (decimalPart >= 0.5 ? 1 : 0));
  const displayedReviews = reviews.slice(0, 5);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-96 w-full mb-6 md:mb-0">
        {/* Star Rating Summary Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-light-gray py-4 px-4 sm:px-6 items-center flex flex-col rounded-lg shadow-sm w-full max-w-md text-center">
            <div className="flex items-center mb-2">
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
            <div className="flex items-center justify-center mt-2 space-x-1 text-gray-700">
              <span className="text-emerald-600 text-xl sm:text-2xl font-bold">
                {avgStar}
              </span>
              <span className="text-gray-500 font-medium text-sm sm:text-base">
                out of 5
              </span>
            </div>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Based on {totalReviews} reviews
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          {starCounts.map((count, index) => {
            const starValue = 5 - index; // Calculate star value (5, 4, 3, 2, 1)
            const percentage =
              totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : 0;

            return (
              <div key={index} className="flex items-center mb-2">
                <span className="flex items-center gap-1 font-semibold">
                  {starValue} <MdStar />{" "}
                </span>
                <span className="ml-2 w-12">( {count} )</span>
                <div className="flex-1 flex items-center bg-light-gray-hover h-2 rounded mr-4">
                  <div className="w-full bg-gray-200 rounded">
                    <div
                      className="bg-emerald-500  h-2 rounded"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-dark-gray  w-14">{percentage}%</span>
              </div>
            );
          })}
        </div>
        <Link href={"/write-review"}>
          <button className="py-1 px-3 font-semibold mt-4 border-emerald-500 hover:border-emerald-500 cursor-pointer rounded-full border-2 hover:bg-emerald-500 hover:text-white transition-all duration-200 ease-in-out">
            Write a review
          </button>
        </Link>
      </div>

      {/* Right Side: User Reviews */}
      <div className="md:flex-1 md:ml-10">
        {displayedReviews.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
        {5 < totalReviews && ( // Show "Show More" button only if there are more reviews
          <Link href="/review">
            <button className="mt-4 py-2 px-4 border block mx-auto border-gray-300 rounded bg-white hover:bg-gray-100 transition duration-200 ease-in-out">
              See all review
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
