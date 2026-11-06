import "server-only";

import { prisma } from "@/server/db";

import type { GuideEditorValues } from "./schema";

// Admin-only reads: uncached, drafts included.

export async function listGuidesForAdmin() {
  return await prisma.guide.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      index: true,
      status: true,
      updatedAt: true,
      _count: { select: { courses: true, faqs: true } },
    },
    // Saving renumbers guides 1..n. (An inline orderBy array here breaks the select typing.)
    orderBy: { index: "asc" },
  });
}

export function getGuideForEdit(id: string) {
  return prisma.guide.findUnique({
    where: { id },
    include: {
      faqs: { orderBy: { index: "asc" } },
      courses: { select: { courseId: true }, orderBy: { index: "asc" } },
    },
  });
}

/** Every course for the "linked qualifications" picker, drafts marked. */
export function listCourseOptions() {
  return prisma.course.findMany({
    select: { id: true, title: true, code: true, status: true },
    orderBy: { title: "asc" },
  });
}

type GuideRow = NonNullable<Awaited<ReturnType<typeof getGuideForEdit>>>;

export function toGuideEditorValues(
  guide: GuideRow | null,
  defaults: { index: number },
): GuideEditorValues {
  return {
    title: guide?.title ?? "",
    slug: guide?.slug ?? "",
    status: guide?.status ?? "DRAFT",
    index: guide?.index ?? defaults.index,
    excerpt: guide?.excerpt ?? "",
    body: guide?.body ?? "",
    imageLink: guide?.imageLink ?? "",
    imageAlt: guide?.imageAlt ?? "",
    metaTitle: guide?.metaTitle ?? "",
    metaDescription: guide?.metaDescription ?? "",
    courseIds: guide?.courses.map((c) => c.courseId) ?? [],
    faqs: guide?.faqs.map(({ question, answer }) => ({ question, answer })) ?? [],
  };
}
