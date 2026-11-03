import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { format, subDays } from "date-fns";

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
});

export const property = `properties/${process.env.GA4_PROPERTY_ID}`;

export function getDateRange(days: number) {
  const today = new Date();
  const startDate = subDays(today, days);
  return {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  };
}
