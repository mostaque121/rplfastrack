import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import { getSectionForEdit } from "@/features/courses/admin-queries";
import { SectionEditor } from "@/features/courses/components/section-editor";
import { toSectionEditorValues } from "@/features/courses/editor-values";
import { getAdminOrRedirect } from "@/server/admin";
import { prisma } from "@/server/db";

export const metadata = { title: "Edit section" };

export default async function EditSectionPage({ params }: { params: Promise<{ id: string }> }) {
  await getAdminOrRedirect();
  const { id } = await params;
  const [section, courseCount] = await Promise.all([
    getSectionForEdit(id),
    prisma.course.count({ where: { sectionId: id } }),
  ]);
  if (!section) notFound();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/admin/content/sections" className="hover:underline">
          Sections
        </Link>{" "}
        / {section.title}
      </nav>
      <PageHeader
        title={section.title}
        description={`/section/${section.link} · ${courseCount} courses`}
      />
      <SectionEditor
        key={section.updatedAt.toISOString()}
        sectionId={section.id}
        initialValues={toSectionEditorValues(section, { index: section.index })}
        courseCount={courseCount}
      />
    </div>
  );
}
