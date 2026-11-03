import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import { CACHE_TAGS } from "@/config/cache-tags";
import { prisma } from "@/server/db";

// Errors are not caught: a thrown query is never cached (see
// features/courses/queries.ts). reviewDate comes back as a string.

const approvedReviews = () =>
  prisma.userReview.findMany({
    where: { approved: true },
    select: {
      id: true,
      purchasedCourseId: true,
      userName: true,
      userImage: true,
      reviewImage: true,
      reviewText: true,
      givenStar: true,
      reviewDate: true,
      purchasedCourse: {
        select: { id: true, title: true, link: true },
      },
    },
    orderBy: { reviewDate: "desc" },
  });

/** Approved reviews, latest first. */
export const listReviews = cache(
  unstable_cache(approvedReviews, ["list-reviews"], {
    tags: [CACHE_TAGS.reviewsAll],
  }),
);

/** Latest 3 reviews plus rating stats, for the shared reviews block. */
export const getReviewSummary = cache(
  unstable_cache(
    async () => {
      const allReviews = await approvedReviews();

      const totalReviews = allReviews.length;
      const averageRating =
        totalReviews > 0 ? allReviews.reduce((sum, r) => sum + r.givenStar, 0) / totalReviews : 0;
      const starCounts = [5, 4, 3, 2, 1].reduce<Record<number, number>>((acc, star) => {
        acc[star] = allReviews.filter((r) => r.givenStar === star).length;
        return acc;
      }, {});

      return {
        latestReviews: allReviews.slice(0, 3),
        stats: { totalReviews, averageRating, starCounts },
      };
    },
    ["review-summary"],
    { tags: [CACHE_TAGS.reviewsCommon] },
  ),
);
