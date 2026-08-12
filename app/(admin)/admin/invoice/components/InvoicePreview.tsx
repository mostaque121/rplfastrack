/**
 * components/invoice/InvoicePreview.tsx
 *
 * Invoice creation form.
 * - Types from lib/invoice.schema (no local re-declaration)
 * - Zod client-side validation via react-hook-form + zodResolver
 * - DatePicker imported from @/components/ui/date-picker (shadcn)
 * - Invoice number auto-generated via GET /api/invoice/next-number
 *
 * ── Design tokens ────────────────────────────────────────────────────────────
 * A document should look like a document, not a marketing card. This treats
 * the invoice as an actual paper artifact: warm paper background, a deep
 * forest-green letterhead, a serif wordmark, and tabular/mono figures for
 * anything financial. The perforated divider under the letterhead is the one
 * signature flourish — everything else stays quiet.
 *
 *   ink          #1C1F1C   body text
 *   paper        #FAF8F4   page background
 *   paper-muted  #F3F1EA   recessed panels (line items, notes)
 *   forest       #1B4D3E   letterhead / primary actions
 *   brand-green  #2E7D32   existing RPL brand accent, used for highlights
 *   gold         #A67C3D   auto-generate / success accent
 *   line         #E5E1D6   hairline dividers (warm, not cold gray)
 *
 * Swap `font-serif` for a real display face via next/font if you have one
 * loaded in your root layout (e.g. Fraunces, Source Serif 4) — it'll pick it
 * up automatically since it's just the Tailwind utility.
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Download,
  Loader2,
  Mail,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

// shadcn/ui primitives — adjust import paths to match your project
import { DatePicker } from "@/components/custom-ui/date-picker"; // your existing component

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { NumberInput } from "@/components/custom-ui/number-input";
import { NumberInputDefault } from "@/components/custom-ui/number-input-default";
import SelectCourseName from "@/components/custom-ui/select-course-name";
import { useRPL } from "@/contexts/rpl-context";
import dynamic from "next/dynamic";
import { COMPANY_DEFAULTS } from "../constants";
import {
  InvoiceFormSchema,
  type InvoiceFormValues,
  type NextInvoiceNumberResponse,
  serializeForApi,
} from "../schema";

const RichTextEditor = dynamic(
  () => import("@/components/custom-ui/rich-text-editor"),
  { ssr: false },
);

const EMAIL_TEMPLATE = ({
  firstName,
  qualification,
}: {
  firstName: string;
  qualification: string;
}) => `<p>Hi ${firstName?.trim() || "[First Name]"},</p>
<p><br></p>
<p>Please find the attached invoice for the <strong>${qualification?.trim() || "[Qualification]"}</strong> through Recognition of Prior Learning (RPL).</p>
<p><br></p>
<p>Once the payment is received, we will begin your assessment with RTO and keep you updated throughout each stage of the process. If you have any questions or require further clarification, please feel free to reach out.</p>
<p><br></p>
<p>Kindly confirm once the payment has been made. Thank you.</p>
<p><br></p>
<p>Kind regards,</p>
<p><strong>Tanvir Ahmad</strong><br>
RPL Fast Track<br>
📞 <a href="tel:+61483921139" style="color: #333333; text-decoration: none;">+61 483 921 139</a><br>
🌐 <a href="https://www.rplfastrack.com" style="color: #1a73e8; text-decoration: none;">www.rplfastrack.com</a></p>`;

function getFirstName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] ?? "";
}

function getQualification(items: InvoiceFormValues["items"]) {
  return items[0]?.description?.trim() ?? "";
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

/** Recalculate totals whenever items or amountPaid change */
function useTotals(
  items: InvoiceFormValues["items"],
  amountPaid: number,
): { totalAmount: number; amountDue: number } {
  const totalAmount = items.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );
  const amountDue = Math.max(0, totalAmount - (Number(amountPaid) || 0));
  return { totalAmount, amountDue };
}

