"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function DateRangeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current days parameter or default to 30
  const currentDays = searchParams.get("days") || "30";

  // Update the URL with the new days parameter
  const setDays = useCallback(
    (days: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("days", days);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Time period:</span>
      <Select value={currentDays} onValueChange={setDays}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="365">Last year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
