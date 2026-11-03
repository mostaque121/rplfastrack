"use client";

import { ClipboardList } from "lucide-react"; // more relevant than CreditCard

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
interface Data {
  response: number;
  eligibilitySubmission: number;
}
interface FormSubmissionStatsProps {
  data?: Data;
  isLoading: boolean;
  error?: Error;
}

export function FormSubmissionStatsCard({ data, isLoading, error }: FormSubmissionStatsProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
      <CardContent className="px-4 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200">
            <ClipboardList className="h-5 w-5 text-gray-700" />
          </div>

          <p className="text-xs font-medium text-gray-600">Forms submitted (last 30 days)</p>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="mx-auto h-6 w-24" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">Error loading data</p>
          ) : (
            <div className="space-y-1">
              <p className="text-xl font-bold text-gray-900">{data?.response ?? 0} Responses</p>
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
