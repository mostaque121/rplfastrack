"use server";

import { prisma } from "@/lib/prisma";

export async function getCourseStat() {
  try {
    const data = await prisma.course.count();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { success: false, error: "Failed to fetch analytics data" };
  }
}
export async function getEnrollmentStat() {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const data = await prisma.payment.count({
      where: {
        enrollmentDate: {
          gte: last30Days,
        },
      },
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { success: false, error: "Failed to fetch analytics data" };
  }
}
export async function getFormSubmissionStat() {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const response = await prisma.response.count({
      where: {
        createdAt: {
          gte: last30Days,
        },
      },
    });
    const eligibilitySubmission = await prisma.eligibilitySubmission.count({
      where: {
        createdAt: {
          gte: last30Days,
        },
      },
    });

    return { success: true, data: { response, eligibilitySubmission } };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { success: false, error: "Failed to fetch analytics data" };
  }
}

export async function getReviewStat() {
  try {
    const [total, pending] = await prisma.$transaction([
      prisma.userReview.count(),
      prisma.userReview.count({
        where: {
          approved: false,
        },
      }),
    ]);

    return {
      success: true,
      data: {
        total,
        pending,
      },
    };
  } catch (error) {
    console.error("Error fetching review stats:", error);
    return {
      success: false,
      error: "Failed to fetch review stats",
    };
  }
}

export async function getAdminPannelStat() {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: "admin",
      },
      select: {
        name: true,
        email: true,
        image: true,
      },
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching admin panel stats:", error);
    return {
      success: false,
      error: "Failed to fetch analytics data",
    };
  }
}
