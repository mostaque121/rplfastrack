import PaymentAnalytics from "../../components/business-overview/payment-analytics";
import { getUserOrRedirect } from "../../lib/get-user";

export default async function Page() {
  await getUserOrRedirect();
  return (
    <div>
      <PaymentAnalytics />
    </div>
  );
}
