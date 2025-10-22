import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function checkAdmin() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    if (session.user.role === "admin") {
      return session.user;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error while checking admin status:", error);
    throw new Error("Unauthorized");
  }
}
export async function checkAccess() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error while checking admin status:", error);
    throw new Error("Unauthorized");
  }
}
