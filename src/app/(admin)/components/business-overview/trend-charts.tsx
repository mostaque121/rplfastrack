"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyticsData } from "@/type/type";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  primary: "hsl(0, 0%, 15%)", // Very dark gray
  success: "hsl(0, 0%, 25%)", // Dark gray
  warning: "hsl(0, 0%, 35%)", // Medium-dark gray
};

interface TrendChartsProps {
  analytics: AnalyticsData | null;
  loading: boolean;
}

export function TrendCharts({ analytics, loading }: TrendChartsProps) {
  if (loading || !analytics) return <TrendChartsSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Revenue & Profit Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue & Profit Trends</CardTitle>
          <CardDescription>
            Combined revenue and profit analysis over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: "Revenue", color: COLORS.primary },
              profit: { label: "Profit", color: COLORS.success },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.trends.revenueAndProfit}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="bg-background border rounded-md shadow-md p-3">
                        <p className="font-medium text-sm">{label}</p>
                        <div className="mt-1 space-y-1">
                          {payload.map((entry, index) => (
                            <div
                              key={`tooltip-${index}`}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-sm font-medium">
                                {entry.name}:
                              </span>
                              <span className="text-sm">
                                ${Number(entry.value).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke={COLORS.primary}
                  fill={COLORS.primary}
                  fillOpacity={0.6}
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="2"
                  stroke={COLORS.success}
                  fill={COLORS.success}
                  fillOpacity={0.6}
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Enrollment Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enrollment Trends</CardTitle>
          <CardDescription>New student enrollments over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              enrollments: { label: "Enrollments", color: COLORS.warning },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics.trends.enrollments}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="bg-background border rounded-md shadow-md p-3">
                        <p className="font-medium text-sm">{label}</p>
                        <div className="mt-1 space-y-1">
                          {payload.map((entry, index) => (
                            <div
                              key={`tooltip-${index}`}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-sm font-medium">
                                {entry.name}:
                              </span>
                              <span className="text-sm">
                                {Number(entry.value).toLocaleString()} students
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null
                  }
                />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  stroke={COLORS.warning}
                  strokeWidth={3}
                  dot={{ fill: COLORS.warning, strokeWidth: 2, r: 4 }}
                  name="Enrollments"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// 🔧 Skeleton when loading
function TrendChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {[...Array(2)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" /> {/* Title */}
            <Skeleton className="h-4 w-64" /> {/* Description */}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full rounded-md" />{" "}
            {/* Chart area */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
