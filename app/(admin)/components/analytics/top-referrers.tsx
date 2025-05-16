/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopReferrersProps {
  data: any;
  days: number;
}
function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h > 0 ? `${h}h` : "", m > 0 ? `${m}m` : "", `${s}s`]
    .filter(Boolean)
    .join(" ");
}

export function TopReferrers({ data, days }: TopReferrersProps) {
  const referrers =
    data?.rows?.map((row: any) => ({
      source: row?.dimensionValues?.[0]?.value,
      sessions: Number.parseInt(row.metricValues[0].value, 10),
      avgDuration:
        parseFloat(row.metricValues[1].value) /
        Number.parseInt(row.metricValues[0].value, 10),
    })) || [];

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Top Referrers</CardTitle>
        <CardDescription>
          Sources driving traffic to your website in the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Source</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">Avg Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrers.map((referrer: any) => (
              <TableRow key={referrer.source}>
                <TableCell className="font-medium ">
                  {referrer.source}
                </TableCell>
                <TableCell className="text-right ">
                  {referrer.sessions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatDuration(referrer.avgDuration.toLocaleString())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
