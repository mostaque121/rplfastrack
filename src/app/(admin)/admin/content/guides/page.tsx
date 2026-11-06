import { Plus } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listGuidesForAdmin } from "@/features/guides/admin-queries";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Guides" };

export default async function GuidesAdminPage() {
  await getAdminOrRedirect();
  const guides = await listGuidesForAdmin();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="Guides"
        description="Articles at /guides that answer informational searches and link to courses."
        actions={
          <Button asChild>
            <Link href="/admin/content/guides/new">
              <Plus /> New guide
            </Link>
          </Button>
        }
      />
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Guide</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>FAQs</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  No guides yet.
                </TableCell>
              </TableRow>
            )}
            {guides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell className="text-muted-foreground tabular-nums">{guide.index}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/content/guides/${guide.id}`}
                    prefetch={false}
                    className="font-medium hover:underline"
                  >
                    {guide.title}
                  </Link>
                  <span className="block text-xs text-muted-foreground">/guides/{guide.slug}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={guide.status === "PUBLISHED" ? "default" : "secondary"}>
                    {guide.status === "PUBLISHED" ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="tabular-nums">{guide._count.courses}</TableCell>
                <TableCell className="tabular-nums">{guide._count.faqs}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {guide.updatedAt.toLocaleDateString("en-AU")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
