/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Bar,
  BarChart,
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

interface BrowsersProps {
  data: any;
  days: number;
}

export function Browsers({ data, days }: BrowsersProps) {
  const browsers =
    data?.rows?.map((row: any) => {
      const name = row?.dimensionValues?.[0]?.value;
      const sessions = Number.parseInt(row.metricValues[0].value, 10);

      return {
        name,
        sessions,
      };
    }) || [];

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Browser Usage</CardTitle>
        <CardDescription>
          Distribution of visits by browser in the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {browsers.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={browsers}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 20,
                }}
              >
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  angle={-0}
                  textAnchor="end"
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Bar dataKey="sessions" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
