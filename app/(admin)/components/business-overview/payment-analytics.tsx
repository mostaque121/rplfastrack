"use client";

import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FilterType } from "@/type/type";
import { getPaymentAnalytics } from "../../action/payment-analytics";
import { DistributionCharts } from "../business-overview/distribution-charts";
import { FilterControls } from "../business-overview/filter-control";
import { InsightsSection } from "../business-overview/insights-section";
import { OverviewMetrics } from "../business-overview/overview-metrics";
import { TrendCharts } from "../business-overview/trend-charts";
import TopQualifications from "./top-qualifications";

export default function PaymentAnalytics() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("timeRange");
  const [timeRange, setTimeRange] = useState<
    "7d" | "30d" | "90d" | "6m" | "1y"
  >("6m");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [monthFilter, setMonthFilter] = useState<string>("2024-06");

  const filters = useMemo(() => {
    return {
      type: activeFilter,
      timeRange: activeFilter === "timeRange" ? timeRange : undefined,
      dateRange:
        activeFilter === "dateRange" && dateRange?.from && dateRange?.to
          ? { from: dateRange.from, to: dateRange.to }
          : undefined,
      monthFilter: activeFilter === "monthFilter" ? monthFilter : undefined,
    };
  }, [activeFilter, timeRange, dateRange, monthFilter]);

  const { data, error, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: ["paymentAnalytics", filters],
    queryFn: async () => {
      const result = await getPaymentAnalytics(filters);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch analytics data");
      }
      return result.data; // Only return the AnalyticsData
    },
    enabled: !!filters,
  });

  const handleFilterTypeChange = (filterType: FilterType) => {
    setActiveFilter(filterType);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as "7d" | "30d" | "90d" | "6m" | "1y");
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleMonthFilterChange = (value: string) => {
    setMonthFilter(value);
  };

  const analytics = data || null;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Business Analytics</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Comprehensive insights into your business performance
          </p>
        </div>

        <FilterControls
          activeFilter={activeFilter}
          timeRange={timeRange}
          dateRange={dateRange}
          monthFilter={monthFilter}
          hasFilterChanged={isFetching}
          loading={isLoading || isFetching}
          onFilterTypeChange={handleFilterTypeChange}
          onTimeRangeChange={handleTimeRangeChange}
          onDateRangeChange={handleDateRangeChange}
          onMonthFilterChange={handleMonthFilterChange}
          onFetchData={refetch}
        />

        {isError ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 font-medium mb-2">
                Error Loading Analytics
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {error instanceof Error ? error.message : "Failed to load data"}
              </p>
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 mt-6">
            <OverviewMetrics
              loading={isLoading || isFetching}
              analytics={analytics}
            />
            <TrendCharts
              loading={isLoading || isFetching}
              analytics={analytics}
            />
            <DistributionCharts
              loading={isLoading || isFetching}
              analytics={analytics}
            />
            <TopQualifications
              loading={isLoading || isFetching}
              analytics={analytics}
            />
            <InsightsSection
              loading={isLoading || isFetching}
              analytics={analytics}
            />
          </div>
        )}
      </div>
    </div>
  );
}
