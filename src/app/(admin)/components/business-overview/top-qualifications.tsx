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
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface QualificationChartProps {
  loading: boolean;
  analytics: AnalyticsData | null;
}

const COLORS = {
  revenue: "hsl(0, 0%, 15%)", // Dark gray
  netProfit: "hsl(0, 0%, 25%)", // Medium dark gray
  students: "hsl(0, 0%, 35%)", // Light gray
};

export default function TopQualifications({
  loading,
  analytics,
}: QualificationChartProps) {
  if (loading || !analytics) return <QualificationSkeleton />;

  const data = analytics.distributions.topQualifications.map((item) => ({
    qualification: item.qualification,
    revenue: item.revenue,
    netProfit: item.netProfit,
    students: item.students,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Qualifications by Revenue</CardTitle>
        <CardDescription>
          Performance across key qualification programs
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[360px]">
        <ChartContainer
          config={{
            revenue: { label: "Revenue", color: COLORS.revenue },
            netProfit: { label: "Net Profit", color: COLORS.netProfit },
            students: { label: "Students", color: COLORS.students },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 20, left: 60, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={12} />
              <YAxis
                dataKey="qualification"
                type="category"
                fontSize={12}
                width={200}
                tickFormatter={(tick) =>
                  tick.length > 30 ? tick.slice(0, 30) + "..." : tick
                }
              />
              <ChartTooltip
                content={({
                  active,
                  payload,
                  label,
                }: TooltipProps<number, string>) => {
                  if (active && payload && payload.length) {
                    return (
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
                                {entry.name === "Students"
                                  ? `${entry.value ?? 0} students`
                                  : `$${(entry.value ?? 0).toLocaleString()}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="revenue" fill={COLORS.revenue} name="Revenue" />
              <Bar
                dataKey="netProfit"
                fill={COLORS.netProfit}
                name="Net Profit"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function QualificationSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Qualifications by Revenue</CardTitle>
        <CardDescription>Loading performance insights...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