/** Fetch the next invoice number from the API */
async function fetchNextInvoiceNumber(): Promise<string> {
  const res = await fetch("/api/admin/invoices/next-number");
  if (!res.ok) throw new Error("Failed to fetch invoice number");
  const data: NextInvoiceNumberResponse = await res.json();
  return data.invoiceNumber;
}

// ── Formatting ────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "$" +
  n.toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Default form values ───────────────────────────────────────────────────────

function buildDefaultValues(): InvoiceFormValues {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 28);

  return {
    ...COMPANY_DEFAULTS,
    billToName: "",
    billToEmail: "",
    invoiceNumber: "RFT-",
    invoiceDate: today,
    paymentDue: dueDate,
    items: [{ description: "", quantity: 1, price: 0 }],
    amountPaid: 0,
    sendInvoiceByEmail: false,
    emailMessage: "",
  };
}

// ── Small presentational helpers ────────────────────────────────────────────

/** The perforated tear-line under the letterhead — the one signature detail. */
function Perforation() {
  return (
    <div className="h-3 w-full bg-[#1B4D3E] relative" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[radial-gradient(circle,#FAF8F4_1.5px,transparent_1.5px)] bg-size-[14px_3px] bg-repeat-x" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8578]">
      {children}
    </p>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  /** Pre-fill specific fields, e.g. when editing an existing invoice */
  defaultValues?: Partial<InvoiceFormValues>;
}

type NumberGenState = "idle" | "loading" | "success";

export default function InvoicePreview({ defaultValues }: Props) {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);
  const [generatedPdfLink, setGeneratedPdfLink] = useState<string | null>(null);

  const initialValues = useMemo(() => {
    const baseValues = { ...buildDefaultValues(), ...defaultValues };
    return {
      ...baseValues,
      emailMessage: EMAIL_TEMPLATE({
        firstName: getFirstName(baseValues.billToName),
        qualification: getQualification(baseValues.items),
      }),
    };
  }, [defaultValues]);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceFormSchema) as any,
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const sendInvoiceByEmail = useWatch({ control, name: "sendInvoiceByEmail" });
  const billToName = useWatch({ control, name: "billToName" });
  const invoiceItems = useWatch({ control, name: "items" });
  const emailMessage = useWatch({ control, name: "emailMessage" });
  const [emailMessageTouched, setEmailMessageTouched] = useState(false);
  const [lastAutoEmailMessage, setLastAutoEmailMessage] = useState(
    initialValues.emailMessage,
  );

  // Line items field array
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  // Live-watch for totals
  const watchedItems = invoiceItems;
  const watchedAmtPaid = useWatch({ control, name: "amountPaid" });
  const { totalAmount, amountDue } = useTotals(
    watchedItems,
    watchedAmtPaid ?? 0,
  );

  useEffect(() => {
    if (!sendInvoiceByEmail || emailMessageTouched) {
      return;
    }

    const nextAutoMessage = EMAIL_TEMPLATE({
      firstName: getFirstName(billToName ?? ""),
      qualification: getQualification(invoiceItems ?? []),
    });

    if (emailMessage !== nextAutoMessage) {
      setValue("emailMessage", nextAutoMessage, { shouldDirty: false });
      setLastAutoEmailMessage(nextAutoMessage);
    }
  }, [
    billToName,
    emailMessage,
    emailMessageTouched,
    invoiceItems,
    sendInvoiceByEmail,
    setValue,
  ]);

  // ── Invoice number auto-generation state ───────────────────────────────
  // (previously piggy-backed on the RHF form state via a fake `_numState`
  // field cast through `as never` — plain component state does the same
  // job with none of the type-unsafety.)
  const [numState, setNumState] = useState<NumberGenState>("idle");

  const generateInvoiceNumber = useCallback(async () => {
    setNumState("loading");
    try {
      const next = await fetchNextInvoiceNumber();
      setValue("invoiceNumber", next, { shouldValidate: true });
      setNumState("success");
      setTimeout(() => setNumState("idle"), 3000);
    } catch {
      setNumState("idle");
    }
  }, [setValue]);

  // ── Submit → generate PDF ────────────────────────────────────────────────

  const onSubmit = async (values: InvoiceFormValues) => {
    if (generatedPdfLink) {
      return;
    }

    const payload = serializeForApi({ ...values, totalAmount, amountDue });

    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // Surface first validation error if present
      const firstIssue = Object.values(
        (err as { issues?: Record<string, string[]> }).issues ?? {},
      )[0]?.[0];
      form.setError("root", {
        message: firstIssue ?? "Could not generate PDF. Please try again.",
      });
      return;
    }

    const data = (await res.json()) as { pdfLink?: string };

    if (!data.pdfLink) {
      form.setError("root", {
        message: "Invoice was created, but no PDF link was returned.",
      });
      return;
    }

    setGeneratedPdfLink(data.pdfLink);
    window.open(data.pdfLink, "_blank", "noopener,noreferrer");
  };

  const handleGenerateAnotherPdf = () => {
    setGeneratedPdfLink(null);
    form.reset(initialValues);
    form.clearErrors();
    setEmailMessageTouched(false);
    setLastAutoEmailMessage(initialValues.emailMessage);
    setNumState("idle");
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const isGenerating = numState === "loading";
  const isSuccess = numState === "success";

  return (
    <div className="min-h-screen bg-[#FAF8F4] py-10 px-4 font-sans selection:bg-[#1B4D3E]/10">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="max-w-3xl mx-auto">
            {/* ── Top bar ─────────────────────────────────────────────────── */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8578] mb-1">
                  New document
                </p>
                <h1 className="text-2xl font-serif font-semibold text-[#1C1F1C] tracking-tight">
                  Create Invoice
                </h1>
              </div>
              <p className="text-xs text-[#8a8578]">
                Changes aren&apos;t saved until you generate the PDF.
              </p>
            </div>

            {/* Root-level error (server / PDF error) */}
            {errors.root && (
              <div
                role="alert"
                className="mb-4 text-sm text-[#8a2e2e] bg-[#f7ecec] border border-[#e7c9c9] rounded-xl px-4 py-2.5"
              >
                {errors.root.message}
              </div>
            )}

            {/* ── Invoice card ────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(28,31,28,0.04),0_8px_24px_rgba(28,31,28,0.06)] border border-[#E5E1D6] overflow-hidden">
              {/* Letterhead */}
              <div className="bg-[#1B4D3E] px-4 sm:px-8 pt-5 pb-6 flex justify-between items-start">
                <div className="space-y-1.5">
                  <p className="text-white text-sm font-serif font-semibold tracking-wide">
                    {COMPANY_DEFAULTS.companyName}
                  </p>
                  <p className="text-white/60 text-xs">
                    {COMPANY_DEFAULTS.companyWebsite}
                  </p>

                  <FormField
                    control={control}
                    name="companyABN"
                    render={({ field }) => (
                      <FormItem className="m-0 p-0">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="ABN (optional)"
                            aria-label="Company ABN"
                            className="bg-white/10 px-2 border border-white/20 text-white/80 placeholder:text-white/40 text-xs py-0 h-6 rounded-md focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:border-white/40"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#f3c9c9]" />
                      </FormItem>
                    )}
                  />
                </div>
                <span className="text-white font-serif text-3xl tracking-widest opacity-90">
                  Invoice
                </span>
              </div>

              <Perforation />

              <div className="px-4 sm:px-8 py-6 space-y-7">
                {/* ── Bill-to + Meta ──────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Bill To */}
                  <div className="space-y-3">
                    <SectionLabel>Bill To</SectionLabel>
                    <FormField
                      control={control}
                      name="billToName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Client full name"
                              className="w-full border-0 border-b border-[#E5E1D6] rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#1B4D3E] bg-transparent text-sm font-semibold text-[#1C1F1C]"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="billToEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="client@email.com"
                              className="w-full border-0 border-b border-[#E5E1D6] rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#1B4D3E] bg-transparent text-sm text-[#5c5a52]"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Invoice meta */}
                  <div className="space-y-2">
                    {/* Invoice Number + auto-generate */}
                    <FormField
                      control={control}
                      name="invoiceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between border-b border-[#E5E1D6] pb-1.5">
                            <FormLabel className="text-xs text-[#8a8578] font-normal">
                              Invoice Number
                            </FormLabel>
                            <div className="flex items-center gap-1.5">
                              <FormControl>
                                <input
                                  {...field}
                                  aria-label="Invoice number"
                                  className={`
                                      text-right text-sm font-mono font-semibold outline-none bg-transparent w-24 sm:w-28
                                      transition-colors duration-300
                                      ${isSuccess ? "text-[#1B4D3E]" : "text-[#1C1F1C]"}
                                    `}
                                />
                              </FormControl>

                              {/* Auto-generate button */}
                              <button
                                type="button"
                                onClick={generateInvoiceNumber}
                                disabled={isGenerating}
                                title="Auto-generate next invoice number"
                                aria-label="Auto-generate next invoice number"
                                className={`
                                  relative p-1.5 rounded-md cursor-pointer transition-all duration-300 overflow-hidden
                                  ${
                                    isSuccess
                                      ? "bg-[#f2ead9] text-[#a67c3d] ring-2 ring-[#a67c3d]/40 scale-105"
                                      : "bg-[#F3F1EA] hover:bg-[#eee9db] text-[#8a8578] hover:text-[#a67c3d]"
                                  }
                                  disabled:cursor-not-allowed
                                `}
                              >
                                {isSuccess && (
                                  <span className="absolute inset-0 rounded-md animate-ping bg-[#a67c3d]/20" />
                                )}
                                {isGenerating ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1B4D3E]" />
                                ) : isSuccess ? (
                                  <Check className="w-3.5 h-3.5 stroke-3" />
                                ) : (
                                  <Sparkles className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Invoice Date */}
                    <FormField
                      control={control}
                      name="invoiceDate"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between border-b border-[#E5E1D6] pb-1.5">
                            <FormLabel className="text-xs text-[#8a8578] font-normal">
                              Invoice Date
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                className="w-32 sm:w-40"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Payment Due */}
                    <FormField
                      control={control}
                      name="paymentDue"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between border-b border-[#E5E1D6] pb-1.5">
                            <FormLabel className="text-xs text-[#8a8578] font-normal">
                              Payment Due
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                className="w-32 sm:w-40"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Amount Due pill */}
                    <div className="flex items-center justify-between bg-[#EEF3EC] px-3 py-2 rounded-xl border border-[#d9e5d5] mt-1">
                      <span className="text-[#1B4D3E] text-xs font-semibold">
                        Amount Due (AUD)
                      </span>
                      <span className="text-[#1B4D3E] text-sm font-mono font-bold tabular-nums">
                        {fmt(amountDue)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Line items ──────────────────────────────────────────── */}
                <div>
                  <SectionLabel>Items</SectionLabel>

                  {/* Table header (hidden on xs) */}
                  <div className="hidden sm:grid grid-cols-12 mt-2 text-[#8a8578] text-[10px] font-bold uppercase tracking-wider px-4 py-2 border-b border-[#E5E1D6]">
                    <span className="col-span-6">Description</span>
                    <span className="col-span-2 text-center">Qty</span>
                    <span className="col-span-2 text-right">Price</span>
                    <span className="col-span-2 text-right">Amount</span>
                  </div>

                  <div className="divide-y divide-[#F0EEE6]">
                    {fields.map((field, i) => (
                      <div
                        key={field.id}
                        className={`grid grid-cols-1 sm:grid-cols-12 gap-y-1 items-start px-4 py-3 text-sm rounded-lg sm:rounded-none ${
                          i % 2 === 1 ? "bg-[#FBFAF7] sm:bg-[#FBFAF7]" : ""
                        }`}
                      >
                        {/* Description */}
                        <FormField
                          control={control}
                          name={`items.${i}.description`}
                          render={({ field }) => (
                            <FormItem className="col-span-1 sm:col-span-6 sm:pr-2">
                              <FormControl>
                                <SelectCourseName
                                  courses={allCourses}
                                  onChange={field.onChange}
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />

                        <div className="col-span-1 sm:col-span-6 grid grid-cols-3 sm:contents gap-2 mt-1 sm:mt-0">
                          {/* Quantity */}
                          <FormField
                            control={control}
                            name={`items.${i}.quantity`}
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2">
                                <FormLabel className="sm:hidden text-[10px] text-[#8a8578]">
                                  Qty
                                </FormLabel>
                                <FormControl>
                                  <NumberInput
                                    {...field}
                                    placeholder="1"
                                    onChange={field.onChange}
                                    className="w-full text-center outline-none bg-transparent text-[#5c5a52] font-medium font-mono tabular-nums"
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          {/* Price */}
                          <FormField
                            control={control}
                            name={`items.${i}.price`}
                            render={({ field }) => (
                              <FormItem className="sm:col-span-2 sm:ml-3">
                                <FormLabel className="sm:hidden text-[10px] text-[#8a8578]">
                                  Price
                                </FormLabel>
                                <FormControl>
                                  <NumberInput
                                    {...field}
                                    placeholder="0.00"
                                    onChange={field.onChange}
                                    className="w-full text-right outline-none bg-transparent text-[#5c5a52] font-medium font-mono tabular-nums"
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          {/* Amount + remove */}
                          <div className="sm:col-span-2 flex flex-col items-end justify-between">
                            <span className="sm:hidden text-[10px] text-[#8a8578]">
                              Amount
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold text-[#1C1F1C] tabular-nums text-sm">
                                {fmt(
                                  (Number(watchedItems[i]?.price) || 0) *
                                    (Number(watchedItems[i]?.quantity) || 0),
                                )}
                              </span>
                              {fields.length > 1 ? (
                                <button
                                  type="button"
                                  onClick={() => remove(i)}
                                  aria-label={`Remove line item ${i + 1}`}
                                  className="text-[#c9c5b8] hover:text-[#8a2e2e] transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <div className="w-3.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.items?.root && (
                    <p className="text-xs text-[#8a2e2e] px-4 mt-1">
                      {errors.items.root.message}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      append({ description: "", quantity: 1, price: 0 })
                    }
                    className="mt-3 text-xs text-[#1B4D3E] hover:text-[#123529] font-bold inline-flex items-center gap-1 px-4 py-1.5 rounded-md hover:bg-[#EEF3EC] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add line item
                  </button>
                </div>

                {/* ── Totals summary ──────────────────────────────────────── */}
                <div className="flex flex-col items-end gap-2 text-sm pt-1">
                  <div className="flex justify-between w-full sm:w-60 border-b border-[#F0EEE6] pb-2 px-1">
                    <span className="text-[#8a8578]">Subtotal</span>
                    <span className="font-mono font-semibold text-[#1C1F1C] tabular-nums">
                      {fmt(totalAmount)}
                    </span>
                  </div>

                  {/* Amount Paid */}
                  <FormField
                    control={control}
                    name="amountPaid"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-60">
                        <div className="flex justify-between items-center border-b border-[#F0EEE6] pb-2 px-1">
                          <FormLabel className="text-[#8a8578] font-normal text-sm">
                            Amount Paid
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-0.5 font-mono">
                              <span className="text-xs text-[#8a8578]">$</span>
                              <NumberInputDefault
                                {...field}
                                onChange={field.onChange}
                                placeholder="0.00"
                                className="w-28 sm:w-20 text-right outline-none bg-transparent font-semibold text-[#1C1F1C] focus:text-[#1B4D3E] transition-colors tabular-nums"
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between w-full sm:w-60 bg-[#EEF3EC] px-3 py-2.5 rounded-xl border border-[#d9e5d5]">
                    <span className="text-[#1B4D3E] font-bold text-xs self-center">
                      Total Due (AUD)
                    </span>
                    <span className="text-[#1B4D3E] font-mono font-extrabold tabular-nums">
                      {fmt(amountDue)}
                    </span>
                  </div>
                </div>

                {/* ── Notes / Banking ─────────────────────────────────────── */}
                <div className="bg-[#F3F1EA] border-l-4 border-[#1B4D3E] rounded-r-xl p-4 text-xs space-y-3">
                  <p className="font-serif font-semibold text-[#1C1F1C] text-sm">
                    Notes &amp; Terms
                  </p>

                  {/* Banking details — editable */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded-lg border border-[#E5E1D6]">
                    {(
                      [
                        { name: "bankAccountName", label: "Account Name" },
                        { name: "bankBSB", label: "BSB" },
                        { name: "bankAccountNumber", label: "Account Number" },
                      ] as const
                    ).map(({ name, label }) => (
                      <FormField
                        key={name}
                        control={control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] text-[#8a8578]">
                              {label}
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full bg-transparent border-b border-[#E5E1D6] focus:border-[#1B4D3E] outline-none font-mono font-medium text-[#3c3a34] text-xs pb-0.5"
                              />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* Extra notes */}
                  <FormField
                    control={control}
                    name="extraNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] text-[#8a8578] uppercase tracking-wider font-bold">
                          Additional Notes
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={2}
                            className="bg-white border-[#E5E1D6] text-[#3c3a34] text-xs resize-none focus-visible:ring-[#1B4D3E]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <p className="italic text-[#8a8578] text-[11px]">
                    Upon payment, customer agrees to{" "}
                    {COMPANY_DEFAULTS.companyName} terms and conditions.
                  </p>
                </div>

                {/* GST badge */}
                {getValues("gstIncluded") && (
                  <div className="flex justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4D3E] bg-[#EEF3EC] px-4 py-1 rounded-full border border-[#d9e5d5]">
                      GST Included
                    </span>
                  </div>
                )}

                {/* Email invoice */}
                <div className="rounded-2xl border border-[#E5E1D6] bg-white overflow-hidden">
                  <FormField
                    control={control}
                    name="sendInvoiceByEmail"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-4 space-y-0 p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3F1EA] text-[#1B4D3E]">
                            <Mail className="w-3.5 h-3.5" />
                          </span>
                          <div>
                            <FormLabel className="text-sm font-semibold text-[#1C1F1C]">
                              Send invoice by email
                            </FormLabel>
                            <p className="text-xs text-[#8a8578] mt-0.5">
                              Off by default. Turn this on to attach a message
                              and email the PDF straight to the client.
                            </p>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#1B4D3E]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {sendInvoiceByEmail && (
                    <div className="border-t border-[#E5E1D6] p-4 bg-[#FBFAF7]">
                      <FormField
                        control={control}
                        name="emailMessage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#1C1F1C]">
                              Email message
                            </FormLabel>
                            <FormControl>
                              <RichTextEditor
                                content={field.value}
                                onContentChange={(content) => {
                                  setEmailMessageTouched(true);
                                  field.onChange(content);
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Footer action + download ────────────────────────────────── */}
            {/* Sticky so the primary action stays reachable on a long form,
                especially with the email editor expanded on mobile. */}
            <div className="sticky bottom-4 mt-6 flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-3">
              {generatedPdfLink && (
                <div className="w-full rounded-xl border border-[#d9e5d5] bg-[#EEF3EC] px-4 py-2.5 text-sm text-[#1B4D3E] shadow-sm backdrop-blur">
                  <div className="font-medium">
                    Invoice generated successfully.
                  </div>
                  <a
                    className="mt-1 inline-flex underline break-all"
                    href={generatedPdfLink}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    Download PDF from Cloudinary
                  </a>
                </div>
              )}
              <Button
                type={generatedPdfLink ? "button" : "submit"}
                onClick={
                  generatedPdfLink ? handleGenerateAnotherPdf : undefined
                }
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#1B4D3E] hover:bg-[#123529] text-white px-6 py-3 gap-2 font-bold shadow-lg shadow-[#1B4D3E]/15"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating…
                  </>
                ) : generatedPdfLink ? (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate another PDF
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Generate PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
