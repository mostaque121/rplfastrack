import "server-only";

import { Prisma, PublishStatus } from "@/generated/prisma";
import { prisma } from "@/server/db";

import { courseCompleteness } from "./completeness";

// Admin-only reads: uncached (the admin is dynamic), drafts included.

export type CourseListFilters = {
  q?: string;
  section?: string; // section id
  status?: PublishStatus;
  sort: "position" | "title" | "updated" | "completeness";
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export function parseCourseListFilters(
  params: Record<string, string | string[] | undefined>,
): CourseListFilters {
  const status = first(params.status);
  const sort = first(params.sort);
  return {
    q: first(params.q)?.trim() || undefined,
    section: first(params.section) || undefined,
    status: Object.values(PublishStatus).includes(status as PublishStatus)
      ? (status as PublishStatus)
      : undefined,
    sort: (["title", "updated", "completeness"] as const).includes(sort as never)
      ? (sort as CourseListFilters["sort"])
      : "position",
  };
}

export async function listCoursesForAdmin(filters: CourseListFilters) {
  const where: Prisma.CourseWhereInput = {};
  if (filters.section) where.sectionId = filters.section;
  if (filters.status) where.status = filters.status;
  if (filters.q) {
    const contains = { contains: filters.q, mode: "insensitive" as const };
    where.OR = [
      { title: contains },
      { code: contains },
      { link: contains },
      { searchAliases: { has: filters.q.toLowerCase() } },
    ];
  }

  const courses = await prisma.course.findMany({
    where,
    select: {
      id: true,
      title: true,
      code: true,
      link: true,
      index: true,
      status: true,
      updatedAt: true,
      section: { select: { id: true, title: true, index: true } },
      // completeness inputs
      heroIntro: true,
      whoIsItFor: true,
      evidenceExamples: true,
      description: true,
      duration: true,
      imageAlt: true,
      metaTitle: true,
      metaDescription: true,
      _count: { select: { faqs: true } },
    },
  });

  const rows = courses.map((course) => ({
    id: course.id,
    title: course.title,
    code: course.code,
    link: course.link,
    index: course.index,
    status: course.status,
    updatedAt: course.updatedAt,
    section: course.section,
    completeness: courseCompleteness({ ...course, faqCount: course._count.faqs }),
  }));

  rows.sort((a, b) => a.section.index - b.section.index || a.index - b.index);
  if (filters.sort === "title") rows.sort((a, b) => a.title.localeCompare(b.title));
  if (filters.sort === "updated") rows.sort((a, b) => +b.updatedAt - +a.updatedAt);
  if (filters.sort === "completeness") {
    rows.sort((a, b) => a.completeness.score - b.completeness.score);
  }
  return rows;
}

export type AdminCourseRow = Awaited<ReturnType<typeof listCoursesForAdmin>>[number];

export function getCourseForEdit(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: { faqs: { orderBy: { index: "asc" } }, section: { select: { link: true } } },
  });
}

/** Sections with their course count, for selects and the section list. */
export function listSectionOptions() {
  return prisma.section.findMany({
    select: {
      id: true,
      title: true,
      link: true,
      index: true,
      _count: { select: { courses: true } },
    },
    orderBy: { index: "asc" },
  });
}

/** Every course, for the "replaced by" select. */
export function listCourseOptions() {
  return prisma.course.findMany({
    select: { id: true, title: true, code: true },
    orderBy: { title: "asc" },
  });
}

export function getSectionForEdit(id: string) {
  return prisma.section.findUnique({
    where: { id },
    include: { faqs: { orderBy: { index: "asc" } } },
  });
}

export function listRedirects() {
  return prisma.redirect.findMany({ orderBy: { createdAt: "desc" } });
}
