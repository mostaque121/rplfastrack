import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import {
  getCourseForEdit,
  listCourseOptions,
  listSectionOptions,
} from "@/features/courses/admin-queries";
import { CourseEditor } from "@/features/courses/components/course-editor";
import { StatusBadge } from "@/features/courses/components/course-table";
import { toCourseEditorValues } from "@/features/courses/editor-values";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Edit course" };

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  await getAdminOrRedirect();
  const { id } = await params;
  const [course, sections, courses] = await Promise.all([
    getCourseForEdit(id),
    listSectionOptions(),
    listCourseOptions(),
  ]);
  if (!course) notFound();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/admin/content/courses" className="hover:underline">
          Courses
        </Link>{" "}
        / {course.title}
      </nav>
      <PageHeader
        title={course.title}
        description={`/courses/${course.link}`}
        actions={<StatusBadge status={course.status} />}
      />
      <CourseEditor
        key={course.updatedAt.toISOString()}
        courseId={course.id}
        initialValues={toCourseEditorValues(course, {
          sectionId: course.sectionId,
          index: course.index,
        })}
        savedLink={course.link}
        savedStatus={course.status}
        sections={sections}
        courses={courses}
      />
    </div>
  );
}
