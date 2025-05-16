"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { checkAccess } from "./helper";
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metaDescription: z.string().min(1, "Meta Description is required"),
  link: z.string().min(1, "Link is required"),
  index: z.number().min(1, "Index must be at least 1"),
  imageSquareLink: z.string().min(1, "Square image link is required"),
  imageSquarePublicId: z.string().min(1, "Square image ID is required"),
  imageCoverLink: z.string().min(1, "Cover image link is required"),
  imageCoverPublicId: z.string().min(1, "Cover image ID is required"),
});

type FormData = z.infer<typeof formSchema>;

export async function getSections() {
  try {
    const sections = await prisma.section.findMany({
      orderBy: {
        index: "asc",
      },
      include: {
        courses: true,
      },
    });
    return sections;
  } catch (error) {
    console.error("Error fetching sections:", error);
    return [];
  }
}

export async function getSectionById(id: string) {
  try {
    const section = await prisma.section.findUnique({
      where: { id },
    });
    return section;
  } catch (error) {
    console.error("Error fetching section:", error);
    throw new Error("Failed to fetch section");
  }
}
export async function getSectionByLink(link: string) {
  try {
    const section = await prisma.section.findUnique({
      where: { link },
      include: {
        courses: true,
      },
    });
    return section;
  } catch (error) {
    console.error("Error fetching section:", error);
  }
}

export async function createSection(input: Omit<FormData, "link">) {
  const author = await checkAccess();

  if (!author?.id) {
    return {
      error: { _form: ["You must be an admin to create a section."] },
    };
  }

  const link = input.title
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Allow letters, numbers, spaces, and hyphens
    .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
    .replace(/-+/g, "-") // Collapse multiple hyphens to a single one
    .toLowerCase()
    .trim();

  const parsed = formSchema.safeParse({ ...input, link });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.section.updateMany({
        where: { index: { gte: data.index } },
        data: { index: { increment: 1 } },
      });

      await tx.section.create({ data });
    });
    revalidatePath("/admin/section");
    revalidateTag("section:all");
    return { success: true };
  } catch (err) {
    console.error("Create section error:", err);
    return {
      error: { _form: ["Something went wrong. Please try again."] },
    };
  }
}

export async function updateSection(
  id: string,
  sectionLink: string,
  input: Omit<FormData, "link">
) {
  const author = await checkAccess();

  if (!author?.id) {
    return {
      error: { _form: ["You must be an admin to update a section."] },
    };
  }

  const link = input.title
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Allow letters, numbers, spaces, and hyphens
    .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
    .replace(/-+/g, "-") // Collapse multiple hyphens to a single one
    .toLowerCase()
    .trim();

  const parsed = formSchema.safeParse({ ...input, link });

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const newData = parsed.data;

  const existing = await prisma.section.findUnique({ where: { id } });
  if (!existing) {
    return {
      error: { _form: ["Section not found."] },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (newData.index !== existing.index) {
        if (newData.index < existing.index) {
          // Moving up: Shift down others in between
          await tx.section.updateMany({
            where: {
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
          await tx.section.updateMany({
            where: {
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
      await tx.section.update({
        where: { id },
        data: newData,
      });
    });
    revalidatePath("/admin/section");
    revalidatePath(`/category/${sectionLink}`);
    revalidateTag("section:all");
    return { success: true };
  } catch (error) {
    console.error("Update section failed:", error);
    return {
      error: { _form: ["Failed to update section. Please try again."] },
    };
  }
}

export async function deleteSection(id: string, link: string) {
  const author = await checkAccess();

  if (!author?.id) {
    return {
      error: { _form: ["You must be an admin to delete a section."] },
    };
  }

  try {
    const sectionToDelete = await prisma.section.findUnique({
      where: { id },
      include: { courses: true },
    });

    if (!sectionToDelete) {
      return {
        error: { _form: ["Section not found."] },
      };
    }
    if (sectionToDelete.courses.length > 0) {
      return {
        error: {
          _form: [
            "Can not delete while there have courses under this section.",
          ],
        },
      };
    }

    await prisma.$transaction(async (tx) => {
      // Delete the section
      await tx.section.delete({
        where: { id },
      });

      // Shift indexes down
      await tx.section.updateMany({
        where: {
          index: { gt: sectionToDelete.index },
        },
        data: {
          index: { decrement: 1 },
        },
      });
    });
    revalidatePath("/admin/section");
    revalidatePath(`/category/${link}`);
    revalidateTag("section:all");
    return { success: true };
  } catch (error) {
    console.error("Delete section failed:", error);
    return {
      error: { _form: ["Failed to delete section. Please try again."] },
    };
  }
}
