"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { bulkUpdateCourses } from "../actions";

export type CourseTableRow = {
  id: string;
  title: string;
  code: string | null;
  link: string;
  status: "DRAFT" | "PUBLISHED";
  sectionTitle: string;
  score: number;
  total: number;
  missing: string[];
  updated: string;
};

export function StatusBadge({ status }: { status: "DRAFT" | "PUBLISHED" }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        status === "PUBLISHED"
          ? "bg-green-50 text-green-800 ring-green-600/20"
          : "bg-gray-100 text-gray-700 ring-gray-500/20",
      )}
    >
      {status === "PUBLISHED" ? "Published" : "Draft"}
    </span>
  );
}

function ScoreBar({ score, total, missing }: { score: number; total: number; missing: string[] }) {
  const ratio = score / total;
  return (
    <div
      className="flex items-center gap-2"
      title={missing.length ? `Missing: ${missing.join(", ")}` : "Complete"}
    >
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            ratio >= 0.8 ? "bg-green-600" : ratio >= 0.5 ? "bg-amber-500" : "bg-red-500",
          )}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <span className="text-xs tabular-nums">
        {score}/{total}
      </span>
    </div>
  );
}

export function CourseTable({
  rows,
  sections,
}: {
  rows: CourseTableRow[];
  sections: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const allSelected = rows.length > 0 && selected.size === rows.length;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const run = (change: Parameters<typeof bulkUpdateCourses>[1], label: string) =>
    startTransition(async () => {
      const result = await bulkUpdateCourses([...selected], change);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(`${result.count} course(s) ${label}`);
      setSelected(new Set());
      router.refresh();
    });

  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
        No courses match these filters.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 p-2 text-sm">
          <span className="px-2 font-medium">{selected.size} selected</span>
          <Button
            size="sm"
            disabled={pending}
            onClick={() => run({ status: "PUBLISHED" }, "published")}
          >
            Publish
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => run({ status: "DRAFT" }, "set to draft")}
          >
            Set to draft
          </Button>
          <Select disabled={pending} onValueChange={(sectionId) => run({ sectionId }, "moved")}>
            <SelectTrigger size="sm" className="w-56">
              <SelectValue placeholder="Move to section…" />
            </SelectTrigger>
            <SelectContent>
              {sections.map((section) => (
                <SelectItem key={section.id} value={section.id}>
                  {section.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {pending && <Loader2 className="size-4 animate-spin" />}
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            onClick={() => setSelected(new Set())}
          >
            Clear
          </Button>
        </div>
      )}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={allSelected}
                  onChange={() =>
                    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
                  }
                  className="size-4 accent-primary"
                />
              </TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completeness</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} data-state={selected.has(row.id) ? "selected" : undefined}>
                <TableCell>
                  <input
                    type="checkbox"
                    aria-label={`Select ${row.title}`}
                    checked={selected.has(row.id)}
                    onChange={() => toggle(row.id)}
                    className="size-4 accent-primary"
                  />
                </TableCell>
                <TableCell className="max-w-md whitespace-normal">
                  <Link
                    href={`/admin/content/courses/${row.id}`}
                    prefetch={false}
                    className="font-medium hover:underline"
                  >
                    {row.title}
                  </Link>
                  <span className="block text-xs text-muted-foreground">
                    {row.code ? `${row.code} · ` : ""}/courses/{row.link}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.sectionTitle}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>
                  <ScoreBar score={row.score} total={row.total} missing={row.missing} />
                </TableCell>
                <TableCell className="text-muted-foreground">{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
