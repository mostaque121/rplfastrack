/**
 * components/invoice/InvoicePreview.tsx
 *
 * Invoice creation form.
 * - Types from lib/invoice.schema (no local re-declaration)
 * - Zod client-side validation via react-hook-form + zodResolver
 * - DatePicker imported from @/components/ui/date-picker (shadcn)
 * - Invoice number auto-generated via GET /api/invoice/next-number
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Download, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
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
  {
    ssr: false,
  },
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
  const res = await fetch("/api/invoice/next-number");
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

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  /** Pre-fill specific fields, e.g. when editing an existing invoice */
  defaultValues?: Partial<InvoiceFormValues>;
}

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

  // ── Invoice number auto-generation state (local, not in form) ─────────────
  const [numState, setNumState] = [
    form.watch("_numState" as never) as unknown as
      | "idle"
      | "loading"
      | "success",
    (s: "idle" | "loading" | "success") =>
      form.setValue("_numState" as never, s as never),
  ];

  // Simpler approach with useEffect-free local state using a ref
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Submit → generate PDF ────────────────────────────────────────────────

  const onSubmit = async (values: InvoiceFormValues) => {
    if (generatedPdfLink) {
      return;
    }

    const payload = serializeForApi({ ...values, totalAmount, amountDue });

    const res = await fetch("/api/invoice", {
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
  const isGenerated = Boolean(generatedPdfLink);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans selection:bg-green-100">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="max-w-3xl mx-auto">
            {/* ── Top bar ─────────────────────────────────────────────────── */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Create Invoice
              </h1>
            </div>

            {/* Root-level error (server / PDF error) */}
            {errors.root && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {errors.root.message}
              </div>
            )}

            {/* ── Invoice card ────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
              {/* Header stripe */}
              <div className="bg-[#2e7d32] px-8 py-5 flex justify-between items-center">
                <div>
                  <p className="text-green-100 text-xs font-bold uppercase tracking-widest mb-0.5">
                    {COMPANY_DEFAULTS.companyName}
                  </p>
                  <p className="text-white/75 text-xs">
                    {COMPANY_DEFAULTS.companyWebsite}
                  </p>
                  <p className="text-white/70 text-xs">
                    ABN: {COMPANY_DEFAULTS.companyABN}
                  </p>
                </div>
                <span className="text-white text-3xl font-extrabold tracking-widest opacity-90">
                  INVOICE
                </span>
              </div>

              <div className="px-8 py-6 space-y-6">
                {/* ── Bill-to + Meta ──────────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Bill To */}
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Bill To
                    </p>
                    <FormField
                      control={control}
                      name="billToName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Client full name"
                              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-green-600 bg-transparent text-sm font-semibold"
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
                              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-green-600 bg-transparent text-sm text-gray-500"
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
                          <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <FormLabel className="text-xs text-gray-400 font-normal">
                              Invoice Number:
                            </FormLabel>
                            <div className="flex items-center gap-1.5">
                              <FormControl>
                                <input
                                  {...field}
                                  className={`
                                    text-right text-sm font-semibold outline-none bg-transparent w-28
                                    transition-colors duration-300
                                    ${isSuccess ? "text-green-700" : "text-gray-800"}
                                  `}
                                />
                              </FormControl>

                              {/* Auto-generate button */}
                              <button
                                type="button"
                                onClick={generateInvoiceNumber}
                                disabled={isGenerating}
                                title="Auto-generate next invoice number"
                                className={`
                                  relative p-1.5 rounded-md cursor-pointer transition-all duration-300 overflow-hidden
                                  ${
                                    isSuccess
                                      ? "bg-green-100 text-green-700 ring-2 ring-green-400 scale-105"
                                      : "bg-gray-100 hover:bg-green-50 text-gray-500 hover:text-green-700"
                                  }
                                  disabled:cursor-not-allowed
                                `}
                              >
                                {/* Ripple on success */}
                                {isSuccess && (
                                  <span className="absolute inset-0 rounded-md animate-ping bg-green-300 opacity-30" />
                                )}

                                {isGenerating ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-green-600" />
                                ) : isSuccess ? (
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
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
                          <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <FormLabel className="text-xs text-gray-400 font-normal">
                              Invoice Date:
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                className="w-40"
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
                          <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <FormLabel className="text-xs text-gray-400 font-normal">
                              Payment Due:
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                className="w-40"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Amount Due pill */}
                    <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-xl border border-green-100 mt-1">
                      <span className="text-green-800 text-xs font-semibold">
                        Amount Due (AUD):
                      </span>
                      <span className="text-green-800 text-sm font-bold tabular-nums">
                        {fmt(amountDue)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Line items ──────────────────────────────────────────── */}
                <div>
                  {/* Table header */}
                  <div className="grid grid-cols-12 bg-[#2e7d32] text-white text-xs font-semibold rounded-xl px-4 py-2.5">
                    <span className="col-span-6">Items Description</span>
                    <span className="col-span-2 text-center">Qty</span>
                    <span className="col-span-2 text-right">Price</span>
                    <span className="col-span-2 text-right">Amount</span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {fields.map((field, i) => (
                      <div
                        key={field.id}
                        className={`grid grid-cols-12 items-start px-4 py-2.5 text-sm group ${
                          i % 2 === 1 ? "bg-gray-50/50" : ""
                        }`}
                      >
                        {/* Description */}
                        <FormField
                          control={control}
                          name={`items.${i}.description`}
                          render={({ field }) => (
                            <FormItem className="col-span-6 pr-2">
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

                        {/* Quantity */}
                        <FormField
                          control={control}
                          name={`items.${i}.quantity`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormControl>
                                <NumberInput
                                  {...field}
                                  placeholder="1"
                                  onChange={field.onChange}
                                  className="w-full text-center outline-none bg-transparent text-gray-600 font-medium"
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
                            <FormItem className="col-span-2 ml-3">
                              <FormControl>
                                <NumberInput
                                  {...field}
                                  placeholder="0.00"
                                  onChange={field.onChange}
                                  className="w-full text-right outline-none bg-transparent text-gray-600 font-medium"
                                />
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />

                        {/* Amount + remove */}
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          <span className="font-semibold py-2 text-gray-900 tabular-nums">
                            {fmt(
                              (Number(watchedItems[i]?.price) || 0) *
                                (Number(watchedItems[i]?.quantity) || 0),
                            )}
                          </span>
                          {fields.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => remove(i)}
                              className="text-gray-300 hover:text-red-500 transition-colors "
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <div className="w-3.5" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.items?.root && (
                    <p className="text-xs text-red-500 px-4 mt-1">
                      {errors.items.root.message}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      append({ description: "", quantity: 1, price: 0 })
                    }
                    className="mt-2 text-xs text-green-700 hover:text-green-900 font-bold inline-flex items-center gap-1 px-4 py-1.5 rounded-md hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Line Item
                  </button>
                </div>

                {/* ── Totals summary ──────────────────────────────────────── */}
                <div className="flex flex-col items-end gap-2 text-sm pt-2">
                  <div className="flex justify-between w-56 border-b border-gray-100 pb-2 px-1">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-gray-800 tabular-nums">
                      {fmt(totalAmount)}
                    </span>
                  </div>

                  {/* Amount Paid */}
                  <FormField
                    control={control}
                    name="amountPaid"
                    render={({ field }) => (
                      <FormItem className="w-56">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2 px-1">
                          <FormLabel className="text-gray-400 font-normal text-sm">
                            Amount Paid:
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-0.5">
                              <span className="text-xs text-gray-400">$</span>
                              <NumberInputDefault
                                {...field}
                                onChange={field.onChange}
                                placeholder="0.00"
                                className="w-20 text-right outline-none bg-transparent font-semibold text-gray-800 focus:text-green-700 transition-colors"
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between w-56 bg-green-50 px-3 py-2.5 rounded-xl border border-green-100">
                    <span className="text-green-800 font-bold text-xs">
                      Total Due (AUD):
                    </span>
                    <span className="text-green-800 font-extrabold tabular-nums">
                      {fmt(amountDue)}
                    </span>
                  </div>
                </div>

                {/* ── Notes / Banking ─────────────────────────────────────── */}
                <div className="bg-gray-50 border-l-4 border-[#2e7d32] rounded-r-xl p-4 text-xs space-y-3">
                  <p className="font-bold text-gray-800 text-sm">
                    Notes / Terms
                  </p>

                  {/* Banking details — editable */}
                  <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-inner">
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
                            <FormLabel className="text-[10px] text-gray-400">
                              {label}
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full bg-transparent border-b border-gray-100 focus:border-green-600 outline-none font-medium text-gray-700 text-xs"
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
                        <FormLabel className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                          Additional Notes
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={2}
                            className="bg-white border-gray-200 text-gray-700 text-xs resize-none focus-visible:ring-green-600"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <p className="italic text-gray-400 text-[11px]">
                    Upon payment, customer agrees to{" "}
                    {COMPANY_DEFAULTS.companyName} terms and conditions.
                  </p>
                </div>

                {/* GST badge */}
                {getValues("gstIncluded") && (
                  <div className="flex justify-center pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 bg-green-50 px-4 py-1 rounded-full border border-green-200">
                      GST Included
                    </span>
                  </div>
                )}

                {/* Email invoice */}
                <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <FormField
                    control={control}
                    name="sendInvoiceByEmail"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-4 space-y-0">
                        <div>
                          <FormLabel className="text-sm font-semibold text-gray-800">
                            Send invoice by email?
                          </FormLabel>
                          <p className="text-xs text-gray-500">
                            Disabled by default. Enable it to include a message
                            and send the PDF to the client.
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {sendInvoiceByEmail && (
                    <FormField
                      control={control}
                      name="emailMessage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-800">
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
                  )}
                </div>
              </div>
            </div>

            {/* ── Footer action + download ────────────────────────────────── */}
            <div className="mt-6 flex flex-col items-end gap-3">
              {generatedPdfLink && (
                <div className="w-full rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
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
                className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-6 py-3 gap-2 font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating…
                  </>
                ) : generatedPdfLink ? (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate Another PDF
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
