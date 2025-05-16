"use server";
import { prisma } from "@/lib/prisma";
import { Section } from "@/type/type";
import { unstable_cache } from "next/cache";

/* export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        index: "asc",
      },
      include: {
        section: true,
      },
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
} */

export async function getCourseByLink(link: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { link },
      include: {
        section: true,
      },
    });
    return course;
  } catch (error) {
    console.error("Error fetching course:", error);
  }
}

export async function getSectionByLink(link: string) {
  try {
    const section = await prisma.section.findUnique({
      where: { link },
      include: {
        courses: {
          orderBy: {
            index: "asc",
          },
        },
      },
    });
    return section;
  } catch (error) {
    console.error("Error fetching section:", error);
  }
}

export async function _getAllSections(): Promise<Section[]> {
  try {
    const sections = await prisma.section.findMany({
      include: {
        courses: {
          orderBy: {
            index: "asc",
          },
        },
      },
      orderBy: {
        index: "asc",
      },
    });
    return sections;
  } catch (error) {
    console.error("Error fetching sections:", error);
    return [];
  }
}

export const getAllSections = unstable_cache(
  _getAllSections,
  ["get_all_sections"],
  {
    tags: ["section:all"],
  }
);
