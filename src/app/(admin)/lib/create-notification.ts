import { prisma } from "@/lib/prisma";

export async function createFormSubmissionNotification({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: "response" | "eligibility";
}) {
  try {
    // 1. Find all admins and editors
    const adminsAndEditors = await prisma.user.findMany({
      where: {
        role: { in: ["admin", "moderator"] },
      },
      select: { id: true },
    });

    const recipientIds = adminsAndEditors.map((u) => u.id);

    // 2. Create the notification
    await prisma.notification.create({
      data: {
        title: title,
        description: description,
        type: type,
        recipients: recipientIds,
        readBy: [],
      },
    });
  } catch (error) {
    console.error("Failed to create form submission notification:", error);
  }
}
