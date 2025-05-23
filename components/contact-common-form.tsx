"use client";
import { createResponse } from "@/app/(main)/action/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number is required"),
  message: z.string().optional(),
  interest: z.string(),
});
type FormData = z.infer<typeof formSchema>;

export default function ContactCommonForm({
  interest = "RPL",
}: {
  interest?: string;
}) {
  const [formState, setFormState] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      const result = await createResponse(data);

      if (result.success) {
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
          description:
            result.message || "Something went wrong. Please try again.",
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
    <div className="bg-white dark:bg-gray-950 rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Reach out for any inquiries
        </p>
      </div>

      {formState?.success ? (
        <div className="text-emerald-600 text-center p-4">
          <div className="animate-bounce mb-2">
            <svg
              className="w-20 h-20 text-green-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>
          <p className="mb-2 text-xl">Thank you for your Message!</p>
          <p className="mb-4 text-xl">We will contact you soon.</p>
          <Button
            onClick={() => setFormState(null)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer py-2 px-4 rounded-md"
          >
            Send another message
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
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
                    <FormMessage className="text-xs " />
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
                    <FormMessage className="text-xs " />
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
                  <FormMessage className="text-xs " />
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
                      className="response-form-input w-full !h-16"
                      {...field}
                      value={field.value || ""}
                      aria-required="false"
                    />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <div className="text-center mt-6">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300  active:scale-95 cursor-pointer w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Message
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
