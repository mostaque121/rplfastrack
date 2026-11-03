// app/lib/use-dashboard-data.ts

"use client";

import { useQuery } from "@tanstack/react-query";
// Update the path if your action file is located elsewhere
import { getAllDashboardStats } from "../action/home";

export function useDashboardData() {
  return useQuery({
    // A single query key for all dashboard data
    queryKey: ["allDashboardStats"],
    queryFn: getAllDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Optional: prevents refetching every time you switch tabs
  });
}
