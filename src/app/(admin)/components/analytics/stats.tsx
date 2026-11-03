/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart3, Eye, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsProps {
  data: any;
  days: number;
}

export function Stats({ data, days }: StatsProps) {
  const totals = data?.rows?.reduce(
    (acc: any, row: any) => {
      acc.sessions += Number.parseInt(row.metricValues[0].value);
      acc.users += Number.parseInt(row.metricValues[1].value);
      acc.pageviews += Number.parseInt(row.metricValues[2].value);
      return acc;
    },
    { sessions: 0, users: 0, pageviews: 0 }
  ) || { sessions: 0, users: 0, pageviews: 0 };

  const avgBounceRate =
    (data?.rows?.reduce(
      (sum: number, row: { metricValues: { value: string }[] }) =>
        sum + parseFloat(row.metricValues[3].value),
      0
    ) || 0) / (data?.rows?.length || 1);

  const formattedBounceRate = `${(avgBounceRate * 100).toFixed(2)}%`;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="py-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.sessions.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Last {days} days</p>
        </CardContent>
      </Card>
      <Card className="py-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.users.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Last {days} days</p>
        </CardContent>
      </Card>
      <Card className="py-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.pageviews.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Last {days} days</p>
        </CardContent>
      </Card>
      <Card className="py-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formattedBounceRate}</div>
          <p className="text-xs text-muted-foreground">
            Average over {days} days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
