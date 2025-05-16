/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { format, subDays } from "date-fns";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
});

const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

function getDateRange(days: number) {
  const today = new Date();
  const startDate = subDays(today, days);
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(today),
  };
}

async function runReport(
  dimensions: string[],
  metrics: string[],
  days = 30,
  orderBy?: any
) {
  try {
    const { startDate, endDate } = getDateRange(days);

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      orderBys: orderBy ? [orderBy] : undefined,
    });

    return response;
  } catch (error) {
    console.error("Error running GA4 report:", error);
    throw error;
  }
}

// Dashboard Data Fetcher
export async function fetchDashboardData(days = 30) {
  try {
    const [
      analyticsData,
      topPages,
      topReferrers,
      deviceCategories,
      browsers,
      userCountries,
    ] = await Promise.all([
      getAnalyticsData(days),
      getTopPages(days),
      getTopReferrers(days),
      getDeviceCategories(days),
      getBrowsers(days),
      getUserCountries(days),
    ]);

    return {
      analyticsData,
      topPages,
      topReferrers,
      deviceCategories,
      browsers,
      userCountries,
      days,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}

// Reports
async function getAnalyticsData(days = 30) {
  return runReport(
    ["date"],
    [
      "sessions",
      "totalUsers",
      "screenPageViews",
      "bounceRate",
      "userEngagementDuration",
    ],
    days,
    {
      dimension: { dimensionName: "date" },
      desc: false,
    }
  );
}

async function getTopPages(days = 30) {
  return runReport(
    ["pagePath"],
    ["screenPageViews", "userEngagementDuration"],
    days,
    {
      metric: { metricName: "screenPageViews" },
      desc: true,
    }
  );
}

async function getTopReferrers(days = 30) {
  return runReport(
    ["sessionSource"],
    ["sessions", "userEngagementDuration"],
    days,
    {
      metric: { metricName: "sessions" },
      desc: true,
    }
  );
}

async function getDeviceCategories(days = 30) {
  return runReport(["deviceCategory"], ["sessions"], days, {
    metric: { metricName: "sessions" },
    desc: true,
  });
}

async function getBrowsers(days = 30) {
  return runReport(["browser"], ["sessions"], days, {
    metric: { metricName: "sessions" },
    desc: true,
  });
}

// ✅ New: User countries report
async function getUserCountries(days = 30) {
  return runReport(["country"], ["sessions"], days, {
    metric: { metricName: "sessions" },
    desc: true,
  });
}
