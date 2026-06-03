/**
 * app/api/invoice/route.ts
 *
 * POST /api/invoice
 * Accepts an InvoicePayload, validates it with Zod, renders a PDF,
 * uploads it to Cloudinary, persists the Cloudinary URL in Prisma,
 * and returns that URL to the caller.
 */

import { renderToBuffer } from "@react-pdf/renderer";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { ZodError } from "zod";

import { InvoicePDF } from "@/app/(admin)/admin/invoice/components/InvoicePDF";
import { InvoicePayloadSchema } from "@/app/(admin)/admin/invoice/schema";
import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";
import { sendInvoiceEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

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
  return new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "invoices",
        public_id: publicId,
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary did not return an upload result"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
  await getUserOrRedirect();
  try {
    const raw = await req.json();

    // ── Validate — throws ZodError on bad data ─────────────────────────────
    const invoice = InvoicePayloadSchema.parse(raw);

    // ── Render PDF ────────────────────────────────────────────────────────
    const buffer = await renderToBuffer(
      React.createElement(InvoicePDF, { invoice }) as any,
    );

    const pdfBuffer = Buffer.from(buffer);
    const uploadedPdf = await uploadPdfToCloudinary(
      pdfBuffer,
      `invoice-${invoice.invoiceNumber}.pdf`,
    );

    try {
      const savedInvoice = await prisma.invoice.create({
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
        include: {
          items: true,
        },
      });

      if (invoice.sendInvoiceByEmail) {
        try {
          await sendInvoiceEmail({
            to: invoice.billToEmail,
            invoiceNumber: savedInvoice.invoiceNumber,
            pdfLink: savedInvoice.pdfLink,
            pdfBuffer,
            qualification: savedInvoice.items[0].description,
            messageHtml: invoice.emailMessage,
          });
        } catch (mailErr) {
          await prisma.invoice.delete({ where: { id: savedInvoice.id } });
          await cloudinary.uploader.destroy(uploadedPdf.public_id, {
            resource_type: "raw",
          });
          throw mailErr;
        }
      }

      return NextResponse.json({
        invoiceId: savedInvoice.id,
        invoiceNumber: savedInvoice.invoiceNumber,
        pdfLink: savedInvoice.pdfLink,
      });
    } catch (dbErr) {
      await cloudinary.uploader.destroy(uploadedPdf.public_id, {
        resource_type: "raw",
      });
      throw dbErr;
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.flatten().fieldErrors },
        { status: 422 },
      );
    }
    console.error("[invoice/route] PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
