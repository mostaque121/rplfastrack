import { listSections } from "@/features/courses/queries";
import { absoluteUrl } from "@/lib/url";

import type { MetadataRoute } from "next";

// Static pages get no lastModified: a made-up date is worse than none.
// /write-review is left out on purpose (noindex, no search value).
const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/about-us", priority: 0.9 },
  { path: "/about-rpl", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/reviews", priority: 0.6 },
  { path: "/privacy-policy", priority: 0.4 },
  { path: "/refund-policy", priority: 0.4 },
  { path: "/terms-of-service", priority: 0.4 },
  { path: "/cookie-policy", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = await listSections();
  const courses = sections.flatMap((section) => section.courses ?? []);

  // The home page and /courses list every section and course, so they
  // change whenever any of them does.
  const latestUpdate = [...sections, ...courses].reduce<Date | undefined>((latest, item) => {
    const date = new Date(item.updatedAt);
    return !latest || date > latest ? date : latest;
  }, undefined);

  return [
    { url: absoluteUrl("/"), lastModified: latestUpdate, priority: 1.0 },
    {
      url: absoluteUrl("/courses"),
      lastModified: latestUpdate,
      priority: 0.9,
    },
    ...STATIC_PAGES.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      priority,
    })),
    ...sections.map((section) => ({
      url: absoluteUrl(`/section/${section.link}`),
      lastModified: new Date(section.updatedAt),
      priority: 0.7,
    })),
    ...courses.map((course) => ({
      url: absoluteUrl(`/courses/${course.link}`),
      lastModified: new Date(course.updatedAt),
      priority: 0.8,
    })),
  ];
}
