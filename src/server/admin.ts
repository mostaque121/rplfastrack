import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { auth } from "@/server/auth";

const getSessionUser = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
});

/** For Server Actions and route handlers: throws unless an admin is signed in. */
export async function requireAdmin() {
  const user = await getSessionUser().catch((error) => {
    console.error("Error while checking admin status:", error);
    return null;
  });
  if (user?.role !== "admin") throw new Error("Unauthorized");
  return user;
}

/** For admin pages: redirects to sign-in, or to /unauthorized for non-admins. */
export async function getAdminOrRedirect() {
  const user = await getSessionUser();
  if (!user) redirect("/signin");
  if (user.role !== "admin") redirect("/unauthorized");
  return user;
}
