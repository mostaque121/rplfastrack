"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, CalendarIcon, Loader2, Search } from "lucide-react";

interface PaymentFiltersProps {
  searchTerm: string;
  isFetching: boolean;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  monthFilter: string;
  setMonthFilter: (value: string) => void;
  dateFilterType: "month" | "range";
  setDateFilterType: (type: "month" | "range") => void;
  startDate?: Date;
  setStartDate: (date?: Date) => void;
  endDate?: Date;
  setEndDate: (date?: Date) => void;
  monthOptions: Array<{ value: string; label: string }>;
  onClearFilters: () => void;
}

export function PaymentFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  monthFilter,
  setMonthFilter,
  dateFilterType,
  setDateFilterType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  monthOptions,
  onClearFilters,
  isFetching,
}: PaymentFiltersProps) {
  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "all" ||
    monthFilter !== "all" ||
    startDate ||
    endDate;

  const handleDateFilterTypeChange = (type: "month" | "range") => {
    setDateFilterType(type);
    if (type === "month") {
      setStartDate(undefined);
      setEndDate(undefined);
    } else {
      setMonthFilter("all");
    }
  };

  return (
    <div className="space-y-4">
      {/* First Row - Search and Status */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, email, phone, or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-10 text-sm border-gray-200">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="installment">Installment</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Second Row - Date Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2">
          <Button
            variant={dateFilterType === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateFilterTypeChange("month")}
            className="h-9 px-3 text-sm font-medium"
          >
            <Calendar className="h-4 w-4 mr-1" />
            By Month
          </Button>
          <Button
            variant={dateFilterType === "range" ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateFilterTypeChange("range")}
            className="h-9 px-3 text-sm font-medium"
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            Date Range
          </Button>
        </div>

        {dateFilterType === "month" && (
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-9 text-sm border-gray-200">
              <SelectValue placeholder="Select month" />
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

        {dateFilterType === "range" && (
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal h-9 text-sm border-gray-200",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date: Date) =>
                    date > new Date() || (endDate ? date > endDate : false)
                  }
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal h-9 text-sm border-gray-200",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "End date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date: Date) =>
                    date > new Date() || (startDate ? date < startDate : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {isFetching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-9 text-sm font-medium"
              >
                Clear Filters
              </Button>
            )
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-muted-foreground">
            Active filters:
          </span>
          {searchTerm && (
            <Badge variant="secondary" className="text-xs">
              Search: {searchTerm}
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Status: {statusFilter}
            </Badge>
          )}
          {monthFilter !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Month: {monthOptions.find((m) => m.value === monthFilter)?.label}
            </Badge>
          )}
          {startDate && (
            <Badge variant="secondary" className="text-xs">
              From: {format(startDate, "MMM dd, yyyy")}
            </Badge>
          )}
          {endDate && (
            <Badge variant="secondary" className="text-xs">
              To: {format(endDate, "MMM dd, yyyy")}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
