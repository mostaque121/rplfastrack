import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { ZodError } from "zod";

import { InvoicePDF } from "@/app/(admin)/admin/invoice/components/InvoicePDF";
import { InvoicePayloadSchema } from "@/app/(admin)/admin/invoice/schema";
import { cloudinary } from "@/lib/cloudinary-client";
import { sendInvoiceEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { withAdminGuard } from "@/lib/withAdminGuard";

// Reuse the same date parser as the create route.
const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseInvoiceDate(value: string): Date {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2}) ([A-Za-z]+) (\d{4})$/);

  if (match) {
    const day = Number(match[1]);
    const monthName = match[2].toLowerCase();
    const month = MONTHS[monthName];
    const year = Number(match[3]);

    if (month === undefined) {
      throw new Error(`Unsupported invoice month: ${match[2]}`);
    }

    const date = new Date(Date.UTC(year, month, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month ||
      date.getUTCDate() !== day
    ) {
      throw new Error(`Invalid invoice date: ${value}`);
    }
    return date;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid invoice date: ${value}`);
  }
  return parsed;
}

function uploadPdfToCloudinary(buffer: Buffer, publicId: string) {
  return new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "invoices", public_id: publicId, resource_type: "raw" },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(
              new Error("Cloudinary did not return an upload result"),
            );
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );
      stream.end(buffer);
    },
  );
}

type RouteParams = { params: Promise<{ id: string }> };

// ── DELETE /api/admin/invoices/:id ───────────────────────────────────────────
export const DELETE = withAdminGuard(async function DELETE(
  _request: Request,
  { params }: RouteParams,
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

// ── GET /api/admin/invoices/:id ─────────────────────────────────────────────
export const GET = withAdminGuard(async function GET(
  _req: NextRequest,
  { params }: RouteParams,
) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { items: true },
  });

  return NextResponse.json({ invoice });
});

// ── PUT /api/admin/invoices/:id ──────────────────────────────────────────────
export const PUT = withAdminGuard(async function PUT(
  req: NextRequest,
  { params }: RouteParams,
) {
  const { id } = await params;

  try {
    const existing = await prisma.invoice.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const raw = await req.json();
    const invoice = InvoicePayloadSchema.parse(raw);
    const invoiceWithDefaults = {
      ...invoice,
      logoUrl:
        invoice.logoUrl ||
        `${process.env.NEXT_PUBLIC_BASE_URL}/invoice-logo.png`,
    };

    // Re-render the PDF with the updated data
    const buffer = await renderToBuffer(
      React.createElement(InvoicePDF, { invoice: invoiceWithDefaults }) as any,
    );
    const pdfBuffer = Buffer.from(buffer);

    // Overwrite the same Cloudinary asset with .pdf extension
    const uploadedPdf = await uploadPdfToCloudinary(
      pdfBuffer,
      `invoice-${invoice.invoiceNumber}.pdf`, // Added .pdf here
    );

    const updatedInvoice = await prisma.$transaction(async (tx) => {
      await tx.invoiceItem.deleteMany({ where: { invoiceId: id } });

      return tx.invoice.update({
        where: { id },
        data: {
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: parseInvoiceDate(invoice.invoiceDate),
          paymentDue: parseInvoiceDate(invoice.paymentDue),
          extraNotes: invoice.extraNotes ?? null,
          gstIncluded: invoice.gstIncluded,
          bankAccountName: invoice.bankAccountName,
          bankAccountNumber: invoice.bankAccountNumber,
          bankBSB: invoice.bankBSB,
          billToName: invoice.billToName,
          billToEmail: invoice.billToEmail,
          total: invoice.totalAmount,
          amountPaid: invoice.amountPaid,
          amountDue: invoice.amountDue,
          pdfLink: uploadedPdf.secure_url,
          pdfID: uploadedPdf.public_id,
          items: {
            create: invoice.items.map((item) => ({
              description: item.description,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { items: true },
      });
    });

    if (invoice.sendInvoiceByEmail) {
      await sendInvoiceEmail({
        to: invoice.billToEmail,
        invoiceNumber: updatedInvoice.invoiceNumber,
        pdfLink: updatedInvoice.pdfLink,
        pdfBuffer,
        qualification: updatedInvoice.items[0].description,
        messageHtml: invoice.emailMessage,
      });
    }

    return NextResponse.json({
      invoiceId: updatedInvoice.id,
      invoiceNumber: updatedInvoice.invoiceNumber,
      pdfLink: updatedInvoice.pdfLink,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.flatten().fieldErrors },
        { status: 422 },
      );
    }
    console.error("[invoices/:id PUT] update error:", err);
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 },
    );
  }
});
