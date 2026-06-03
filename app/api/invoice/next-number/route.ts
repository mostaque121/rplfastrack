/**
 * app/api/invoice/next-number/route.ts
 *
 * GET /api/invoice/next-number
 * Returns the next available invoice number by querying the database.
 */

import { NextInvoiceNumberResponseSchema } from "@/app/(admin)/admin/invoice/schema";
import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";
import { getNextInvoiceNumber } from "@/app/(admin)/lib/getNextInvoiceNumber";
import { NextResponse } from "next/server";

export async function GET() {
  await getUserOrRedirect();
  try {
    const invoiceNumber = await getNextInvoiceNumber();

    // Validate our own response shape (defensive)
    const body = NextInvoiceNumberResponseSchema.parse({ invoiceNumber });

    return NextResponse.json(body);
  } catch (err) {
    console.error("[next-number] error:", err);
    return NextResponse.json(
      { error: "Could not generate invoice number" },
      { status: 500 },
    );
  }
}
