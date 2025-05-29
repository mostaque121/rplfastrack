"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendContactNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema validation
const StartedSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().optional(),
  interest: z.string().min(1, "Interest is required"),
});

interface StartedData {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  interest: string;
}

// Form submission handler
export async function createResponse(data: StartedData) {
  // Validate input
  const parsed = StartedSchema.safeParse(data);
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

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
  industry: z.string().optional(),
  qualification: z.string().optional(),
});

type ContactData = z.infer<typeof ContactSchema>;

// ✅ Only export async functions
export async function createContact(data: ContactData) {
  const parsed = ContactSchema.safeParse(data);

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
