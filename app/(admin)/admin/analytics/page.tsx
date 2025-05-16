import { Suspense } from "react";

import { fetchDashboardData } from "@/app/(admin)/action/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { Browsers } from "../../components/analytics/browser";
import { DateRangeSelector } from "../../components/analytics/date-range-selector";
import { DeviceCategories } from "../../components/analytics/device-categories";
import { Overview } from "../../components/analytics/overview";
import { Stats } from "../../components/analytics/stats";
import { TopCountry } from "../../components/analytics/top-country";
import { TopPages } from "../../components/analytics/top-pages";
import { TopReferrers } from "../../components/analytics/top-referrers";
// Loading component for Suspense
function LoadingDashboard() {
  return (
    <div className="max-w-7xl space-y-6 w-full mx-auto px-5 py-10">
      <div className="flex justify-end mb-4">
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
      </div>
      <Skeleton className="h-[350px] w-full" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
}

// Analytics dashboard component
async function AnalyticsDashboard({ days }: { days: number }) {
  const data = await fetchDashboardData(days);

  return (
    <div className="max-w-7xl space-y-6 w-full mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="flex justify-end mb-4">
        <DateRangeSelector />
      </div>
      <Stats data={data.analyticsData} days={days} />
      <Overview data={data.analyticsData} days={days} />
      <TopReferrers data={data.topReferrers} days={days} />
      <TopCountry data={data.userCountries} days={days} />
      <DeviceCategories data={data.deviceCategories} days={days} />
      <Browsers data={data.browsers} days={days} />
      <TopPages data={data.topPages} days={days} />
    </div>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Get the days parameter from the URL or default to 30
  const params = await searchParams;
  const days = params.days ? Number.parseInt(params.days as string) : 30;

  return (
    <Suspense key={days} fallback={<LoadingDashboard />}>
      <AnalyticsDashboard days={days} />
    </Suspense>
  );
}
