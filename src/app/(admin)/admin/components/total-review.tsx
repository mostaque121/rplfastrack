"use client";

import { MessageSquare, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Data {
  total: number;
  pending: number;
}
interface ReviewStatsProps {
  data?: Data;
  isLoading: boolean;
  error?: Error;
}

export function ReviewStatsCard({ data, isLoading, error }: ReviewStatsProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
      <CardContent className="flex flex-col items-center gap-3 px-4 py-6 text-center">
        <div className="flex h-10 items-center justify-center gap-1 rounded-lg bg-gray-200 px-3">
          <MessageSquare className="h-5 w-5" />
          <Star className="h-4 w-4" />
        </div>

        <p className="text-xs font-medium text-gray-600">Review Summary</p>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="mx-auto h-6 w-20" />
            <Skeleton className="mx-auto h-5 w-16" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">Failed to load data</p>
        ) : (
          <>
            <p className="text-xl font-bold text-gray-900">{data?.total ?? 0} Reviews</p>
            <p className="text-sm text-gray-700">{data?.pending ?? 0} Pending Approval</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
