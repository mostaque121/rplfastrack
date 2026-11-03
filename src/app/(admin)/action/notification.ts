"use server";

import { requireAdmin } from "@/app/(admin)/action/helper";
import { prisma } from "@/server/db";

type GetNotificationsOptions = {
  userId: string;
  page?: number;
  pageSize?: number;
  unreadOnly?: boolean;
};

export async function getNotifications({
  userId,
  page = 1,
  pageSize = 20,
  unreadOnly = false,
}: GetNotificationsOptions) {
  await requireAdmin();
  const skip = (page - 1) * pageSize;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereCondition: any = {
    recipients: {
      has: userId,
    },
  };

  if (unreadOnly) {
    whereCondition.readBy = {
      not: {
        has: userId,
      },
    };
  }

  const notifications = await prisma.notification.findMany({
    where: whereCondition,
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: pageSize,
  });

  const totalCount = await prisma.notification.count({ where: whereCondition });

  return {
    notifications,
    pagination: {
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    },
  };
}

export async function markAllNotificationsAsRead(userId: string) {
  await requireAdmin();
  try {
    await prisma.notification.updateMany({
      where: {
        recipients: {
          has: userId,
        },
        NOT: {
          readBy: {
            has: userId,
          },
        },
      },
      data: {
        readBy: {
          push: userId,
        },
      },
    });

    return {
      success: true,
      message: "All notifications marked as read",
    };
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
    return {
      success: false,
      message: "An error occurred while marking notifications as read",
    };
  }
}
