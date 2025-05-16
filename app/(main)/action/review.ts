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

export async function _getAllReviews() {
  try {
    const reviews = await prisma.userReview.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        approved: true,
      },
      include: {
        purchasedCourse: true,
      },
    });
    return reviews;
  } catch (error) {
    console.error("Error fetching review:", error);
  }
}
export const getAllReviews = unstable_cache(_getAllReviews, ["reviews"], {
  tags: ["user-review:all"],
});
