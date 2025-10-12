import { auth } from "@/auth";
import { NotAuthenticatedPage } from "@/components/not-auth";
import HomeDashboard from "../components/home/home-dashboard";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return <NotAuthenticatedPage />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <HomeDashboard />
    </div>
  );
}
