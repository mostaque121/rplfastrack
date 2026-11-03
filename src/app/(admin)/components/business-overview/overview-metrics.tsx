"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { AnalyticsData } from "@/type/type";
import {
  Calendar,
  DollarSign,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

interface OverviewMetricsProps {
  analytics: AnalyticsData | null;
  loading: boolean;
}

export function OverviewMetrics({ analytics, loading }: OverviewMetricsProps) {
  if (!analytics || loading) return <MetricsSkeleton />;

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${analytics.overview.totalRevenue.toLocaleString()}`,
      growth: analytics.overview.revenueGrowth,
      icon: DollarSign,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Net Profit",
      value: `$${analytics.overview.totalProfit.toLocaleString()}`,
      growth: analytics.overview.profitGrowth,
      icon: Target,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Students",
      value: analytics.overview.totalStudents.toLocaleString(),
      growth: analytics.overview.studentGrowth,
      icon: Users,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Avg Payment",
      value: `$${analytics.overview.averagePayment.toLocaleString()}`,
      growth: analytics.overview.avgPaymentGrowth,
      icon: Calendar,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Avg Profit",
      value: `$${analytics.overview.averageProfit.toLocaleString()}`,
      growth: analytics.overview.avgProfitGrowth,
      icon: Target,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground truncate">
                  {metric.title}
                </p>
                <p className="text-lg md:text-xl font-bold truncate">
                  {metric.value}
                </p>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    getGrowthColor(metric.growth)
                  )}
                >
                  {getGrowthIcon(metric.growth)}
                  <span>{Math.abs(metric.growth).toFixed(1)}%</span>
                </div>
              </div>
              <div className={cn("p-2 rounded-full shrink-0", metric.bgColor)}>
                <metric.icon className={cn("h-4 w-4", metric.iconColor)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Skeleton component placed outside for clarity
function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {[...Array(5)].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-24" /> {/* Title */}
                <Skeleton className="h-6 w-32" /> {/* Value */}
                <Skeleton className="h-3 w-20" /> {/* Growth */}
              </div>
              <div className="p-2 rounded-full shrink-0">
                <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon */}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
