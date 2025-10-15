"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Star } from "lucide-react";

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
    <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
      <CardContent className="py-6 px-4 flex flex-col items-center text-center gap-3">
        <div className="flex gap-1 px-3 h-10 bg-gray-200 rounded-lg items-center justify-center">
          <MessageSquare className="h-5 w-5" />
          <Star className="h-4 w-4" />
        </div>

        <p className="text-xs font-medium text-gray-600">Review Summary</p>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-20 mx-auto" />
            <Skeleton className="h-5 w-16 mx-auto" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">Failed to load data</p>
        ) : (
          <>
            <p className="text-xl font-bold text-gray-900">
              {data?.total ?? 0} Reviews
            </p>
            <p className="text-sm text-gray-700">
              {data?.pending ?? 0} Pending Approval
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
