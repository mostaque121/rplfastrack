import "server-only";

import { unstable_cache } from "next/cache";
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

export const getCourseByLink = cache((link: string) =>
  unstable_cache(
    () =>
      prisma.course.findUnique({
        where: { link, ...published },
        select: {
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
          section: { select: { title: true, link: true } },
        },
      }),
    ["course-by-link", link],
    { tags: [CACHE_TAGS.courses, CACHE_TAGS.course(link)] },
  )(),
);

export const getSectionByLink = cache((link: string) =>
  unstable_cache(
    () =>
      prisma.section.findUnique({
        where: { link },
        select: {
          title: true,
          link: true,
          metaDescription: true,
          imageCoverLink: true,
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
