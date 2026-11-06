import "server-only";

import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { cache } from "react";

import { CACHE_TAGS } from "@/config/cache-tags";
import { prisma } from "@/server/db";

// Cached public reads, invalidated by tag when a guide is saved (no time-based revalidate).
// unstable_cache stores JSON, so Date fields come back as strings.

const published = { status: "PUBLISHED" } as const;

const cardSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  imageLink: true,
  imageAlt: true,
  body: true,
  updatedAt: true,
} as const;

/** Every published guide for /guides, the sitemap and "more guides". `body` is only used
 * for the reading time and is dropped before it reaches a client component. */
export const listGuides = cache(
  unstable_cache(
    async () => {
      const guides = await prisma.guide.findMany({
        where: published,
        select: cardSelect,
        orderBy: [{ index: "asc" }, { createdAt: "asc" }],
      });
      return guides.map(({ body, ...guide }) => ({
        ...guide,
        readingMinutes: readingMinutes(body),
      }));
    },
    ["list-guides"],
    { tags: [CACHE_TAGS.guides] },
  ),
);

export type GuideCardData = Awaited<ReturnType<typeof listGuides>>[number];

const guideSelect = {
  id: true,
  title: true,
  slug: true,
  metaTitle: true,
  metaDescription: true,
  excerpt: true,
  body: true,
  imageLink: true,
  imageAlt: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  faqs: { select: { id: true, question: true, answer: true }, orderBy: { index: "asc" } },
  courses: {
    select: {
      course: {
        select: {
          id: true,
          title: true,
          link: true,
          status: true,
          imageUrl: true,
          section: { select: { imageUrl: true } },
        },
      },
    },
    orderBy: { index: "asc" },
  },
} as const;

export const getGuideBySlug = cache((slug: string) =>
  unstable_cache(
    () => prisma.guide.findUnique({ where: { slug, ...published }, select: guideSelect }),
    ["guide-by-slug", slug],
    { tags: [CACHE_TAGS.guides, CACHE_TAGS.guide(slug)] },
  )(),
);

/** In Draft Mode (admins only) reads uncached and includes drafts. */
export const getGuideForPage = cache(async (slug: string) => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return getGuideBySlug(slug);
  return prisma.guide.findUnique({ where: { slug }, select: guideSelect });
});

/** ~230 words a minute, rounded up, at least 1. */
export function readingMinutes(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}
