"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList } from "lucide-react"; // more relevant than CreditCard
interface Data {
  response: number;
  eligibilitySubmission: number;
}
interface FormSubmissionStatsProps {
  data?: Data;
  isLoading: boolean;
  error?: Error;
}

export function FormSubmissionStatsCard({
  data,
  isLoading,
  error,
}: FormSubmissionStatsProps) {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
      <CardContent className="py-6 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-gray-700" />
          </div>

          <p className="text-xs font-medium text-gray-600">
            Forms submitted (last 30 days)
          </p>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-20 mx-auto" />
              <Skeleton className="h-6 w-24 mx-auto" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">Error loading data</p>
          ) : (
            <div className="space-y-1">
              <p className="text-xl font-bold text-gray-900">
                {data?.response ?? 0} Responses
              </p>
              <p className="text-xl font-semibold text-gray-700">
                {data?.eligibilitySubmission ?? 0} Eligibilities
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
