import { NextResponse } from "next/server";

import { cloudinary } from "@/lib/cloudinary-client";
import { prisma } from "@/lib/prisma";
import { withAdminGuard } from "@/lib/withAdminGuard";

export const DELETE = withAdminGuard(async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      select: { id: true, pdfID: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const destroyResult = await cloudinary.uploader.destroy(invoice.pdfID, {
      resource_type: "raw",
    });

    if (destroyResult.result !== "ok" && destroyResult.result !== "not found") {
      return NextResponse.json(
        { error: "Failed to remove PDF from Cloudinary" },
        { status: 500 },
      );
    }

    await prisma.invoice.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/invoices/[id]] delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 },
    );
  }
});
