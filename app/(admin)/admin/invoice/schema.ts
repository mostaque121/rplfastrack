import { z } from "zod";

// ── Line item ─────────────────────────────────────────────────────────────────

export const InvoiceItemSchema = z.object({
  description: z.string().min(1, "Item description is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be 0 or greater"),
});

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;

// ── Full invoice payload (sent from frontend → API → PDF renderer) ────────────
// Dates are ISO strings over the wire (JSON-serialisable).
// The frontend converts Date objects → toISOString() before POST.

export const InvoicePayloadSchema = z.object({
  // ── Company (static, comes from COMPANY_DEFAULTS on the client) ────────────
  companyName: z.string().min(1),
  companyAddress: z.string().min(1),
  companyCity: z.string().min(1),
  companyCountry: z.string().min(1),
  companyMobile: z.string().min(1),
  companyWebsite: z.string().min(1),
  companyABN: z.string().min(1),
  logoUrl: z.string().optional(),

  // ── Recipient ──────────────────────────────────────────────────────────────
  billToName: z.string().min(1, "Client name is required"),
  billToEmail: z.email("A valid email is required"),

  // ── Invoice meta ──────────────────────────────────────────────────────────
  invoiceNumber: z
    .string()
    .min(1, "Invoice number is required")
    .regex(/^RFT-\d+$/, "Format must be RFT-{number}"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  paymentDue: z.string().min(1, "Payment due date is required"),

  // ── Line items ────────────────────────────────────────────────────────────
  items: z
    .array(InvoiceItemSchema)
    .min(1, "At least one line item is required"),

  // ── Financials ────────────────────────────────────────────────────────────
  totalAmount: z.number().min(0),
  amountPaid: z.number().min(0).default(0),
  amountDue: z.number().min(0),

  // ── Banking / notes ───────────────────────────────────────────────────────
  bankAccountName: z.string().min(1),
  bankBSB: z.string().min(1),
  bankAccountNumber: z.string().min(1),
  extraNotes: z.string().optional(),
  gstIncluded: z.boolean().default(true),
  sendInvoiceByEmail: z.boolean().default(false),
  emailMessage: z.string().default(""),
});

export type InvoicePayload = z.infer<typeof InvoicePayloadSchema>;

// ── Form state (frontend only — uses Date objects, not ISO strings) ───────────
// The form keeps Date objects for the date-pickers.
// Before submitting to the API we serialize them (see serializeForApi below).

export const InvoiceFormSchema = InvoicePayloadSchema.omit({
  invoiceDate: true,
  paymentDue: true,
  totalAmount: true,
  amountDue: true,
}).extend({
  invoiceDate: z.date("Invoice date is required"),
  paymentDue: z.date("Payment due is required"),
});

export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;

// ── Serialiser — converts form values to API payload ─────────────────────────

export function serializeForApi(
  form: InvoiceFormValues & { totalAmount: number; amountDue: number },
): InvoicePayload {
  return {
    ...form,
    invoiceDate: form.invoiceDate.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    paymentDue: form.paymentDue.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };
}

// ── Next-number API response ──────────────────────────────────────────────────

export const NextInvoiceNumberResponseSchema = z.object({
  invoiceNumber: z.string(),
});

export type NextInvoiceNumberResponse = z.infer<
  typeof NextInvoiceNumberResponseSchema
>;
