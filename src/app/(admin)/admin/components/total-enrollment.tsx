"use client";

import { GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EnrollmentStatsProps {
  data?: number;
  isLoading: boolean;
  error?: Error;
}

export function EnrollmentStatsCard({ data, isLoading, error }: EnrollmentStatsProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
      <CardContent className="px-4 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200">
            <GraduationCap className="h-5 w-5 text-gray-700" />
          </div>

          <p className="text-xs font-medium text-gray-600">Enrollments in last 30 days</p>

          {isLoading ? (
            <Skeleton className="mx-auto h-7 w-16 bg-gray-300" />
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
