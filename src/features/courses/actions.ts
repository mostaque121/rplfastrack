"use server";

import { updateTag } from "next/cache";

import { CACHE_TAGS } from "@/config/cache-tags";
import { Prisma } from "@/generated/prisma";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";
import { requireAdmin } from "@/server/admin";
import { prisma } from "@/server/db";

import { recordRedirect, TransactionClient } from "./record-redirect";
import {
  CourseEditorValues,
  courseEditorSchema,
  redirectSchema,
  SectionEditorValues,
  sectionEditorSchema,
} from "./schema";

export type ActionResult<T = object> =
  | ({ success: true } & T)
  | { success: false; message: string; fieldErrors?: Record<string, string> };

const RICH_COURSE_FIELDS = [
  "heroIntro",
  "whoIsItFor",
  "evidenceExamples",
  "licensingInfo",
  "description",
  "jobOpportunity",
  "entryRequirement",
  "packagingRule",
  "coreUnits",
  "electiveUnits",
] as const;

function zodFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  return Object.fromEntries(issues.map((issue) => [issue.path.join("."), issue.message]));
}

function invalid(issues: { path: PropertyKey[]; message: string }[]): ActionResult<never> {
  return {
    success: false,
    message: issues[0]?.message ?? "Check the highlighted fields",
    fieldErrors: zodFieldErrors(issues),
  };
}

const sanitizeFaqs = (faqs: { question: string; answer: string }[]) =>
  faqs.map((faq, index) => ({
    question: faq.question,
    answer: sanitizeRichText(faq.answer),
    index,
  }));

/* ---------------- ORDERING ---------------- */

/** Renumbers a section's courses 1..n, with `courseId` placed at `position`. */
async function placeCourse(
  tx: TransactionClient,
  sectionId: string,
  courseId?: string,
  position?: number,
) {
  const courses = await tx.course.findMany({
    where: { sectionId },
    select: { id: true, index: true },
    orderBy: [{ index: "asc" }, { createdAt: "asc" }],
  });
  const ids = courses.map((c) => c.id).filter((id) => id !== courseId);
  if (courseId) {
    const at = Math.min(Math.max((position ?? ids.length + 1) - 1, 0), ids.length);
    ids.splice(at, 0, courseId);
  }
  const current = new Map(courses.map((c) => [c.id, c.index]));
  for (const [i, id] of ids.entries()) {
    if (current.get(id) !== i + 1) {
      await tx.course.update({ where: { id }, data: { index: i + 1 } });
    }
  }
}

async function placeSection(tx: TransactionClient, sectionId?: string, position?: number) {
  const sections = await tx.section.findMany({
    select: { id: true, index: true },
    orderBy: [{ index: "asc" }, { createdAt: "asc" }],
  });
  const ids = sections.map((s) => s.id).filter((id) => id !== sectionId);
  if (sectionId) {
    const at = Math.min(Math.max((position ?? ids.length + 1) - 1, 0), ids.length);
    ids.splice(at, 0, sectionId);
  }
  const current = new Map(sections.map((s) => [s.id, s.index]));
  for (const [i, id] of ids.entries()) {
    if (current.get(id) !== i + 1) {
      await tx.section.update({ where: { id }, data: { index: i + 1 } });
    }
  }
}

/* ---------------- COURSES ---------------- */

