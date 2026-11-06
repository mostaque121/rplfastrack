import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import {
  getGuideForEdit,
  listCourseOptions,
  toGuideEditorValues,
} from "@/features/guides/admin-queries";
import { GuideEditor } from "@/features/guides/components/guide-editor";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Edit guide" };

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  await getAdminOrRedirect();
  const { id } = await params;
  const [guide, courses] = await Promise.all([getGuideForEdit(id), listCourseOptions()]);
  if (!guide) notFound();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/admin/content/guides" className="hover:underline">
          Guides
        </Link>{" "}
        / {guide.title}
      </nav>
      <PageHeader
        title={guide.title}
        description={`/guides/${guide.slug} · ${guide.status === "PUBLISHED" ? "Published" : "Draft"}`}
      />
      <GuideEditor
        key={guide.updatedAt.toISOString()}
        guideId={guide.id}
        initialValues={toGuideEditorValues(guide, { index: guide.index })}
        courses={courses}
      />
    </div>
  );
}
