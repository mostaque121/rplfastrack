import { SITE_URL } from "@/config/site";
import { absoluteUrl } from "@/lib/url";
import type { MetadataRoute } from "next";
import { getAllSections } from "./(main)/action/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = await getAllSections();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date("2026-03-13"),
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about-us"),
      lastModified: new Date("2026-03-13"),
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about-rpl"),
      lastModified: new Date("2026-03-13"),
      priority: 0.9,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date("2026-03-13"),
      priority: 0.8,
    },
    {
      url: absoluteUrl("/courses"),
      lastModified: new Date("2026-03-13"),
      priority: 0.9,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: new Date("2025-05-10"),
      priority: 0.4,
    },
    {
      url: absoluteUrl("/refund-policy"),
      lastModified: new Date("2025-05-10"),
      priority: 0.4,
    },
    {
      url: absoluteUrl("/terms-of-service"),
      lastModified: new Date("2025-05-10"),
      priority: 0.4,
    },
    {
      url: absoluteUrl("/cookie-policy"),
      lastModified: new Date("2025-05-10"),
      priority: 0.3,
    },
    {
      url: absoluteUrl("/faq"),
      lastModified: new Date("2026-03-13"),
      priority: 0.6,
    },
    {
      url: absoluteUrl("/reviews"),
      lastModified: new Date("2026-03-13"),
      priority: 0.6,
    },
    {
      url: absoluteUrl("/write-review"),
      lastModified: new Date("2026-03-13"),
      priority: 0.6,
    },
  ];

  const sectionEntries: MetadataRoute.Sitemap = sections.map((section) => ({
    url: absoluteUrl(`/section/${section.link}`),
    lastModified: section.updatedAt
      ? new Date(section.updatedAt)
      : new Date("2026-03-13"),
    priority: 0.7,
  }));

  const courseEntries: MetadataRoute.Sitemap = sections.flatMap((section) =>
    section.courses
      ? section.courses.map((course) => ({
          url: absoluteUrl(`/courses/${course.link}`),
          lastModified: course.updatedAt
            ? new Date(course.updatedAt)
            : new Date("2026-03-13"),
          priority: 0.8,
        }))
      : [],
  );

  return [...baseEntries, ...sectionEntries, ...courseEntries];
}
