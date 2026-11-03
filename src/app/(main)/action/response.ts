"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendContactNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { sendLeadToCrm } from "@/server/crm";
import { prisma } from "@/server/db";
import { contactSchema, responseFormSchema } from "@/lib/zod";
import { after } from "next/server";
import { z } from "zod";

type ResponseFormData = z.infer<typeof responseFormSchema>;
type ContactData = z.infer<typeof contactSchema>;

/* ---------------- MAIN ACTIONS ---------------- */

export async function createResponse(data: ResponseFormData) {
  const parsed = responseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  const formData = parsed.data;

  try {
    // 1. Critical path: Save to DB immediately
    const response = await prisma.response.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
      },
    });

    // 2. Non-critical path: Defer all external API requests to background execution
    after(async () => {
      try {
        const results = await Promise.allSettled([
          sendContactNotificationEmail({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            interest: formData.interest,
          }),
          createFormSubmissionNotification({
            title: "New Response Form Submitted",
            description: `${formData.name} submitted a response form.`,
            type: "response",
          }),
          sendLeadToCrm({
            submissionId: response.id,
            form: "contact",
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            qualification:
              formData.interest === "RPL" || formData.interest === "none"
                ? undefined
                : formData.interest,
            sourceDetail: `Enquiry form: ${formData.interest}`,
            submittedAt: response.createdAt.toISOString(),
          }),
        ]);

        // Monitor background failures in your server logs
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `[Background Task Error][createResponse][Task ${index}]:`,
              result.reason,
            );
          }
        });
      } catch (error) {
        console.error(
          "[Unexpected error in after() block of createResponse]:",
          error,
        );
      }
    });

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

/* ---------------- CONTACT ---------------- */

export async function createContact(data: ContactData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
    };
  }

  const formData = parsed.data;
  const interest = formData.qualification || formData.industry || "none";

  const payload: ResponseFormData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    interest,
  };

  try {
    // 1. Critical path: Save to DB immediately
    const response = await prisma.response.create({
      data: payload,
    });

    // 2. Non-critical path: Defer all external API requests to background execution
    after(async () => {
      try {
        const results = await Promise.allSettled([
          sendContactNotificationEmail(payload),
          createFormSubmissionNotification({
            title: "New Response Form Submitted",
            description: `${payload.name} submitted a response form.`,
            type: "response",
          }),
          sendLeadToCrm({
            submissionId: response.id,
            form: "contact",
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            qualification: formData.qualification,
            industry: formData.industry,
            message: formData.message,
            sourceDetail: "Contact page",
            submittedAt: response.createdAt.toISOString(),
          }),
        ]);

        // Monitor background failures in your server logs
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `[Background Task Error][createContact][Task ${index}]:`,
              result.reason,
            );
          }
        });
      } catch (error) {
        console.error(
          "[Unexpected error in after() block of createContact]:",
          error,
        );
      }
    });

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("DB Error:", error);
    return {
      success: false,
      message: "Failed to submit form",
    };
  }
}
