"use server";
import { prisma } from "@/lib/prisma";
import { ResponseStage } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { checkAccess } from "./helper";

export const getAllResponses = async (
  search: string,
  page: number,
  pageSize: number
) => {
  type SearchCondition = {
    OR: {
      name?: { contains: string; mode: "insensitive" };
      email?: { contains: string; mode: "insensitive" };
      phone?: { contains: string; mode: "insensitive" };
      message?: { contains: string; mode: "insensitive" };
      interest?: { contains: string; mode: "insensitive" };
    }[];
  };

  let whereCondition: SearchCondition | undefined;

  if (search) {
    whereCondition = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
        { interest: { contains: search, mode: "insensitive" } },
      ],
    };
  }
  try {
    const skip = (page - 1) * pageSize;

    const [responses, totalItems] = await Promise.all([
      prisma.response.findMany({
        where: whereCondition,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          message: true,
          interest: true,
          createdAt: true,
          stage: true,
          notes: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              content: true,
              createdAt: true,
              responseId: true,
            },
          },
        },
      }),

      prisma.response.count({ where: whereCondition }),
    ]);

    return {
      responses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  } catch (err) {
    console.error("Failed to fetch users by search:", err);
    return {
      responses: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      },
    };
  }
};

export async function addNote(responseId: string, content: string) {
  const author = await checkAccess();
  if (!author || !author.id) {
    return { success: false, error: "Unauthorized" };
  }
  if (!content.trim()) {
    return { success: false, error: "Note content is required" };
  }

  try {
    const addedNote = await prisma.note.create({
      data: {
        content,
        responseId,
        noteType: "RESPONSE",
      },
    });

    revalidatePath("/admin/response");
    return { success: true, addedNote };
  } catch (error) {
    console.error("Failed to add note:", error);
    return { success: false, error: "Failed to add note" };
  }
}

export async function deleteNote(responseId: string, noteId: string) {
  const author = await checkAccess();
  if (!author || !author.id) {
    return { success: false, error: "Unauthorized" };
  }
  try {
    await prisma.note.delete({
      where: {
        id: noteId,
        responseId,
      },
    });

    revalidatePath("/admin/response");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete note:", error);
    return { success: false, error: "Failed to delete note" };
  }
}

export async function deleteResponse(responseId: string) {
  const author = await checkAccess();
  if (!author || !author.id) {
    return { success: false, error: "Unauthorized" };
  }
  try {
    await prisma.response.delete({
      where: {
        id: responseId,
      },
    });

    revalidatePath("/admin/response");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete response:", error);
    return { success: false, error: "Failed to delete response" };
  }
}

export async function editStage(responseId: string, newStage: ResponseStage) {
  const author = await checkAccess();
  if (!author || !author.id) {
    return { success: false, error: "Unauthorized" };
  }
  try {
    await prisma.response.update({
      where: { id: responseId },
      data: { stage: newStage },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update stage:", error);
    return {
      success: false,
      error: "Failed to update response stage",
    };
  }
}
