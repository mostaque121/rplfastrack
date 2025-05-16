"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { checkAccess } from "./helper";

export const getAllReview = async (
  search: string,
  approved: boolean,
  page: number,
  pageSize: number
) => {
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
};

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

    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}
