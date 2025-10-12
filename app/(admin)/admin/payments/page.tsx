import { auth } from "@/auth";
import { NotAuthenticatedPage } from "@/components/not-auth";
import PaymentDashboard from "../../components/payments/payment-dashboard";
export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return <NotAuthenticatedPage />;
  }
  return (
    <div>
      <PaymentDashboard />
    </div>
  );
}
