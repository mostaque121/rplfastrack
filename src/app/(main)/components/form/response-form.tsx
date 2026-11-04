"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createResponse } from "@/features/leads/actions";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track-lead";
import { responseFormSchema } from "@/lib/zod";

type FormData = z.infer<typeof responseFormSchema>;

export function ResponseForm({ interest = "RPL" }: { interest?: string }) {
  const [formState, setFormState] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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
        toast.success("Success!", {
          description: "Your form has been submitted successfully.",
        });
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
    <div className="w-full rounded-lg border-[2px] border-ring bg-background px-4 py-10 shadow-md md:w-96 md:px-8">
      <p className="mb-3 text-center text-lg leading-tight font-bold text-black">
        Interested in {interest}?
      </p>
      <h3 className="mb-10 text-center text-2xl font-semibold text-brand">
        Get your free consultants!
      </h3>

      {/*  Success */}
      {formState?.success ? (
        <div className="p-4 text-center text-brand">
          <div className="mb-2 animate-bounce">
            <svg
              className="mx-auto h-20 w-20 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>
          <p className="mb-2 text-xl">Thank you for your submission!</p>
          <p className="mb-4 text-xl">We will contact you soon.</p>
          <Button
            onClick={() => setFormState(null)}
            className="cursor-pointer rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-strong"
          >
            Submit another response
          </Button>
        </div>
      ) : (
        // Form
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/*  Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="response-form-input"
                      {...field}
                      aria-required="true"
                    />
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
                    <Input
                      placeholder="Email"
                      type="email"
                      className="response-form-input w-full"
                      {...field}
                      aria-required="true"
                    />
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
                    <Input
                      placeholder="Phone"
                      type="tel"
                      className="response-form-input w-full"
                      {...field}
                      aria-required="true"
                    />
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
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Message (optional)"
                      className="response-form-input !h-16 w-full"
                      {...field}
                      value={field.value || ""}
                      aria-required="false"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <LoadingButton
              type="submit"
              className="mt-6 w-full bg-cta text-white hover:bg-cta-strong"
              loading={form.formState.isSubmitting}
            >
              Here We Go
            </LoadingButton>

            {formState?.message && !formState.success && (
              <p className="text-sm text-red-500" role="alert">
                {formState.message}
              </p>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
