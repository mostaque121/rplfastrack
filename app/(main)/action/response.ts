"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";
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

// Email transport config
const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  })
);

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
    // Save to DB
    await prisma.response.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        interest: data.interest,
      },
    });

    // Send notification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL!,
      to: process.env.RECEIVER_EMAIL!,
      subject: "New Response Submitted",
      text: `
------------------------------------------------------------
                New Contact Form Submission
------------------------------------------------------------

Name:     ${data.name}
Email:    ${data.email}
Phone:    ${data.phone}
Interest: ${data.interest}

Message:
${data.message?.trim() || "No message provided"}

------------------------------------------------------------
Submitted from your website contact form.
------------------------------------------------------------
  `,
    };

    await transporter.sendMail(mailOptions);

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

    // Send notification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL!,
      to: process.env.RECEIVER_EMAIL!,
      subject: "New Response Submitted",
      text: `
------------------------------------------------------------
                New Contact Form Submission
------------------------------------------------------------

Name:     ${data.name}
Email:    ${data.email}
Phone:    ${data.phone}
Interest: ${data.qualification || data.industry || "none"}

Message:
${data.message?.trim() || "No message provided"}

------------------------------------------------------------
Submitted from your website contact form.
------------------------------------------------------------
  `,
    };

    await transporter.sendMail(mailOptions);

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