export async function saveCourse(
  id: string | null,
  input: CourseEditorValues,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const parsed = courseEditorSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error.issues);
  const { faqs, index, ...values } = parsed.data;

  const data = {
    ...values,
    code: values.code || null,
    imageAlt: values.imageAlt || null,
    duration: values.duration || null,
    deliveryMode: values.deliveryMode || null,
    replacedById: values.qualificationStatus === "SUPERSEDED" ? values.replacedById : null,
    searchAliases: [...new Set(values.searchAliases.map((alias) => alias.toLowerCase()))],
    ...Object.fromEntries(
      RICH_COURSE_FIELDS.map((field) => [field, sanitizeRichText(values[field])]),
    ),
  } as Omit<CourseEditorValues, "faqs" | "index">;
  // Optional rich fields are stored as NULL when empty
  for (const field of ["heroIntro", "whoIsItFor", "evidenceExamples", "licensingInfo"] as const) {
    (data as Record<string, unknown>)[field] = data[field] || null;
  }

  const existing = id
    ? await prisma.course.findUnique({
        where: { id },
        select: {
          id: true,
          link: true,
          title: true,
          sectionId: true,
          section: { select: { link: true } },
        },
      })
    : null;
  if (id && !existing) return { success: false, message: "Course not found" };
  if (data.replacedById && data.replacedById === id) {
    return {
      success: false,
      message: "A course can't replace itself",
      fieldErrors: { replacedById: "Choose another course" },
    };
  }

  const clash = await prisma.course.findFirst({
    where: {
      OR: [{ link: data.link }, { metaTitle: data.metaTitle }],
      ...(id && { id: { not: id } }),
    },
    select: { link: true, metaTitle: true, title: true },
  });
  if (clash) {
    const field = clash.link === data.link ? "link" : "metaTitle";
    return {
      success: false,
      message: `"${clash.title}" already uses this ${field === "link" ? "URL" : "meta title"}`,
      fieldErrors: { [field]: "Already used by another course" },
    };
  }

  const section = await prisma.section.findUnique({
    where: { id: data.sectionId },
    select: { link: true },
  });
  if (!section) return { success: false, message: "Section not found" };

  let savedId: string;
  try {
    savedId = await prisma.$transaction(async (tx) => {
      const course = existing
        ? await tx.course.update({ where: { id: existing.id }, data, select: { id: true } })
        : await tx.course.create({ data: { ...data, index }, select: { id: true } });

      await tx.faq.deleteMany({ where: { courseId: course.id } });
      if (faqs.length) {
        await tx.faq.createMany({
          data: sanitizeFaqs(faqs).map((faq) => ({ ...faq, courseId: course.id })),
        });
      }

      await placeCourse(tx, data.sectionId, course.id, index);
      if (existing && existing.sectionId !== data.sectionId) {
        await placeCourse(tx, existing.sectionId);
      }
      if (existing && existing.link !== data.link) {
        await recordRedirect(tx, `/courses/${existing.link}`, `/courses/${data.link}`);
      }
      return course.id;
    });
  } catch (error) {
    console.error("Save course failed:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, message: "The URL or meta title is already used by another course" };
    }
    return { success: false, message: "Saving failed. Please try again." };
  }

  updateTag(CACHE_TAGS.sections);
  updateTag(CACHE_TAGS.section(section.link));
  // A visit before creation may have cached "not found" for this link
  updateTag(CACHE_TAGS.course(data.link));
  if (existing) {
    updateTag(CACHE_TAGS.course(existing.link));
    if (existing.section.link !== section.link)
      updateTag(CACHE_TAGS.section(existing.section.link));
    if (existing.link !== data.link) updateTag(CACHE_TAGS.redirects);
    if (existing.title !== data.title) {
      updateTag(CACHE_TAGS.reviewsAll);
      updateTag(CACHE_TAGS.reviewsCommon);
    }
  }

  return { success: true, id: savedId };
}

export async function deleteCourse(id: string): Promise<ActionResult> {
  await requireAdmin();
  const course = await prisma.course.findUnique({
    where: { id },
    select: { link: true, sectionId: true, section: { select: { link: true } } },
  });
  if (!course) return { success: false, message: "Course not found" };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.course.delete({ where: { id } });
      await placeCourse(tx, course.sectionId);
    });
  } catch (error) {
    console.error("Delete course failed:", error);
    return { success: false, message: "Deleting failed. Please try again." };
  }

  updateTag(CACHE_TAGS.sections);
  updateTag(CACHE_TAGS.section(course.section.link));
  updateTag(CACHE_TAGS.course(course.link));
  updateTag(CACHE_TAGS.reviewsAll);
  updateTag(CACHE_TAGS.reviewsCommon);
  return { success: true };
}

export async function bulkUpdateCourses(
  ids: string[],
  change: { status: "DRAFT" | "PUBLISHED" } | { sectionId: string },
): Promise<ActionResult<{ count: number }>> {
  await requireAdmin();
  if (ids.length === 0) return { success: true, count: 0 };

  const courses = await prisma.course.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      link: true,
      sectionId: true,
      imageCoverLink: true,
      imageSquareLink: true,
      description: true,
      section: { select: { link: true } },
    },
    orderBy: { index: "asc" },
  });

  const sectionLinks = new Set(courses.map((c) => c.section.link));

  try {
    if ("status" in change) {
      if (change.status === "PUBLISHED") {
        const incomplete = courses.filter(
          (c) => !c.imageCoverLink || !c.imageSquareLink || !c.description.trim(),
        );
        if (incomplete.length) {
          return {
            success: false,
            message: `${incomplete.length} selected course(s) need images and a description before publishing`,
          };
        }
      }
      await prisma.course.updateMany({
        where: { id: { in: ids } },
        data: { status: change.status },
      });
    } else {
      const target = await prisma.section.findUnique({
        where: { id: change.sectionId },
        select: { id: true, link: true },
      });
      if (!target) return { success: false, message: "Section not found" };
      sectionLinks.add(target.link);

      await prisma.$transaction(async (tx) => {
        for (const course of courses) {
          if (course.sectionId === target.id) continue;
          await tx.course.update({
            where: { id: course.id },
            data: { sectionId: target.id, index: 100_000 },
          });
        }
        for (const sectionId of new Set([target.id, ...courses.map((c) => c.sectionId)])) {
          await placeCourse(tx, sectionId);
        }
      });
    }
  } catch (error) {
    console.error("Bulk course update failed:", error);
    return { success: false, message: "Updating failed. Please try again." };
  }

  updateTag(CACHE_TAGS.sections);
  for (const link of sectionLinks) updateTag(CACHE_TAGS.section(link));
  for (const course of courses) updateTag(CACHE_TAGS.course(course.link));
  return { success: true, count: courses.length };
}

