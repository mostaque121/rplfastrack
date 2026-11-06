import "server-only";

import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { cache } from "react";

import { CACHE_TAGS } from "@/config/cache-tags";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/server/db";
import { Section } from "@/types/shared";

// Cached reads for the public site. Errors are not caught here: a thrown
// query is never cached, so a DB hiccup can't store an empty result (and a
// failed regeneration keeps serving the previous page).
// unstable_cache stores JSON, so Date fields come back as strings.
// Only PUBLISHED courses are public; drafts 404 and stay out of every list.

const published = { status: "PUBLISHED" } as const;

/** Course images are optional: a course without one shows its section's image. */
function withSectionImage<C extends { imageUrl: string | null }>(
  courses: C[],
  sectionImage: string,
) {
  return courses.map((course) => ({ ...course, imageUrl: course.imageUrl || sectionImage }));
}

/** Every section that has a published course, with its course list. Sent to the
 * client on every page (navbar, search, forms), so it only has the fields in `Section`. */
export const listSections = cache(
  unstable_cache(
    async (): Promise<Section[]> => {
      const sections = await prisma.section.findMany({
        select: {
          id: true,
          title: true,
          link: true,
          index: true,
          imageUrl: true,
          icon: true,
          updatedAt: true,
          courses: {
            select: {
              id: true,
              title: true,
              link: true,
              index: true,
              imageUrl: true,
              updatedAt: true,
            },
            where: published,
            orderBy: { index: "asc" },
          },
        },
        orderBy: { index: "asc" },
      });
      // A section with no published course yet (e.g. a new one) stays hidden
      return sections
        .filter((s) => s.courses.length > 0)
        .map((s) => ({ ...s, courses: withSectionImage(s.courses, s.imageUrl) }));
    },
    ["list-sections"],
    { tags: [CACHE_TAGS.sections] },
  ),
);

const courseSelect = {
  title: true,
  updatedAt: true,
  link: true,
  metaTitle: true,
  metaDescription: true,
  imageUrl: true,
  description: true,
  jobOpportunity: true,
  entryRequirement: true,
  packagingRule: true,
  coreUnits: true,
  electiveUnits: true,
  code: true,
  heroIntro: true,
  whoIsItFor: true,
  evidenceExamples: true,
  licensingInfo: true,
  duration: true,
  deliveryMode: true,
  imageAlt: true,
  qualificationStatus: true,
  replacedBy: { select: { title: true, link: true, status: true } },
  faqs: { select: { id: true, question: true, answer: true }, orderBy: { index: "asc" } },
  section: { select: { title: true, link: true, icon: true, imageUrl: true, imageAlt: true } },
  guides: {
    where: { guide: { status: "PUBLISHED" } },
    select: { guide: { select: { title: true, slug: true } } },
    // Later guides are the more specific ones (e.g. plumbing licence before "what is RPL")
    orderBy: { guide: { index: "desc" } },
    take: 3,
  },
} as const;

type CourseRow = Prisma.CourseGetPayload<{ select: typeof courseSelect }>;
/** A course without its own image shows its section's (with the section's alt text). */
const withImage = (course: CourseRow | null) =>
  course &&
  (course.imageUrl
    ? { ...course, imageUrl: course.imageUrl }
    : { ...course, imageUrl: course.section.imageUrl, imageAlt: course.section.imageAlt });

export const getCourseByLink = cache((link: string) =>
  unstable_cache(
    async () =>
      withImage(
        await prisma.course.findUnique({ where: { link, ...published }, select: courseSelect }),
      ),
    ["course-by-link", link],
    { tags: [CACHE_TAGS.courses, CACHE_TAGS.course(link)] },
  )(),
);

/** Course page data. In Draft Mode (admins only, see /api/admin/preview)
 * it reads uncached and includes drafts; otherwise the cached public read. */
export const getCourseForPage = cache(async (link: string) => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return getCourseByLink(link);
  return withImage(await prisma.course.findUnique({ where: { link }, select: courseSelect }));
});

export const getSectionByLink = cache((link: string) =>
  unstable_cache(
    async () => {
      const section = await prisma.section.findUnique({
        where: { link },
        select: {
          title: true,
          link: true,
          metaTitle: true,
          metaDescription: true,
          imageUrl: true,
          imageAlt: true,
          icon: true,
          heroIntro: true,
          intro: true,
          faqs: { select: { id: true, question: true, answer: true }, orderBy: { index: "asc" } },
          courses: {
            select: { id: true, title: true, link: true, imageUrl: true },
            where: published,
            orderBy: { index: "asc" },
          },
        },
      });
      return (
        section && { ...section, courses: withSectionImage(section.courses, section.imageUrl) }
      );
    },
    ["section-by-link", link],
    { tags: [CACHE_TAGS.section(link)] },
  )(),
);
