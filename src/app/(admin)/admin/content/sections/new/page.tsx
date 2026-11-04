import Link from "next/link";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import { SectionEditor } from "@/features/courses/components/section-editor";
import { toSectionEditorValues } from "@/features/courses/editor-values";
import { getAdminOrRedirect } from "@/server/admin";
import { prisma } from "@/server/db";

export const metadata = { title: "New section" };

export default async function NewSectionPage() {
  await getAdminOrRedirect();
  const count = await prisma.section.count();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/admin/content/sections" className="hover:underline">
          Sections
        </Link>{" "}
        / New
      </nav>
      <PageHeader title="New section" />
      <SectionEditor
        sectionId={null}
        initialValues={toSectionEditorValues(null, { index: count + 1 })}
        courseCount={0}
      />
    </div>
  );
}
