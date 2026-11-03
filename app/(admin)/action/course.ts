"use server";

import { requireAdmin } from "@/app/(admin)/action/helper";
import { prisma } from "@/lib/prisma";
import { CACHE_TAGS } from "@/config/cache-tags";
import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metaTitle: z.string().min(1, "Meta Title is required"),
  metaDescription: z.string().min(1, "Meta Description Title is required"),
  link: z.string().min(1, "Link is required"),
  index: z.number().min(1, "index is required"),
  imageSquareLink: z.string().min(1, "Image link is required"),
  imageSquarePublicId: z.string().min(1, "Image public ID is required"),
  imageCoverLink: z.string().min(1, "Image link is required"),
  imageCoverPublicId: z.string().min(1, "Image public ID is required"),

  description: z.string().min(10, "Description is required"),
  jobOpportunity: z.string().min(10, "Job Opportunity is required"),
  entryRequirement: z.string().min(10, "Entry Requirement is required"),
  packagingRule: z.string().min(10, "Packaging Rule is required"),
  coreUnits: z.string().min(10, "Core Units is required"),
  electiveUnits: z.string().min(10, "Elective Units is required"),
});

type FormData = z.infer<typeof formSchema>;

export async function getCourses() {
  await requireAdmin();
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
}
export async function getCourseById(id: string) {
  await requireAdmin();
  try {
    const course = await prisma.course.findUnique({
      where: { id },
    });
    return course;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
}
export async function getCourseByLink(link: string) {
  await requireAdmin();
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
export async function createCourse(
  input: Omit<FormData, "link">,
  sectionId: string,
  sectionLink: string,
) {
  await requireAdmin();
  const link = input.title
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove unwanted characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .toLowerCase()
    .trim()
    .replace(/^[-]+|[-]+$/g, "");

  const parsed = formSchema.safeParse({ ...input, link });

  if (!parsed.success) {
    return { error: parsed.error.issues };
  }

  const data = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.course.updateMany({
        where: { sectionId, index: { gte: data.index } },
        data: { index: { increment: 1 } },
      });

      await tx.course.create({
        data: {
          ...data,
          sectionId,
        },
      });
    });
    revalidatePath(`/admin/section/${sectionLink}`);
    revalidatePath(`/section/${sectionLink}`);
    updateTag(CACHE_TAGS.sections);
    return { success: true };
  } catch (err) {
    console.error("Create course error:", err);
    return {
      error: { _form: ["Something went wrong. Please try again."] },
    };
  }
}
export async function updateCourse(
  id: string,
  courseLink: string,
  sectionId: string,
  sectionLink: string,
  input: Omit<FormData, "link">,
) {
  await requireAdmin();
  const link = input.title
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove unwanted characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .toLowerCase()
    .trim()
    .replace(/^[-]+|[-]+$/g, "");

  const parsed = formSchema.safeParse({ ...input, link });

  if (!parsed.success) {
    return {
      error: parsed.error.issues,
    };
  }

  const newData = parsed.data;

  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    return {
      error: { _form: ["Course not found."] },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (newData.index !== existing.index) {
        if (newData.index < existing.index) {
          // Moving up: Shift down others in between
          await tx.course.updateMany({
            where: {
              sectionId,
              index: {
                gte: newData.index,
                lt: existing.index,
              },
              id: { not: id },
            },
            data: { index: { increment: 1 } },
          });
        } else {
          // Moving down: Shift up others in between
          await tx.course.updateMany({
            where: {
              sectionId,
              index: {
                gt: existing.index,
                lte: newData.index,
              },
              id: { not: id },
            },
            data: { index: { decrement: 1 } },
          });
        }
      }

      // Final update of the section
      await tx.course.update({
        where: { id },
        data: newData,
      });
    });
    updateTag(CACHE_TAGS.sections);
    revalidatePath(`/admin/section/${sectionLink}`);
    revalidatePath(`/section/${sectionLink}`);
    revalidatePath(`/courses/${courseLink}`);
    if (newData.link !== courseLink) revalidatePath(`/courses/${newData.link}`);

    return { success: true };
  } catch (error) {
    console.error("Update course failed:", error);
    return {
      error: { _form: ["Failed to update course. Please try again."] },
    };
  }
}
export async function deleteCourse(
  id: string,
  courseLink: string,
  sectionId: string,
  sectionLink: string,
) {
  await requireAdmin();
  try {
    const sectionToDelete = await prisma.course.findUnique({
      where: { id },
    });

    if (!sectionToDelete) {
      return {
        error: { _form: ["Course not found."] },
      };
    }

    await prisma.$transaction(async (tx) => {
      // Delete the section
      await tx.course.delete({
        where: { id },
      });

      // Shift indexes down
      await tx.course.updateMany({
        where: {
          sectionId,
          index: { gt: sectionToDelete.index },
        },
        data: {
          index: { decrement: 1 },
        },
      });
    });

    revalidatePath(`/admin/section/${sectionLink}`);
    revalidatePath(`/section/${sectionLink}`);
    revalidatePath(`/courses/${courseLink}`);
    updateTag(CACHE_TAGS.sections);

    return { success: true };
  } catch (error) {
    console.error("Delete course failed:", error);
    return {
      error: { _form: ["Failed to delete course. Please try again."] },
    };
  }
}
