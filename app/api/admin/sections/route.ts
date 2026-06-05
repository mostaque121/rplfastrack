import { withAdminGuard } from "@/lib/withAdminGuard";
import { NextResponse } from "next/server";
// Adjust the import path to wherever your Prisma client is initialized
import { prisma } from "@/lib/prisma";

export const GET = withAdminGuard(async function GET(request: Request) {
  try {
    const sections = await prisma.section.findMany({
      select: {
        id: true,
        title: true,
        courses: {
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
      orderBy: {
        index: "asc",
      },
    });

    // Return the data as a JSON response with a 200 status
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    console.error("Error fetching sections:", error);

    // Return an error response (e.g., 500 Internal Server Error)
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 },
    );
  }
});
