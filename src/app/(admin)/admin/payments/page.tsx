import { getUserOrRedirect } from "../../lib/get-user";
import PaymentDashboard from "./components/payment-dashboard";
export default async function Page() {
  await getUserOrRedirect();
  return (
    <div>
      <PaymentDashboard />
    </div>
  );
}
