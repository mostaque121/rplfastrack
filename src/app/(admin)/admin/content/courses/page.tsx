import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { NativeSelect } from "@/app/(admin)/_components/native-select";
import { PageHeader } from "@/app/(admin)/_components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  listCoursesForAdmin,
  listSectionOptions,
  parseCourseListFilters,
} from "@/features/courses/admin-queries";
import { CourseTable } from "@/features/courses/components/course-table";
import { RefreshCacheButton } from "@/features/courses/components/refresh-cache-button";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Courses" };

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await getAdminOrRedirect();
  const filters = parseCourseListFilters(await searchParams);
  const [courses, sections] = await Promise.all([
    listCoursesForAdmin(filters),
    listSectionOptions(),
  ]);

  const published = courses.filter((c) => c.status === "PUBLISHED").length;
  const rows = courses.map((course) => ({
    id: course.id,
    title: course.title,
    code: course.code,
    link: course.link,
    status: course.status,
    sectionTitle: course.section.title,
    score: course.completeness.score,
    total: course.completeness.total,
    missing: course.completeness.checks.filter((c) => !c.ok).map((c) => c.label),
    updated: dateFormat.format(course.updatedAt),
  }));

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="Courses"
        description={`${courses.length} shown · ${published} published · ${courses.length - published} draft`}
        actions={
          <>
            <RefreshCacheButton />
            <Button asChild>
              <Link
                href={`/admin/content/courses/new${filters.section ? `?section=${filters.section}` : ""}`}
              >
                <Plus /> New course
              </Link>
            </Button>
          </>
        }
      />
      <form className="flex flex-wrap items-center gap-3" action="/admin/content/courses">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={filters.q}
            placeholder="Title, code, URL or alias"
            aria-label="Search courses"
            className="pl-8"
          />
        </div>
        <NativeSelect name="section" defaultValue={filters.section ?? ""} aria-label="Section">
          <option value="">All sections</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect name="status" defaultValue={filters.status ?? ""} aria-label="Status">
          <option value="">Any status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </NativeSelect>
        <NativeSelect name="sort" defaultValue={filters.sort} aria-label="Sort">
          <option value="position">Section order</option>
          <option value="title">Title A–Z</option>
          <option value="updated">Recently updated</option>
          <option value="completeness">Least complete first</option>
        </NativeSelect>
        <Button type="submit">Filter</Button>
        <Button variant="ghost" asChild>
          <Link href="/admin/content/courses">Reset</Link>
        </Button>
      </form>
      <CourseTable rows={rows} sections={sections} />
    </div>
  );
}
