"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

interface StartedData {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  interest: string;
}

const StartedSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().optional(),
  interest: z.string().min(1, "interest is required"),
});

export async function createResponse(data: StartedData) {
  // Validate the input data
  const parsedData = StartedSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Please fill in all required fields",
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

    /*       await sendEmail({
        subject: "New Form Submission Received",
        html: `
          <h2>New Response Submitted</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Interest:</strong> ${
            data.service || "No interst provided."
          }</p>
          <p><strong>Plan:</strong> ${data.plan || "No plan provided."}</p>
          <p><strong>Budget:</strong> ${data.budget || "No budget provided."}</p>
          <p><strong>Message:</strong><br>${
            data.message || "No message provided."
          }</p>
        `,
      });
   */
    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Failed to submit form",
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
