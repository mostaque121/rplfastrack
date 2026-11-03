import { getUserOrRedirect } from "../lib/get-user";
import HomeDashboard from "./components/home-dashboard";
export default async function Page() {
  await getUserOrRedirect();
  return (
    <div className="container mx-auto px-4 py-10">
      <HomeDashboard />
    </div>
  );
}
