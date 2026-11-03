import { auth } from "@/lib/auth"; // Adjust this to point to your Better Auth instance
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAdminGuard(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextRequest, context: any) => {
    try {
      // 1. Fetch the active Better Auth session
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      // 2. 401 Unauthorized: The user is not logged in
      if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // 3. 403 Forbidden: User is logged in, but not an admin
      // Note: Make sure 'role' is included in your Better Auth user schema!
      if (session.user.role !== "admin") {
        return NextResponse.json(
          { error: "Forbidden: Admin access required" },
          { status: 403 },
        );
      }

      // 4. If checks pass, execute the actual route handler
      return await handler(req, context);
    } catch (error) {
      console.error("Auth Guard Error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  };
}
