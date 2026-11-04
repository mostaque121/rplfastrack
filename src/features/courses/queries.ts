import "server-only";

import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { cache } from "react";

import { CACHE_TAGS } from "@/config/cache-tags";
import { prisma } from "@/server/db";
import { Section } from "@/types/shared";

// Cached reads for the public site. Errors are not caught here: a thrown
// query is never cached, so a DB hiccup can't store an empty result (and a
// failed regeneration keeps serving the previous page).
// unstable_cache stores JSON, so Date fields come back as strings.
// Only PUBLISHED courses are public; drafts 404 and stay out of every list.

const published = { status: "PUBLISHED" } as const;

/** Every section with its course list. Sent to the client on every page
 * (navbar, search, forms), so it only has the fields in `Section`. */
export const listSections = cache(
  unstable_cache(
    async (): Promise<Section[]> =>
      prisma.section.findMany({
        select: {
          id: true,
          title: true,
          link: true,
          index: true,
          imageSquareLink: true,
          imageCoverLink: true,
          icon: true,
          updatedAt: true,
          courses: {
            select: {
              id: true,
              title: true,
              link: true,
              index: true,
              imageSquareLink: true,
              imageCoverLink: true,
              updatedAt: true,
            },
            where: published,
            orderBy: { index: "asc" },
          },
        },
        orderBy: { index: "asc" },
      }),
    ["list-sections"],
    { tags: [CACHE_TAGS.sections] },
  ),
);

const courseSelect = {
  title: true,
  link: true,
  metaTitle: true,
  metaDescription: true,
  imageCoverLink: true,
  imageSquareLink: true,
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
  section: { select: { title: true, link: true, icon: true } },
} as const;

export const getCourseByLink = cache((link: string) =>
  unstable_cache(
    () => prisma.course.findUnique({ where: { link, ...published }, select: courseSelect }),
    ["course-by-link", link],
    { tags: [CACHE_TAGS.courses, CACHE_TAGS.course(link)] },
  )(),
);

/** Course page data. In Draft Mode (admins only, see /api/admin/preview)
 * it reads uncached and includes drafts; otherwise the cached public read. */
export const getCourseForPage = cache(async (link: string) => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return getCourseByLink(link);
  return prisma.course.findUnique({ where: { link }, select: courseSelect });
});

export const getSectionByLink = cache((link: string) =>
  unstable_cache(
    () =>
      prisma.section.findUnique({
        where: { link },
        select: {
          title: true,
          link: true,
          metaTitle: true,
          metaDescription: true,
          imageCoverLink: true,
          imageAlt: true,
          icon: true,
          intro: true,
          faqs: { select: { id: true, question: true, answer: true }, orderBy: { index: "asc" } },
          courses: {
            select: { id: true, title: true, link: true, imageSquareLink: true },
            where: published,
            orderBy: { index: "asc" },
          },
        },
      }),
    ["section-by-link", link],
    { tags: [CACHE_TAGS.section(link)] },
  )(),
);
