import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";
import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await getUserOrRedirect();
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
}
