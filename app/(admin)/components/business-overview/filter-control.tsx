"use client";

import { format } from "date-fns";
import { Filter } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterType } from "@/type/type";

interface FilterControlsProps {
  activeFilter: FilterType;
  timeRange: "7d" | "30d" | "90d" | "6m" | "1y";
  dateRange: DateRange | undefined;
  monthFilter: string;
  hasFilterChanged: boolean;
  loading: boolean;
  onFilterTypeChange: (filterType: FilterType) => void;
  onTimeRangeChange: (value: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
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
      const value = format(date, "yyyy-MM");
      const label = format(date, "MMMM yyyy");
      options.push({ value, label });
    }
  }

  return options.reverse();
};

export function FilterControls({
  activeFilter,
  timeRange,
  dateRange,
  monthFilter,
  hasFilterChanged,
  loading,
  onFilterTypeChange,
  onTimeRangeChange,
  onDateRangeChange,
  onMonthFilterChange,
  onFetchData,
}: FilterControlsProps) {
  const monthOptions = generateMonthOptions();

  const getActiveFilterDisplay = () => {
    switch (activeFilter) {
      case "timeRange":
        const timeRangeLabels = {
          "7d": "Last 7 days",
          "30d": "Last 30 days",
          "90d": "Last 90 days",
          "6m": "Last 6 months",
          "1y": "Last 1 year",
        };
        return timeRangeLabels[timeRange];
      case "dateRange":
        if (dateRange?.from && dateRange?.to) {
          return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
            dateRange.to,
            "MMM dd, yyyy"
          )}`;
        }
        return "Custom date range";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Selection */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Data Filters
          </CardTitle>
          <CardDescription>
            Select one filter type to analyze your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter Type Selector */}
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

          {/* Active Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1">
              {activeFilter === "timeRange" && (
                <Select value={timeRange} onValueChange={onTimeRangeChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">Last 1 year</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {activeFilter === "dateRange" && (
                <DatePickerWithRange
                  date={dateRange}
                  onDateChange={onDateRangeChange}
                  className="w-[300px]"
                />
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

      {/* Active Filter Display */}
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