/** After a direct DB change (e.g. the rich text migration script). */
export async function refreshPublicContent(): Promise<ActionResult> {
  await requireAdmin();
  updateTag(CACHE_TAGS.sections);
  updateTag(CACHE_TAGS.courses);
  updateTag(CACHE_TAGS.redirects);
  updateTag(CACHE_TAGS.reviewsAll);
  updateTag(CACHE_TAGS.reviewsCommon);
  const sections = await prisma.section.findMany({ select: { link: true } });
  for (const section of sections) updateTag(CACHE_TAGS.section(section.link));
  return { success: true };
}

/* ---------------- SECTIONS ---------------- */

export async function saveSection(
  id: string | null,
  input: SectionEditorValues,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const parsed = sectionEditorSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error.issues);
  const { faqs, index, ...values } = parsed.data;
  const data = {
    ...values,
    intro: sanitizeRichText(values.intro) || null,
    imageAlt: values.imageAlt || null,
  };

  const existing = id
    ? await prisma.section.findUnique({
        where: { id },
        select: { id: true, link: true, title: true },
      })
    : null;
  if (id && !existing) return { success: false, message: "Section not found" };

  const clash = await prisma.section.findFirst({
    where: { link: data.link, ...(id && { id: { not: id } }) },
    select: { title: true },
  });
  if (clash) {
    return {
      success: false,
      message: `"${clash.title}" already uses this URL`,
      fieldErrors: { link: "Already used by another section" },
    };
  }

  let savedId: string;
  try {
    savedId = await prisma.$transaction(async (tx) => {
      const section = existing
        ? await tx.section.update({ where: { id: existing.id }, data, select: { id: true } })
        : await tx.section.create({ data: { ...data, index }, select: { id: true } });

      await tx.faq.deleteMany({ where: { sectionId: section.id } });
      if (faqs.length) {
        await tx.faq.createMany({
          data: sanitizeFaqs(faqs).map((faq) => ({ ...faq, sectionId: section.id })),
        });
      }
      await placeSection(tx, section.id, index);
      if (existing && existing.link !== data.link) {
        await recordRedirect(tx, `/section/${existing.link}`, `/section/${data.link}`);
      }
      return section.id;
    });
  } catch (error) {
    console.error("Save section failed:", error);
    return { success: false, message: "Saving failed. Please try again." };
  }

  updateTag(CACHE_TAGS.sections);
  updateTag(CACHE_TAGS.section(data.link));
  if (existing) {
    updateTag(CACHE_TAGS.section(existing.link));
    // Course pages show their section's title and link
    if (existing.link !== data.link || existing.title !== data.title) {
      updateTag(CACHE_TAGS.courses);
    }
    if (existing.link !== data.link) updateTag(CACHE_TAGS.redirects);
  }
  return { success: true, id: savedId };
}

export async function deleteSection(id: string): Promise<ActionResult> {
  await requireAdmin();
  const section = await prisma.section.findUnique({
    where: { id },
    select: { link: true, _count: { select: { courses: true } } },
  });
  if (!section) return { success: false, message: "Section not found" };
  if (section._count.courses > 0) {
    return { success: false, message: "Move or delete this section's courses first" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.section.delete({ where: { id } });
      await placeSection(tx);
    });
  } catch (error) {
    console.error("Delete section failed:", error);
    return { success: false, message: "Deleting failed. Please try again." };
  }

  updateTag(CACHE_TAGS.sections);
  updateTag(CACHE_TAGS.section(section.link));
  return { success: true };
}

/* ---------------- REDIRECTS ---------------- */

export async function createRedirect(input: {
  fromPath: string;
  toPath: string;
}): Promise<ActionResult> {
  await requireAdmin();
  const parsed = redirectSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error.issues);
  const fromPath = parsed.data.fromPath.replace(/\/+$/, "") || "/";
  const toPath = parsed.data.toPath;
  if (fromPath === toPath) {
    return {
      success: false,
      message: "From and to are the same",
      fieldErrors: { toPath: "Same path" },
    };
  }

  await prisma.$transaction((tx) => recordRedirect(tx, fromPath, toPath));
  updateTag(CACHE_TAGS.redirects);
  return { success: true };
}

export async function deleteRedirect(id: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.redirect.delete({ where: { id } }).catch(() => null);
  updateTag(CACHE_TAGS.redirects);
  return { success: true };
}
