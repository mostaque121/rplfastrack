"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getAllEligibility = async (
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
      qualifications?: { contains: string; mode: "insensitive" };
      industry?: { contains: string; mode: "insensitive" };
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
        { qualifications: { contains: search, mode: "insensitive" } },
        { industry: { contains: search, mode: "insensitive" } },
      ],
    };
  }
  try {
    const skip = (page - 1) * pageSize;

    const [eligibilities, totalItems] = await Promise.all([
      prisma.eligibilitySubmission.findMany({
        where: whereCondition,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          email: true,
          message: true,
          industry: true,
          qualification: true,
          stateLivedIn: true,
          yearsOfExperience: true,
          createdAt: true,
          notes: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              content: true,
              createdAt: true,
              eligibilitySubmissionId: true,
            },
          },
        },
      }),

      prisma.eligibilitySubmission.count({ where: whereCondition }),
    ]);

    return {
      eligibilities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    };
  } catch (err) {
    console.error("Failed to fetch eligibilities by search:", err);
    return {
      eligibilities: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      },
    };
  }
};

export async function addNote(
  eligibilitySubmissionId: string,
  content: string
) {
  if (!content.trim()) {
    return { success: false, error: "Note content is required" };
  }

  try {
    const addedNote = await prisma.note.create({
      data: {
        content,
        eligibilitySubmissionId,
        noteType: "ELIGIBILITY",
      },
    });

    revalidatePath("/admin/eligibility");
    return { success: true, addedNote };
  } catch (error) {
    console.error("Failed to add note:", error);
    return { success: false, error: "Failed to add note" };
  }
}

export async function deleteNote(
  eligibilitySubmissionId: string,
  noteId: string
) {
  try {
    await prisma.note.delete({
      where: {
        id: noteId,
        eligibilitySubmissionId,
      },
    });

    revalidatePath("/admin/eligibility");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete note:", error);
    return { success: false, error: "Failed to delete note" };
  }
}

export async function deleteEligibility(eligibilityId: string) {
  try {
    await prisma.eligibilitySubmission.delete({
      where: {
        id: eligibilityId,
      },
    });

    revalidatePath("/admin/eligibility");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete eligibility:", error);
    return { success: false, error: "Failed to delete eligibility" };
  }
}
