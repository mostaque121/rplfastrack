"use server";

import { z } from "zod";

import { prisma } from "@/server/db";

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

// New reviews start unapproved, so no public cache tag changes here.
export async function saveReview(input: FormData) {
  const parsedData = ReviewSchema.parse(input);

  try {
    await prisma.userReview.create({
      data: {
        userName: parsedData.userName,
        userImage: parsedData.userImage || null,
        purchasedCourseId: parsedData.purchasedCourse,
        reviewText: parsedData.reviewText,
        reviewImage: parsedData.reviewImage || null,
        givenStar: parsedData.givenStar,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving the review:", error);
    return { success: false };
  }
}
