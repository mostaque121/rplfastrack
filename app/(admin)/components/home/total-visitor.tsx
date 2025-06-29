"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

interface VisitorStatsProps {
  data?: number;
  isLoading: boolean;
  error: Error | null;
}

export function VisitorStatsCard({
  data,
  isLoading,
  error,
}: VisitorStatsProps) {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
      <CardContent className="py-6 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-gray-700" />
          </div>

          <p className="text-xs font-medium text-gray-600">
            Visitors in the last 30 days
          </p>

          {isLoading ? (
            <Skeleton className="h-7 bg-gray-300 w-16 mx-auto" />
          ) : error ? (
            <p className="text-sm text-red-500">Failed to load</p>
          ) : (
            <p className="text-xl font-bold text-gray-900">{data ?? 0}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
