import PaymentDashboard from "./components/payment-dashboard";
import { getUserOrRedirect } from "../../lib/get-user";
export default async function Page() {
  await getUserOrRedirect();
  return (
    <div>
      <PaymentDashboard />
    </div>
  );
}
