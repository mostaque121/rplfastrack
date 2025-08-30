"use server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { z } from "zod";

// Define the schema to validate the incoming review data
const ReviewSchema = z.object({
  userName: z.string(),
  userImage: z.string().optional(),
  purchasedCourse: z.string(),
  reviewText: z.string(),
  reviewImage: z.string().optional(),
  givenStar: z.number().min(1).max(5),
});

type FormData = z.infer<typeof ReviewSchema>;

export async function saveReview(input: FormData) {
  const parsedData = ReviewSchema.parse(input);

  try {
    const newReview = await prisma.userReview.create({
      data: {
        userName: parsedData.userName,
        userImage: parsedData.userImage || null,
        purchasedCourseId: parsedData.purchasedCourse,
        reviewText: parsedData.reviewText,
        reviewImage: parsedData.reviewImage || null,
        givenStar: parsedData.givenStar,
      },
    });

    return newReview;
  } catch (error) {
    console.error("Error saving the review:", error);
    throw new Error("Failed to save review. Please try again.");
  }
}

export async function _getCommonReviews() {
  try {
    // Fetch all approved reviews for stats
    const allReviews = await prisma.userReview.findMany({
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
          select: {
            id: true,
            title: true,
            link: true,
          },
        },
      },
      orderBy: { reviewDate: "desc" }, // latest first
    });

    // Calculate statistics
    const totalReviews = allReviews.length;
    const averageRating =
      totalReviews > 0
        ? allReviews.reduce((sum, r) => sum + r.givenStar, 0) / totalReviews
        : 0;

    // Count reviews per star
    const starCounts = [5, 4, 3, 2, 1].reduce<Record<number, number>>(
      (acc, star) => {
        acc[star] = allReviews.filter((r) => r.givenStar === star).length;
        return acc;
      },
      {} as Record<number, number>
    );

    // Only show latest 3 reviews for homepage
    const latestReviews = allReviews.slice(0, 3);

    return {
      latestReviews,
      stats: {
        totalReviews,
        averageRating,
        starCounts,
      },
    };
  } catch (error) {
    console.error("Error fetching home reviews:", error);
    return {
      latestReviews: [],
      stats: {
        totalReviews: 0,
        averageRating: 0,
        starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
    };
  }
}

export const getCommonReviews = unstable_cache(
  _getCommonReviews,
  ["common-reviews"],
  {
    tags: ["user-review:common"],
  }
);

export async function _getAllReviews() {
  try {
    const allReviews = await prisma.userReview.findMany({
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
          select: {
            id: true,
            title: true,
            link: true,
          },
        },
      },
      orderBy: { reviewDate: "desc" }, // latest first
    });
    return allReviews;
  } catch (error) {
    console.error("Error fetching review:", error);
  }
}
export const getAllReviews = unstable_cache(_getAllReviews, ["reviews"], {
  tags: ["user-review:all"],
});
