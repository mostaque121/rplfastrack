import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";
import InvoicePreview from "../components/InvoicePreview";

export default async function CreateInvoicePage() {
  await getUserOrRedirect();
  return <InvoicePreview />;
}
