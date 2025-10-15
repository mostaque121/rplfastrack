"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { reviewFormSchema } from "../lib/zod";
import { checkAccess } from "./helper";

export default async function getAllReview(
  search: string,
  approved: boolean,
  page: number,
  pageSize: number
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereCondition: any = {
    approved,
  };

  if (search) {
    whereCondition.OR = [
      { userName: { contains: search, mode: "insensitive" } },
      { reviewText: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const skip = (page - 1) * pageSize;

    const [reviews, totalItems] = await Promise.all([
      prisma.userReview.findMany({
        where: whereCondition,
        skip,
        orderBy: { reviewDate: "desc" },
        take: pageSize,
        include: {
          purchasedCourse: {
            select: {
              title: true,
              id: true,
              link: true,
              imageCoverLink: true,
              imageSquareLink: true,
            },
          },
        },
      }),

      prisma.userReview.count({ where: whereCondition }),
    ]);

    return {
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  } catch (err) {
    console.error("Failed to fetch review by search:", err);
    return {
      reviews: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      },
    };
  }
}

export async function toggleUserReviewPublish(id: string, approved: boolean) {
  try {
    const author = await checkAccess();

    if (!author || !author.id) {
      return {
        error: {
          _form: ["You must be an admin to update a review."],
        },
        data: null,
      };
    }

    await prisma.userReview.update({
      where: { id },
      data: { approved: approved },
    });

    revalidatePath("/admin/review");
    revalidateTag("user-review:all");
    revalidateTag("user-review:common");

    return { success: true };
  } catch (error) {
    console.error("Failed to toggle user review approval status:", error);
    throw new Error("Failed to toggle user review approval status");
  }
}

export async function deleteReview(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if the user is an admin
    const author = await checkAccess();
    if (!author || !author.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Delete the blog post in the database using Prisma
    await prisma.userReview.delete({
      where: { id },
    });

    revalidatePath("admin/review");
    revalidateTag("review:all");
    revalidateTag("user-review:common");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export async function saveReview(input: ReviewFormData) {
  try {
    const author = await checkAccess();

    if (!author || !author.id) {
      return {
        error: {
          _form: ["You must be an admin to update a review."],
        },
        data: null,
      };
    }
    const parsedData = reviewFormSchema.parse(input);

    await prisma.userReview.create({
      data: {
        userName: parsedData.userName,
        userImage: parsedData.userImage || null,
        purchasedCourseId: parsedData.purchasedCourse,
        reviewText: parsedData.reviewText,
        reviewImage: parsedData.reviewImage || null,
        givenStar: parsedData.givenStar,
        reviewDate: parsedData.reviewDate,
        approved: true,
      },
    });
    revalidatePath("/admin/review");
    revalidateTag("user-review:all");
    revalidateTag("user-review:common");
    return { success: true, message: "Review created successfully." };
  } catch (error: unknown) {
    console.error("Error saving review:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed.",
        errors: error.errors,
      };
    }
    throw new Error("Failed to save review. Please try again.");
  }
}

export async function updateReview(reviewId: string, input: ReviewFormData) {
  try {
    const author = await checkAccess();

    if (!author || !author.id) {
      return {
        error: {
          _form: ["You must be an admin to update a review."],
        },
        data: null,
      };
    }
    const parsedData = reviewFormSchema.parse(input);

    await prisma.userReview.update({
      where: { id: reviewId },
      data: {
        userName: parsedData.userName,
        userImage: parsedData.userImage || null,
        purchasedCourseId: parsedData.purchasedCourse,
        reviewText: parsedData.reviewText,
        reviewImage: parsedData.reviewImage || null,
        givenStar: parsedData.givenStar,
        reviewDate: parsedData.reviewDate,
      },
    });
    revalidatePath("/admin/review");
    revalidateTag("user-review:all");
    revalidateTag("user-review:common");
    return { success: true, message: "Review updated successfully." };
  } catch (error: unknown) {
    console.error("Error updating review:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed.",
        errors: error.errors,
      };
    }
    throw new Error("Failed to update review. Please try again.");
  }
}
