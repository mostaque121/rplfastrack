import "server-only";
import { CACHE_TAGS } from "@/config/cache-tags";
import { prisma } from "@/server/db";
import { unstable_cache } from "next/cache";
import { notFound, permanentRedirect } from "next/navigation";

// The whole table in one cached entry, so a 404 never costs a DB query
// until an admin changes a link (which invalidates the tag).
const getRedirects = unstable_cache(
  async () => {
    try {
      return await prisma.redirect.findMany({
        select: { fromPath: true, toPath: true },
      });
    } catch (error) {
      console.error("Error fetching redirects:", error);
      return [];
    }
  },
  ["redirects"],
  { tags: [CACHE_TAGS.redirects] },
);

export async function findRedirect(path: string) {
  const redirects = await getRedirects();
  return redirects.find((r) => r.fromPath === path)?.toPath ?? null;
}

/** For a missing course/section: 301 to its new URL if known, else 404. */
export async function redirectOrNotFound(path: string): Promise<never> {
  // Slugs are always lowercase; Google has some mixed-case variants.
  const lowercase = path.toLowerCase();
  if (lowercase !== path) permanentRedirect(lowercase);

  const to = await findRedirect(path);
  if (to) permanentRedirect(to);
  notFound();
}
