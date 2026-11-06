"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare, Phone, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createResponse } from "@/features/leads/actions";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track-lead";
import { responseFormSchema } from "@/lib/zod";

import { LeadSuccess } from "./lead-success";

type FormData = z.infer<typeof responseFormSchema>;

/**
 * `card` (default): the standalone card with its own header, used in heroes.
 * `inline`: no header, border or shadow, fields in two columns. For use inside another card.
 */
export function ResponseForm({
  interest = "RPL",
  variant = "card",
}: {
  interest?: string;
  variant?: "card" | "inline";
}) {
  const inline = variant === "inline";
  const [formState, setFormState] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; phone: string } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(responseFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      interest: interest,
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const result = await createResponse(data, getAttribution());

      if (result.success) {
        trackLead("response", data.interest);
        setSubmitted({ name: data.name, phone: data.phone.trim() });
        form.reset({
          name: "",
          email: "",
          phone: "",
          message: "",
          interest: interest,
        });

        setFormState({ success: true, message: result.message });
      } else {
        toast.error("Error", {
          description: result.message || "Something went wrong. Please try again.",
        });
        setFormState({ success: false, message: result.message });
      }
    } catch {
      toast.error("Error", {
        description: "An error occurred while submitting the form.",
      });
      setFormState({
        success: false,
        message: "An error occurred while submitting the form.",
      });
    }
  }

  return (
    <div
      className={
        inline
          ? "w-full"
          : "w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-4 shadow-black/30 ring-white/10 md:w-96"
      }
    >
      {!inline && (
        <div className="bg-linear-to-br from-brand to-brand-deep px-6 py-5 text-white">
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-brand-bright" />
            Talk to an RPL expert
          </p>
          <h2 className="text-2xl leading-tight font-bold">Get your free consultation</h2>
          <p className="mt-1.5 text-sm text-white/85">
            Leave your details and we&apos;ll get back to you to talk through your {interest}{" "}
            options.
          </p>
        </div>
      )}

      <div className={inline ? undefined : "px-6 py-6"}>
        {/*  Success */}
        {formState?.success ? (
          <LeadSuccess
            name={submitted?.name}
            phone={submitted?.phone}
            onReset={() => setFormState(null)}
          />
        ) : (
          // Form
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className={inline ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}
            >
              {/*  Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                          placeholder="Name"
                          className="response-form-input h-11 w-full pl-10"
                          {...field}
                          aria-required="true"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/*  Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                          placeholder="Email"
                          type="email"
                          className="response-form-input h-11 w-full pl-10"
                          {...field}
                          aria-required="true"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/*  Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Phone
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                          placeholder="Phone"
                          type="tel"
                          className="response-form-input h-11 w-full pl-10"
                          {...field}
                          aria-required="true"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/*  Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className={inline ? "sm:col-span-2" : undefined}>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare
                          aria-hidden
                          className="pointer-events-none absolute top-3 left-3 size-4 text-gray-500"
                        />
                        <Textarea
                          placeholder="Message (optional)"
                          className="response-form-input h-16! w-full pt-2.5 pl-10"
                          {...field}
                          value={field.value || ""}
                          aria-required="false"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                className={`h-12 w-full bg-cta text-base font-semibold text-white shadow-lg shadow-brand/30 hover:bg-cta-strong ${inline ? "sm:col-span-2" : "mt-2"}`}
                loading={form.formState.isSubmitting}
              >
                Get my free consultation
              </LoadingButton>

              <p
                className={`flex items-center justify-center gap-1.5 text-xs text-gray-600 ${inline ? "sm:col-span-2" : ""}`}
              >
                <ShieldCheck aria-hidden className="size-4 text-brand" />
                Free and no obligation
              </p>

              {formState?.message && !formState.success && (
                <p className="text-sm text-red-500" role="alert">
                  {formState.message}
                </p>
              )}
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
