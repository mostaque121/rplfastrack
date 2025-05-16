/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DeviceCategoriesProps {
  data: any;
  days: number;
}

export function DeviceCategories({ data, days }: DeviceCategoriesProps) {
  const devices =
    data?.rows?.map((row: any) => {
      const name = row?.dimensionValues?.[0]?.value;
      const value = Number.parseInt(row.metricValues[0].value, 10);

      return {
        name,
        value,
      };
    }) || [];

  // Define colors for the pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6347",
    "#6A5ACD",
    "#FFD700",
    "#32CD32",
    "#FF4500",
    "#2E8B57",
  ];

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Device Categories</CardTitle>
        <CardDescription>
          Distribution of visits by device type in the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {devices.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devices}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: any) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {devices.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${name}: ${value.toLocaleString()}`,
                    "Sessions",
                  ]}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No device data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
