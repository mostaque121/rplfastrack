// app/action/home.ts

"use server";

import { prisma } from "@/lib/prisma";
import { getTotalUsersLast30Days } from "./analytics"; // Ensure this path is correct

export async function getAllDashboardStats() {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    // Run all independent async operations concurrently.
    const [dbResults, visitorCount] = await Promise.all([
      // 1. All database queries are grouped in a single transaction.
      prisma.$transaction([
        prisma.course.count(),
        prisma.payment.count({
          where: { enrollmentDate: { gte: last30Days } },
        }),
        prisma.response.count({ where: { createdAt: { gte: last30Days } } }),
        prisma.eligibilitySubmission.count({
          where: { createdAt: { gte: last30Days } },
        }),
        prisma.userReview.count(),
        prisma.userReview.count({ where: { approved: false } }),
        prisma.user.findMany({
          where: { role: "admin" },
          select: { name: true, email: true, image: true },
        }),
      ]),

      // 2. The analytics function which returns a number.
      getTotalUsersLast30Days(),
    ]);

    // Destructure the results from the transaction array.
    const [
      courseCount,
      enrollmentCount,
      responseCount,
      eligibilitySubmissionCount,
      totalReviews,
      pendingReviews,
      adminList,
    ] = dbResults;

    // Assemble the final data object.
    const responseData = {
      courseStats: courseCount,
      enrollmentStats: enrollmentCount,
      formSubmissionStats: {
        response: responseCount,
        eligibilitySubmission: eligibilitySubmissionCount,
      },
      reviewStats: {
        total: totalReviews,
        pending: pendingReviews,
      },
      adminList: adminList,
      // *** THIS IS THE FIX ***
      // We now assign the returned number directly to visitorStats.
      visitorStats: visitorCount,
    };

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error fetching all dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard data" };
  }
}
