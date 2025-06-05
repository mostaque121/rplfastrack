"use client";

import { subMonths } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AnalyticsData, FilterType } from "@/type/type";
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
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasFilterChanged, setHasFilterChanged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        type: activeFilter,
        timeRange: activeFilter === "timeRange" ? timeRange : undefined,
        dateRange:
          activeFilter === "dateRange" && dateRange?.from && dateRange?.to
            ? { from: dateRange.from, to: dateRange.to }
            : undefined,
        monthFilter: activeFilter === "monthFilter" ? monthFilter : undefined,
      };

      const result = await getPaymentAnalytics(filters);

      if (result.success && result.data) {
        setAnalytics(result.data);
        setHasFilterChanged(false);
        setIsInitialLoad(false);
      } else {
        setError(result.error || "Failed to fetch analytics data");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error loading analytics:", err);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, timeRange, dateRange, monthFilter]);

  // Load data on initial mount
  useEffect(() => {
    if (isInitialLoad) {
      loadAnalytics();
    }
  }, [loadAnalytics, isInitialLoad]);

  const fetchData = () => {
    loadAnalytics();
  };

  const handleFilterTypeChange = (filterType: FilterType) => {
    setActiveFilter(filterType);
    setHasFilterChanged(true);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as "7d" | "30d" | "90d" | "6m" | "1y");
    setHasFilterChanged(true);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setHasFilterChanged(true);
  };

  const handleMonthFilterChange = (value: string) => {
    setMonthFilter(value);
    setHasFilterChanged(true);
  };

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
          hasFilterChanged={hasFilterChanged}
          loading={loading}
          onFilterTypeChange={handleFilterTypeChange}
          onTimeRangeChange={handleTimeRangeChange}
          onDateRangeChange={handleDateRangeChange}
          onMonthFilterChange={handleMonthFilterChange}
          onFetchData={fetchData}
        />

        {/* Conditional content */}
        {error ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 font-medium mb-2">
                Error Loading Analytics
              </p>
              <p className="text-muted-foreground text-sm mb-4">{error}</p>
              <Button onClick={fetchData} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Render main analytics content if data is available
          <div className="space-y-6 mt-6">
            <OverviewMetrics loading={loading} analytics={analytics} />
            <TrendCharts loading={loading} analytics={analytics} />
            <DistributionCharts loading={loading} analytics={analytics} />
            <TopQualifications loading={loading} analytics={analytics} />
            <InsightsSection loading={loading} analytics={analytics} />
          </div>
        )}
      </div>
    </div>
  );
}
