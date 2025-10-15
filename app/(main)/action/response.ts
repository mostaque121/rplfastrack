"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendContactNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { prisma } from "@/lib/prisma";
import { contactSchema, responseFormSchema } from "@/lib/zod";
import { z } from "zod";

type ResponseFormData = z.infer<typeof responseFormSchema>;

export async function createResponse(data: ResponseFormData) {
  const parsed = responseFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.response.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        interest: data.interest,
      },
    });
    await sendContactNotificationEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      interest: data.interest,
    });

    await createFormSubmissionNotification({
      title: "New Response Form Submitted",
      description: `${data.name} has submitted a response form.`,
      type: "response",
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

type ContactData = z.infer<typeof contactSchema>;

export async function createContact(data: ContactData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
    };
  }

  try {
    await prisma.response.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        interest: data.qualification || data.industry || "none",
      },
    });
    await sendContactNotificationEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      interest: data.qualification || data.industry || "none",
    });
    await createFormSubmissionNotification({
      title: "New Response Form Submitted",
      description: `${data.name} has submitted a response form.`,
      type: "response",
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
