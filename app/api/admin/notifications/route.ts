import { Prisma } from "@/app/generated/prisma";
import { auth } from "@/lib/auth"; // Import your Better Auth instance
import { prisma } from "@/lib/prisma";
import { withAdminGuard } from "@/lib/withAdminGuard";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAdminGuard(async function GET(request: NextRequest) {
  try {
    // 1. Securely fetch the current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // 2. Extract the userId directly from the session
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in." },
        { status: 401 },
      );
    }

    // 3. Extract only pagination parameters from the URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const skip = (page - 1) * pageSize;

    const whereCondition: Prisma.NotificationWhereInput = {
      recipients: { has: userId }, // This is now guaranteed to be the logged-in user
    };

    if (unreadOnly) {
      Object.assign(whereCondition, { NOT: { readBy: { has: userId } } });
    }

    // 4. Fetch from database
    const [notifications, totalCount] = await prisma.$transaction([
      prisma.notification.findMany({
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.notification.count({ where: whereCondition }),
    ]);

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
      },
    });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
});

export const POST = withAdminGuard(async function POST(request: NextRequest) {
  try {
    // 1. Securely fetch the current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // 2. Extract the userId directly from the session
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in." },
        { status: 401 },
      );
    }

    // 3. Execute the Prisma update for the logged-in user
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

    // 4. Return success response
    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while marking notifications as read",
      },
      { status: 500 },
    );
  }
});
