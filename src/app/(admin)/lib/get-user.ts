import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

export async function getUserOrRedirect() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }
  if (user.role !== "admin") {
    redirect("/unauthorized");
  }
  return user;
}
