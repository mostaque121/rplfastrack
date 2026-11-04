import { Plus } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listSectionOptions } from "@/features/courses/admin-queries";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Sections" };

export default async function SectionsPage() {
  await getAdminOrRedirect();
  const sections = await listSectionOptions();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="Sections"
        description="Industry pages that group the courses."
        actions={
          <Button asChild>
            <Link href="/admin/content/sections/new">
              <Plus /> New section
            </Link>
          </Button>
        }
      />
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell className="text-muted-foreground tabular-nums">
                  {section.index}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/content/sections/${section.id}`}
                    prefetch={false}
                    className="font-medium hover:underline"
                  >
                    {section.title}
                  </Link>
                  <span className="block text-xs text-muted-foreground">
                    /section/{section.link}
                  </span>
                </TableCell>
                <TableCell className="tabular-nums">{section._count.courses}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/content/courses?section=${section.id}`}
                    prefetch={false}
                    className="text-sm hover:underline"
                  >
                    View courses
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
