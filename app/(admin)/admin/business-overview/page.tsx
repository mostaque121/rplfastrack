import { auth } from "@/auth";
import { NotAuthenticatedPage } from "@/components/not-auth";
import PaymentAnalytics from "../../components/business-overview/payment-analytics";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return <NotAuthenticatedPage />;
  }
  return (
    <div>
      <PaymentAnalytics />
    </div>
  );
}
