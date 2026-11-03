/**
 * app/(admin)/admin/invoice/[id]/edit/page.tsx
 */

import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InvoicePreview from "../../components/InvoicePreview";
import type { InvoiceFormValues } from "../../schema";

/** Map the persisted invoice shape into the form's default values. */
function toFormDefaults(
  invoice: NonNullable<Awaited<ReturnType<typeof getInvoice>>>,
): Partial<InvoiceFormValues> {
  return {
    invoiceNumber: invoice.invoiceNumber,
    invoiceDate: invoice.invoiceDate,
    paymentDue: invoice.paymentDue,
    extraNotes: invoice.extraNotes ?? "",
    gstIncluded: invoice.gstIncluded,
    bankAccountName: invoice.bankAccountName,
    bankAccountNumber: invoice.bankAccountNumber,
    bankBSB: invoice.bankBSB,
    billToName: invoice.billToName,
    billToEmail: invoice.billToEmail,
    amountPaid: invoice.amountPaid.toNumber(),
    items: invoice.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      price: item.price.toNumber(),
    })),
  };
}

async function getInvoice(id: string) {
  return prisma.invoice.findUnique({
    where: { id },
    include: { items: true },
  });
}

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUserOrRedirect();
  const { id } = await params;

  const invoice = await getInvoice(id);
  if (!invoice) notFound();

  return (
    <InvoicePreview
      invoiceId={invoice.id}
      defaultValues={toFormDefaults(invoice)}
    />
  );
}
