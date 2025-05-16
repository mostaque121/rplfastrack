import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { forbidden } from "next/navigation";

export async function checkAdmin() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      forbidden();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      forbidden();
    }

    if (user.role === "admin") {
      return session.user;
    } else {
      forbidden();
    }
  } catch (error) {
    console.error("Error while checking admin status:", error);
    forbidden();
  }
}
export async function checkAccess() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      forbidden();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      forbidden();
    }

    if (user.role === "admin" || user.role === "editor") {
      return session.user;
    } else {
      forbidden();
    }
  } catch (error) {
    console.error("Error while checking admin status:", error);
    forbidden();
  }
}
