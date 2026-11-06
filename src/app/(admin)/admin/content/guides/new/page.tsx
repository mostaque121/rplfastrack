import Link from "next/link";

import { PageHeader } from "@/app/(admin)/_components/page-header";
import { listCourseOptions, toGuideEditorValues } from "@/features/guides/admin-queries";
import { GuideEditor } from "@/features/guides/components/guide-editor";
import { getAdminOrRedirect } from "@/server/admin";
import { prisma } from "@/server/db";

export const metadata = { title: "New guide" };

export default async function NewGuidePage() {
  await getAdminOrRedirect();
  const [count, courses] = await Promise.all([prisma.guide.count(), listCourseOptions()]);

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/admin/content/guides" className="hover:underline">
          Guides
        </Link>{" "}
        / New
      </nav>
      <PageHeader title="New guide" />
      <GuideEditor
        guideId={null}
        initialValues={toGuideEditorValues(null, { index: count + 1 })}
        courses={courses}
      />
    </div>
  );
}
