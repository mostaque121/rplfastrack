"use client";

import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import ReviewCard from "@/app/(main)/components/card/review-card";
import { Stars } from "@/features/reviews/components/stars";
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
  /** Section heading, shown at the top of the left column. */
  heading?: ReactNode;
}

export default function ReviewCommonContent({ reviews, stats, heading }: ReviewCommonProps) {
  const totalReviews = stats.totalReviews;
  const avgStar = stats.averageRating;
  return (
    <div className="flex flex-col md:flex-row md:items-start">
      <div className="mb-6 w-full md:mb-0 md:w-96 md:shrink-0">
        {heading && <div className="mb-8">{heading}</div>}
        {/* Star Rating Summary Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex w-full max-w-md flex-col items-center rounded-xl border border-brand-subtle bg-white px-4 py-5 text-center shadow-sm sm:px-6">
            <div className="mb-2 flex items-center">
              <Stars rating={avgStar} />
            </div>
            <div className="mt-2 flex items-center justify-center space-x-1 text-gray-700">
              <span className="text-xl font-bold text-brand sm:text-2xl">
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
                <span className="flex items-center gap-1 font-semibold text-ink">
                  {starValue} <Star className="size-4 fill-current" />
                </span>
                <span className="ml-2 w-12 text-gray-700">( {count} )</span>
                <div className="mr-4 flex h-2 flex-1 items-center rounded">
                  <div className="w-full rounded bg-gray-200">
                    <div className="h-2 rounded bg-brand" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
                <span className="w-14 text-sm text-gray-600">{percentage}%</span>
              </div>
            );
          })}
        </div>
        <Link prefetch={false} href={"/write-review"}>
          <span className="mt-4 inline-flex h-11 items-center justify-center rounded-lg border border-brand px-5 font-semibold text-brand transition-colors hover:bg-brand hover:text-white">
            Write a review
          </span>
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
                className="group h-12 bg-brand px-6 text-base text-white hover:bg-brand-strong"
              >
                See all reviews
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
