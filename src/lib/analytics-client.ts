import { env } from "@/env";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { format, subDays } from "date-fns";

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY,
    project_id: env.GOOGLE_PROJECT_ID,
  },
});

export const property = `properties/${env.GA4_PROPERTY_ID}`;

export function getDateRange(days: number) {
  const today = new Date();
  const startDate = subDays(today, days);
  return {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  };
}
