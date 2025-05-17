import type { MetadataRoute } from "next";
import { getAllSections } from "./(main)/action/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = await getAllSections();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: "https://rplfastrack.com",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://rplfastrack.com/about-us",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://rplfastrack.com/about-rpl",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://rplfastrack.com/contact",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://rplfastrack.com/qualifications",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://rplfastrack.com/privacy-policy",
      lastModified: new Date(),
      priority: 0.4,
    },
    {
      url: "https://rplfastrack.com/refund-policy",
      lastModified: new Date(),
      priority: 0.4,
    },
    {
      url: "https://rplfastrack.com/terms-of-service",
      lastModified: new Date(),
      priority: 0.4,
    },
    {
      url: "https://rplfastrack.com/cookie-policy",
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: "https://rplfastrack.com/faq",
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: "https://rplfastrack.com/reviews",
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: "https://rplfastrack.com/write-review",
      lastModified: new Date(),
      priority: 0.6,
    },
  ];

  const sectionEntries: MetadataRoute.Sitemap = sections.map((section) => ({
    url: `https://rplfastrack.com/category/${section.link}`,
    lastModified: new Date(section.updatedAt),
    priority: 0.7,
  }));

  const courseEntries: MetadataRoute.Sitemap = sections.flatMap((section) =>
    section.courses
      ? section.courses.map((course) => ({
          url: `https://rplfastrack.com/qualifications/${course.link}`,
          lastModified: new Date(section.updatedAt),
          priority: 0.8,
        }))
      : []
  );

  return [...baseEntries, ...sectionEntries, ...courseEntries];
}
