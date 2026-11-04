import Link from "next/link";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import { listCourseOptions, listSectionOptions } from "@/features/courses/admin-queries";
import { CourseEditor } from "@/features/courses/components/course-editor";
import { toCourseEditorValues } from "@/features/courses/editor-values";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "New course" };

export default async function NewCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  await getAdminOrRedirect();
  const [{ section: sectionParam }, sections, courses] = await Promise.all([
    searchParams,
    listSectionOptions(),
    listCourseOptions(),
  ]);
  const section = sections.find((s) => s.id === sectionParam) ?? sections[0];

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/admin/content/courses" className="hover:underline">
          Courses
        </Link>{" "}
        / New
      </nav>
      <PageHeader
        title="New course"
        description="Starts as a draft: it stays hidden until you publish it."
      />
      <CourseEditor
        courseId={null}
        initialValues={toCourseEditorValues(null, {
          sectionId: section?.id ?? "",
          index: (section?._count.courses ?? 0) + 1,
        })}
        sections={sections}
        courses={courses}
      />
    </div>
  );
}
