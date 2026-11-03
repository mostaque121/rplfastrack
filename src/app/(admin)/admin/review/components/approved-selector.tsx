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

export function ApprovedSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current approved value, default to "true"
  const currentApproved = searchParams.get("approved") ?? "true";

  const setApproved = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("approved", value);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Filter:</span>
      <Select value={currentApproved} onValueChange={setApproved}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select approval status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Approved</SelectItem>
          <SelectItem value="false">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
