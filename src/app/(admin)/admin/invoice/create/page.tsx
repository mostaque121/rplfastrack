import { getAdminOrRedirect } from "@/server/admin";

import InvoicePreview from "../components/invoice-preview";

export default async function CreateInvoicePage() {
  await getAdminOrRedirect();
  return <InvoicePreview />;
}
