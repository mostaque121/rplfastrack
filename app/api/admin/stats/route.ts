import { analyticsDataClient, getDateRange } from "@/lib/analytics-client";
import { prisma } from "@/lib/prisma";
import { withAdminGuard } from "@/lib/withAdminGuard";
import { NextResponse } from "next/server";

const property = `properties/${process.env.GA4_PROPERTY_ID}`;

// Inline helper to fetch the visitor count
async function fetchTotalUsersLast30Days() {
  try {
    const { startDate, endDate } = getDateRange(30);

    const [response] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: "totalUsers" }],
    });

    return Number(response.rows?.[0]?.metricValues?.[0]?.value || "0");
  } catch (error) {
    console.error("Failed to get GA4 total users:", error);
    return 0;
  }
}

export const GET = withAdminGuard(async function GET() {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    // OPTIMIZATION: Flattened Promise.all.
    // Every single database count and the external GA4 API call now execute completely in parallel.
    const [
      courseCount,
      invoiceCount,
      responseCount,
      eligibilitySubmissionCount,
      totalReviews,
      pendingReviews,
      adminList,
      visitorCount,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.invoice.count({
        where: { invoiceDate: { gte: last30Days } },
      }),
      prisma.response.count({
        where: { createdAt: { gte: last30Days } },
      }),
      prisma.eligibilitySubmission.count({
        where: { createdAt: { gte: last30Days } },
      }),
      prisma.userReview.count(),
      prisma.userReview.count({
        where: { approved: false },
      }),
      prisma.user.findMany({
        where: { role: "admin" },
        select: { name: true, email: true, image: true },
      }),
      fetchTotalUsersLast30Days(),
    ]);

    // Assemble the final structured data object.
    const responseData = {
      courseStats: courseCount,
      invoiceStats: invoiceCount,
      formSubmissionStats: {
        response: responseCount,
        eligibilitySubmission: eligibilitySubmissionCount,
      },
      reviewStats: {
        total: totalReviews,
        pending: pendingReviews,
      },
      adminList: adminList,
      visitorStats: visitorCount,
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error fetching all dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
});
