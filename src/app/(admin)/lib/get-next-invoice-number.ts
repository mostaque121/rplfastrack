import { prisma } from "@/lib/prisma";

export async function getNextInvoiceNumber(): Promise<string> {
  const latestInvoice = await prisma.invoice.findFirst({
    select: { invoiceNumber: true },
    where: { invoiceNumber: { startsWith: "RFT-" } },
    orderBy: { invoiceNumber: "desc" },
  });

  if (!latestInvoice) {
    return "RFT-1001";
  }

  const match = latestInvoice.invoiceNumber.match(/^RFT-(\d+)$/);
  const max = match ? parseInt(match[1], 10) : 1000;

  return `RFT-${max + 1}`;
}
