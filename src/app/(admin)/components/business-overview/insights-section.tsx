"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyticsData } from "@/type/type";

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
          <CardDescription>
            Colleges ranked by revenue generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.distributions.topColleges.map((college, index) => (
              <div
                key={college.college}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{college.college}</p>
                    <p className="text-sm text-muted-foreground">
                      {college.students} students
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-medium">
                    ${college.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    $
                    {Math.round(
                      college.revenue / college.students
                    ).toLocaleString()}
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
          <CardDescription>
            AI-powered insights from your business data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
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
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                    {insight.value && (
                      <p className="text-lg font-semibold mt-2">
                        {insight.value}
                      </p>
                    )}
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
          <Skeleton className="h-5 w-56 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <Skeleton className="h-4 w-20 ml-auto" />
                <Skeleton className="h-3 w-24 ml-auto" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Insights Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-44 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
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
