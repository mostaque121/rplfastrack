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
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  primary: "hsl(0, 0%, 15%)", // Very dark gray
  success: "hsl(0, 0%, 35%)",
};

const PIE_COLORS = [
  "hsl(0, 0%, 15%)",
  "hsl(0, 0%, 22%)",
  "hsl(0, 0%, 30%)",
  "hsl(0, 0%, 38%)",
  "hsl(0, 0%, 45%)",
];

interface DistributionChartsProps {
  analytics: AnalyticsData | null;
  loading: boolean;
}

export function DistributionCharts({
  analytics,
  loading,
}: DistributionChartsProps) {
  if (loading || !analytics) return <DistributionChartsSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Payment Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Status</CardTitle>
          <CardDescription>Distribution of payment statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              paid: { label: "Paid", color: COLORS.success },
              installment: {
                label: "Installment",
                color: "hsl(var(--chart-4))",
              },
              refunded: { label: "Refunded", color: "hsl(var(--chart-5))" },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.distributions.paymentStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {analytics.distributions.paymentStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="bg-background border rounded-md shadow-md p-3">
                          <p className="font-medium text-sm">{data.name}</p>
                          <div className="mt-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: data.color }}
                              />
                              <span className="text-sm font-medium">
                                Count:{" "}
                              </span>
                              <span className="text-sm">
                                {(data.value as number)?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                Percentage:{" "}
                              </span>
                              <span className="text-sm">
                                {(
                                  ((data.value as number) /
                                    analytics.distributions.paymentStatus.reduce(
                                      (sum, item) => sum + item.value,
                                      0
                                    )) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Revenue & Profit by Source */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue & Profit by Source</CardTitle>
          <CardDescription>Performance by acquisition channel</CardDescription>
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
              <BarChart
                data={analytics.distributions.revenueAndProfitBySource}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="source"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
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
                <Bar dataKey="revenue" fill={COLORS.primary} name="Revenue" />
                <Bar dataKey="profit" fill={COLORS.success} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// 🔧 Loading Skeleton
function DistributionChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {[...Array(2)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
