"use server";

import { updateTag } from "next/cache";

import { CACHE_TAGS } from "@/config/cache-tags";
import type { ActionResult } from "@/features/courses/actions";
import { recordRedirect, type TransactionClient } from "@/features/courses/record-redirect";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";
import { requireAdmin } from "@/server/admin";
import { prisma } from "@/server/db";

import { GuideEditorValues, guideEditorSchema } from "./schema";

function invalid(issues: { path: PropertyKey[]; message: string }[]): ActionResult<never> {
  return {
    success: false,
    message: issues[0]?.message ?? "Check the highlighted fields",
    fieldErrors: Object.fromEntries(issues.map((issue) => [issue.path.join("."), issue.message])),
  };
}

/** Renumbers all guides 1..n, with `guideId` placed at `position`. */
async function placeGuide(tx: TransactionClient, guideId?: string, position?: number) {
  const guides = await tx.guide.findMany({
    select: { id: true, index: true },
    orderBy: [{ index: "asc" }, { createdAt: "asc" }],
  });
  const ids = guides.map((g) => g.id).filter((id) => id !== guideId);
  if (guideId) {
    const at = Math.min(Math.max((position ?? ids.length + 1) - 1, 0), ids.length);
    ids.splice(at, 0, guideId);
  }
  const current = new Map(guides.map((g) => [g.id, g.index]));
  for (const [i, id] of ids.entries()) {
    if (current.get(id) !== i + 1) await tx.guide.update({ where: { id }, data: { index: i + 1 } });
  }
}

/** Course pages list their guides, so a guide change refreshes the courses it links to. */
async function refreshGuidePages(slugs: string[], courseIds: string[]) {
  updateTag(CACHE_TAGS.guides);
  for (const slug of new Set(slugs)) updateTag(CACHE_TAGS.guide(slug));
  if (!courseIds.length) return;
  const courses = await prisma.course.findMany({
    where: { id: { in: [...new Set(courseIds)] } },
    select: { link: true },
  });
  for (const course of courses) updateTag(CACHE_TAGS.course(course.link));
}

export async function saveGuide(
  id: string | null,
  input: GuideEditorValues,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const parsed = guideEditorSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error.issues);
  const { faqs, courseIds, index, ...values } = parsed.data;
  const linkedIds = [...new Set(courseIds)];

  const data = {
    ...values,
    body: sanitizeRichText(values.body),
    imageLink: values.imageLink || null,
    imageAlt: values.imageAlt || null,
  };

  const existing = id
    ? await prisma.guide.findUnique({
        where: { id },
        select: {
          id: true,
          slug: true,
          status: true,
          publishedAt: true,
          courses: { select: { courseId: true } },
        },
      })
    : null;
  if (id && !existing) return { success: false, message: "Guide not found" };

  const clash = await prisma.guide.findFirst({
    where: { slug: data.slug, ...(id && { id: { not: id } }) },
    select: { title: true },
  });
  if (clash) {
    return {
      success: false,
      message: `"${clash.title}" already uses this URL`,
      fieldErrors: { slug: "Already used by another guide" },
    };
  }

  // First publish sets the public "published" date
  const publishedAt =
    data.status === "PUBLISHED"
      ? (existing?.publishedAt ?? new Date())
      : (existing?.publishedAt ?? null);

  let savedId: string;
  try {
    savedId = await prisma.$transaction(async (tx) => {
      const guide = existing
        ? await tx.guide.update({
            where: { id: existing.id },
            data: { ...data, publishedAt },
            select: { id: true },
          })
        : await tx.guide.create({ data: { ...data, index, publishedAt }, select: { id: true } });

      await tx.faq.deleteMany({ where: { guideId: guide.id } });
      if (faqs.length) {
        await tx.faq.createMany({
          data: faqs.map((faq, i) => ({
            question: faq.question,
            answer: sanitizeRichText(faq.answer),
            index: i,
            guideId: guide.id,
          })),
        });
      }

      await tx.guideCourse.deleteMany({ where: { guideId: guide.id } });
      if (linkedIds.length) {
        await tx.guideCourse.createMany({
          data: linkedIds.map((courseId, i) => ({ guideId: guide.id, courseId, index: i })),
        });
      }

      await placeGuide(tx, guide.id, index);
      if (existing && existing.slug !== data.slug) {
        await recordRedirect(tx, `/guides/${existing.slug}`, `/guides/${data.slug}`);
      }
      return guide.id;
    });
  } catch (error) {
    console.error("Save guide failed:", error);
    return { success: false, message: "Saving failed. Please try again." };
  }

  await refreshGuidePages(
    [data.slug, ...(existing ? [existing.slug] : [])],
    [...linkedIds, ...(existing?.courses.map((c) => c.courseId) ?? [])],
  );
  if (existing && existing.slug !== data.slug) updateTag(CACHE_TAGS.redirects);
  return { success: true, id: savedId };
}

export async function deleteGuide(id: string): Promise<ActionResult> {
  await requireAdmin();
  const guide = await prisma.guide.findUnique({
    where: { id },
    select: { slug: true, courses: { select: { courseId: true } } },
  });
  if (!guide) return { success: false, message: "Guide not found" };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.guide.delete({ where: { id } });
      await placeGuide(tx);
    });
  } catch (error) {
    console.error("Delete guide failed:", error);
    return { success: false, message: "Deleting failed. Please try again." };
  }

  await refreshGuidePages(
    [guide.slug],
    guide.courses.map((c) => c.courseId),
  );
  return { success: true };
}
