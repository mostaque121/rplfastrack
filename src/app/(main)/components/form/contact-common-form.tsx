"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { createResponse } from "@/features/leads/actions";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track-lead";
import { responseFormSchema } from "@/lib/zod";

import { LeadSuccess } from "./lead-success";

type FormData = z.infer<typeof responseFormSchema>;

export default function ContactCommonForm({ interest = "RPL" }: { interest?: string }) {
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
    <div className="flex flex-col justify-center bg-white p-5 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-ink">Send us a message</h3>
        <p className="mt-1 text-gray-600">Fill in your details and we will reply shortly.</p>
      </div>

      {formState?.success ? (
        <LeadSuccess
          name={submitted?.name}
          phone={submitted?.phone}
          onReset={() => setFormState(null)}
        />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name."
                        className="response-form-input"
                        {...field}
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
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

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
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
            <div className="mt-6 text-center">
              <Button
                className="h-12 w-full cursor-pointer bg-cta text-base text-white transition-all duration-300 hover:bg-cta-strong active:scale-95"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
