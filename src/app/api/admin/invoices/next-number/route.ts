/**
 * app/api/invoice/next-number/route.ts
 *
 * GET /api/invoice/next-number
 * Returns the next available invoice number by querying the database.
 */

import { NextResponse } from "next/server";

import { NextInvoiceNumberResponseSchema } from "@/app/(admin)/admin/invoice/schema";
import { getNextInvoiceNumber } from "@/app/(admin)/lib/get-next-invoice-number";
import { getAdminOrRedirect } from "@/server/admin";
import { withAdminGuard } from "@/server/with-admin-guard";

export const GET = withAdminGuard(async function GET() {
  await getAdminOrRedirect();
  try {
    const invoiceNumber = await getNextInvoiceNumber();

    // Validate our own response shape (defensive)
    const body = NextInvoiceNumberResponseSchema.parse({ invoiceNumber });

    return NextResponse.json(body);
  } catch (err) {
    console.error("[next-number] error:", err);
    return NextResponse.json({ error: "Could not generate invoice number" }, { status: 500 });
  }
});
