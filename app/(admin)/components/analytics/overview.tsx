/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewProps {
  data: any;
  days: number;
}

export function Overview({ data, days }: OverviewProps) {
  const chartData =
    data?.rows?.map((row: any) => {
      const date = row?.dimensionValues?.[0]?.value;
      const formattedDate = `${date.slice(4, 6)}/${date.slice(6, 8)}`;

      return {
        name: formattedDate,
        users: Number.parseInt(row.metricValues[0].value, 10),
        pageviews: Number.parseInt(row.metricValues[2].value),
      };
    }) || [];

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Website Traffic</CardTitle>
        <CardDescription>
          User visits and page views over the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => value}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="pageviews"
                stroke="#82ca9d"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
