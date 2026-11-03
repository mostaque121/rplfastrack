"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

import ReviewCard from "@/app/(main)/components/card/review-card";
import { Button } from "@/components/ui/button";

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
interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  starCounts: Record<number, number>;
}

interface ReviewCommonProps {
  reviews: UserReview[];
  stats: ReviewStats;
}

export default function ReviewCommonContent({ reviews, stats }: ReviewCommonProps) {
  const totalReviews = stats.totalReviews;
  const avgStar = stats.averageRating;
  // Calculate stars to display
  const wholeStars = Math.floor(avgStar);
  const decimalPart = avgStar - wholeStars;
  const emptyStars = 5 - (wholeStars + (decimalPart >= 0.5 ? 1 : 0));
  return (
    <div className="flex flex-col md:flex-row">
      <div className="mb-6 w-full md:mb-0 md:w-96">
        {/* Star Rating Summary Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-light-gray flex w-full max-w-md flex-col items-center rounded-lg px-4 py-4 text-center shadow-sm sm:px-6">
            <div className="mb-2 flex items-center">
              {/* Render whole stars */}
              {[...Array(wholeStars)].map((_, index) => (
                <MdStar key={index} className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
              ))}

              {/* Render fractional star based on updated logic */}
              {decimalPart >= 0.75 ? (
                <MdStar className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
              ) : (
                decimalPart >= 0.25 && (
                  <MdStarHalf className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
                )
              )}

              {/* Render remaining empty stars */}
              {[...Array(emptyStars)].map((_, index) => (
                <MdStarOutline
                  key={index + wholeStars + 1}
                  className="h-5 w-5 text-gray-300 sm:h-6 sm:w-6"
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center space-x-1 text-gray-700">
              <span className="text-xl font-bold text-emerald-600 sm:text-2xl">
                {parseFloat(avgStar.toFixed(1))}
              </span>
              <span className="text-sm font-medium text-gray-500 sm:text-base">out of 5</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Based on {totalReviews} reviews
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          {([5, 4, 3, 2, 1] as const).map((starValue) => {
            const count = stats.starCounts[starValue];
            const percentage =
              stats.totalReviews > 0 ? ((count / stats.totalReviews) * 100).toFixed(1) : 0;

            return (
              <div key={starValue} className="mb-2 flex items-center">
                <span className="flex items-center gap-1 font-semibold">
                  {starValue} <MdStar />
                </span>
                <span className="ml-2 w-12">( {count} )</span>
                <div className="bg-light-gray-hover mr-4 flex h-2 flex-1 items-center rounded">
                  <div className="w-full rounded bg-gray-200">
                    <div
                      className="h-2 rounded bg-emerald-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-dark-gray w-14">{percentage}%</span>
              </div>
            );
          })}
        </div>
        <Link prefetch={false} href={"/write-review"}>
          <button className="mt-4 cursor-pointer rounded-full border-2 border-emerald-500 px-3 py-1 font-semibold transition-all duration-200 ease-in-out hover:border-emerald-500 hover:bg-emerald-500 hover:text-white">
            Write a review
          </button>
        </Link>
      </div>

      {/* Right Side: User Reviews */}
      <div className="md:ml-10 md:flex-1">
        {reviews.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
        {5 < totalReviews && ( // Show "Show More" button only if there are more reviews
          <div className="mt-10 flex justify-center">
            <Link prefetch={false} href={"/reviews"}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              >
                See all review
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
