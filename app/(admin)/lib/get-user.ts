import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
