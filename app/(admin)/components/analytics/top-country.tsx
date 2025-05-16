/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TopCountryProps {
  data: any;
  days: number;
}

export function TopCountry({ data, days }: TopCountryProps) {
  // Map the referrers data to get country and sessions
  const referrers =
    data?.rows?.map((row: any) => ({
      country: row?.dimensionValues?.[0]?.value,
      sessions: Number.parseInt(row.metricValues[0].value, 10),
    })) || [];

  // Sort the referrers by sessions (descending) and limit to the top 10
  const topReferrers = referrers
    .sort(
      (a: { sessions: number }, b: { sessions: number }) =>
        b.sessions - a.sessions
    )
    .slice(0, 10);

  // Define a set of 10 distinct colors
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#a4de6c",
    "#d0ed57",
    "#ff6f61",
    "#9e9e9e",
    "#d87c7c",
    "#8dd1e1",
  ];

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Sessions by Country</CardTitle>
        <CardDescription>
          The number of sessions from the top 10 countries in the last {days}{" "}
          days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={topReferrers}
              dataKey="sessions"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {topReferrers.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
