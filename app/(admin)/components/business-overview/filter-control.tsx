"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterType } from "@/type/type";
import { format } from "date-fns";

interface FilterControlsProps {
  activeFilter: FilterType;
  timeRange: "7d" | "30d" | "90d" | "6m" | "1y" | "All";
  startDate?: Date;
  endDate?: Date;
  monthFilter: string;
  hasFilterChanged: boolean;
  loading: boolean;
  onFilterTypeChange: (filterType: FilterType) => void;
  onTimeRangeChange: (value: string) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onMonthFilterChange: (value: string) => void;
  onFetchData: () => void;
}

const generateMonthOptions = () => {
  const options = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  for (let year = currentYear - 2; year <= currentYear; year++) {
    const endMonth = year === currentYear ? currentMonth : 11;
    for (let month = 0; month <= endMonth; month++) {
      const date = new Date(year, month, 1);
      options.push({
        value: format(date, "yyyy-MM"),
        label: format(date, "MMMM yyyy"),
      });
    }
  }
  return options.reverse();
};

export function FilterControls({
  activeFilter,
  timeRange,
  startDate,
  endDate,
  monthFilter,
  hasFilterChanged,
  loading,
  onFilterTypeChange,
  onTimeRangeChange,
  onStartDateChange,
  onEndDateChange,
  onMonthFilterChange,
  onFetchData,
}: FilterControlsProps) {
  const monthOptions = generateMonthOptions();

  const getActiveFilterDisplay = () => {
    switch (activeFilter) {
      case "timeRange":
        const timeRangeLabels = {
          All: "All",
          "7d": "Last 7 days",
          "30d": "Last 30 days",
          "90d": "Last 90 days",
          "6m": "Last 6 months",
          "1y": "Last 1 year",
        };
        return timeRangeLabels[timeRange];
      case "dateRange":
        if (startDate && endDate) {
          return `${format(startDate, "MMM dd, yyyy")} - ${format(
            endDate,
            "MMM dd, yyyy"
          )}`;
        }
        return "Custom date range";
      case "monthFilter":
        return monthFilter === "all"
          ? "All Months"
          : monthOptions.find((m) => m.value === monthFilter)?.label;
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Data Filters</CardTitle>
          <CardDescription>
            Select one filter type to analyze your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === "timeRange" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterTypeChange("timeRange")}
              className="h-9"
            >
              Time Range
            </Button>
            <Button
              variant={activeFilter === "dateRange" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterTypeChange("dateRange")}
              className="h-9"
            >
              Custom Date Range
            </Button>
            <Button
              variant={activeFilter === "monthFilter" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterTypeChange("monthFilter")}
              className="h-9"
            >
              Specific Month
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {activeFilter === "timeRange" && (
                <Select value={timeRange} onValueChange={onTimeRangeChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">Last 1 year</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {activeFilter === "dateRange" && (
                <div className="flex gap-2">
                  <DatePicker
                    value={startDate}
                    onChange={onStartDateChange}
                    label="Start Date"
                  />
                  <DatePicker
                    value={endDate}
                    onChange={onEndDateChange}
                    label="End Date"
                  />
                </div>
              )}

              {activeFilter === "monthFilter" && (
                <Select value={monthFilter} onValueChange={onMonthFilterChange}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {monthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {hasFilterChanged && (
              <Button
                onClick={onFetchData}
                disabled={loading}
                className="shrink-0"
              >
                {loading ? "Loading..." : "Fetch Data"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-medium">
            Active Filter
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            {activeFilter === "timeRange" && "Time Range:"}
            {activeFilter === "dateRange" && "Date Range:"}
            {activeFilter === "monthFilter" && "Month:"}
          </span>
          <span className="text-sm font-semibold">
            {getActiveFilterDisplay()}
          </span>
        </div>
        {!hasFilterChanged && (
          <Badge variant="outline" className="text-xs">
            Data Current
          </Badge>
        )}
      </div>
    </div>
  );
}
