"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyticsData } from "@/types/shared";

interface InsightsSectionProps {
  analytics: AnalyticsData | null;
  loading: boolean;
}

export function InsightsSection({ analytics, loading }: InsightsSectionProps) {
  if (loading || !analytics) return <InsightsSectionSkeleton />;

  return (
    <div className="space-y-6">
      {/* Top Colleges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Colleges</CardTitle>
          <CardDescription>Colleges ranked by revenue generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.distributions.topColleges.map((college, index) => (
              <div
                key={college.college}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{college.college}</p>
                    <p className="text-sm text-muted-foreground">{college.students} students</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-medium">${college.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    ${Math.round(college.revenue / college.students).toLocaleString()}
                    /student
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Insights</CardTitle>
          <CardDescription>AI-powered insights from your business data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {analytics.insights.map((insight, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <Badge
                    variant={
                      insight.type === "positive"
                        ? "default"
                        : insight.type === "negative"
                          ? "destructive"
                          : "secondary"
                    }
                    className="shrink-0"
                  >
                    {insight.type}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                    {insight.value && <p className="mt-2 text-lg font-semibold">{insight.value}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 🔧 Loading Skeleton Component
function InsightsSectionSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Colleges Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 h-5 w-56" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="shrink-0 space-y-1 text-right">
                <Skeleton className="ml-auto h-4 w-20" />
                <Skeleton className="ml-auto h-3 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Insights Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 h-5 w-44" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-4">
                <div className="flex gap-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
