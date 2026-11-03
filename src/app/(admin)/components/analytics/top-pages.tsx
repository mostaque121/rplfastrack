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

interface TopPagesProps {
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

export function TopPages({ data, days }: TopPagesProps) {
  const pages =
    data?.rows?.map((row: any) => ({
      path: row?.dimensionValues?.[0]?.value,
      pageviews: Number.parseInt(row.metricValues[0].value, 10),
      duration: parseFloat(row.metricValues[1].value), // in seconds
    })) || [];

  const totalDuration = pages.reduce(
    (acc: any, page: { duration: any }) => acc + page.duration,
    0
  );

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>
          Most viewed pages on your website in the last {days} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Path</TableHead>
              <TableHead className="text-right">Page Views</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page: any) => (
              <TableRow key={page.path}>
                <TableCell className="font-medium">{page.path}</TableCell>
                <TableCell className="text-right">
                  {page.pageviews.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatDuration(page.duration)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium">
                <strong>Total</strong>
              </TableCell>
              <TableCell className="text-right font-medium">
                {pages
                  .reduce(
                    (sum: any, page: { pageviews: any }) =>
                      sum + page.pageviews,
                    0
                  )
                  .toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatDuration(totalDuration)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
