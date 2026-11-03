import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";

import InvoicePreview from "../components/invoice-preview";

export default async function CreateInvoicePage() {
  await getUserOrRedirect();
  return <InvoicePreview />;
}
