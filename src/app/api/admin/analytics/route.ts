import {
  analyticsDataClient,
  getDateRange,
  property,
} from "@/lib/analytics-client";
import { withAdminGuard } from "@/lib/withAdminGuard";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAdminGuard(async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30", 10);
    const standardDateRanges = [getDateRange(days)];

    // Batch 1 (5 queries)
    const batch1Requests = [
      {
        dateRanges: standardDateRanges,
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "userEngagementDuration" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
      },
      {
        dateRanges: standardDateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "userEngagementDuration" },
        ],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      },
      {
        dateRanges: standardDateRanges,
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }, { name: "userEngagementDuration" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      },
      {
        dateRanges: standardDateRanges,
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      },
      {
        dateRanges: standardDateRanges,
        dimensions: [{ name: "browser" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      },
    ];

    // Batch 2 (1 query)
    const batch2Requests = [
      {
        dateRanges: standardDateRanges,
        dimensions: [{ name: "country" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      },
    ];

    // Execute concurrently
    const [[batch1Response], [batch2Response]] = await Promise.all([
      analyticsDataClient.batchRunReports({
        property,
        requests: batch1Requests,
      }),
      analyticsDataClient.batchRunReports({
        property,
        requests: batch2Requests,
      }),
    ]);

    const [analyticsData, topPages, topReferrers, deviceCategories, browsers] =
      batch1Response.reports || [];
    const [userCountries] = batch2Response.reports || [];

    return NextResponse.json({
      success: true,
      data: {
        analyticsData,
        topPages,
        topReferrers,
        deviceCategories,
        browsers,
        userCountries,
        days,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch GA4 dashboard data" },
      { status: 500 },
    );
  }
});
