"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { z } from "zod";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import {
  sendContactNotificationEmail,
  sendEligibilityNotificationEmail,
} from "@/app/(admin)/lib/send-mail";
import { Prisma } from "@/generated/prisma";
import { Attribution, attributionSchema } from "@/lib/attribution";
import { getExperienceLabel } from "@/lib/experience-years";
import { contactSchema, responseFormSchema } from "@/lib/zod";
import { CrmLead, sendLeadToCrm } from "@/server/crm";
import { prisma } from "@/server/db";

type ResponseFormData = z.infer<typeof responseFormSchema>;
type ContactData = z.infer<typeof contactSchema>;

/* ---------------- SAVE + BACKGROUND TASKS ---------------- */

type LeadInput = {
  form: "RESPONSE" | "CONTACT" | "ELIGIBILITY";
  name: string;
  email: string;
  phone: string;
  interest?: string;
  message?: string;
  details?: Prisma.InputJsonObject;
};

async function deviceFromUserAgent() {
  const ua = (await headers()).get("user-agent") ?? "";
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return "tablet";
  if (/Mobi|iPhone|Android/i.test(ua)) return "mobile";
  return ua ? "desktop" : undefined;
}

/**
 * Critical path: save the Lead (the backup copy). Then, after the response
 * is sent, notify the team and sync to the CRM, recording the sync result
 * so failures can be retried from the admin.
 */
async function saveLead(
  input: LeadInput,
  attribution: Attribution | undefined,
  tasks: {
    notify: () => Promise<unknown>[];
    crm: (lead: { id: string; createdAt: Date }) => CrmLead;
  },
) {
  const parsedAttribution = attributionSchema.safeParse(attribution ?? {});

  const lead = await prisma.lead.create({
    data: {
      ...input,
      interest: input.interest || null,
      message: input.message || null,
      ...(parsedAttribution.success ? parsedAttribution.data : {}),
      device: await deviceFromUserAgent(),
    },
    select: { id: true, createdAt: true },
  });

  after(async () => {
    const [crm, ...rest] = await Promise.allSettled([
      sendLeadToCrm(tasks.crm(lead)),
      ...tasks.notify(),
    ]);

    rest.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`[Lead ${lead.id}] background task ${index} failed:`, result.reason);
      }
    });

    const outcome =
      crm.status === "rejected"
        ? { status: "FAILED" as const, error: String(crm.reason).slice(0, 500) }
        : crm.value;
    if (outcome.status === "SKIPPED") return;

    await prisma.lead
      .update({
        where: { id: lead.id },
        data: {
          crmStatus: outcome.status,
          crmError: outcome.status === "FAILED" ? outcome.error : null,
        },
      })
      .catch((error) => console.error(`[Lead ${lead.id}] saving CRM status failed:`, error));
  });

  return lead;
}

/* ---------------- RESPONSE (enquiry forms) ---------------- */

export async function createResponse(data: ResponseFormData, attribution?: Attribution) {
  const parsed = responseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  const formData = parsed.data;
  const qualification =
    formData.interest === "RPL" || formData.interest === "none" ? undefined : formData.interest;

  try {
    await saveLead(
      {
        form: "RESPONSE",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest === "none" ? undefined : formData.interest,
      },
      attribution,
      {
        notify: () => [
          sendContactNotificationEmail(formData),
          createFormSubmissionNotification({
            title: "New Response Form Submitted",
            description: `${formData.name} submitted a response form.`,
            type: "response",
          }),
        ],
        crm: (lead) => ({
          submissionId: lead.id,
          form: "contact",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          qualification,
          sourceDetail: `Enquiry form: ${formData.interest}`,
          submittedAt: lead.createdAt.toISOString(),
        }),
      },
    );

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

export async function createContact(data: ContactData, attribution?: Attribution) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
    };
  }

  const formData = parsed.data;
  const interest = formData.qualification || formData.industry || "none";

  try {
    await saveLead(
      {
        form: "CONTACT",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: interest === "none" ? undefined : interest,
        details: formData.industry ? { industry: formData.industry } : undefined,
      },
      attribution,
      {
        notify: () => [
          sendContactNotificationEmail({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            interest,
          }),
          createFormSubmissionNotification({
            title: "New Response Form Submitted",
            description: `${formData.name} submitted a response form.`,
            type: "response",
          }),
        ],
        crm: (lead) => ({
          submissionId: lead.id,
          form: "contact",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          qualification: formData.qualification,
          industry: formData.industry,
          message: formData.message,
          sourceDetail: "Contact page",
          submittedAt: lead.createdAt.toISOString(),
        }),
      },
    );

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

/* ---------------- ELIGIBILITY ---------------- */

type EligibilityFormData = {
  industry: string;
  qualification: string;
  yearsOfExperience: string;
  stateLivedIn: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
};

export async function saveEligibilityData(data: EligibilityFormData, attribution?: Attribution) {
  if (!data.industry) return { error: "Industry is required" };
  if (!data.qualification) return { error: "Qualification is required" };
  if (!data.yearsOfExperience) return { error: "Years of experience is required" };
  if (!data.stateLivedIn) return { error: "State is required" };
  if (!data.fullName || data.fullName.length < 2) return { error: "Full name is required" };
  if (!data.email || !data.email.includes("@")) return { error: "Valid email is required" };
  if (!data.phoneNumber || data.phoneNumber.length < 8)
    return { error: "Valid phone number is required" };

  try {
    await saveLead(
      {
        form: "ELIGIBILITY",
        name: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
        interest: data.qualification,
        message: data.message,
        details: {
          industry: data.industry,
          yearsOfExperience: parseInt(data.yearsOfExperience) || 0,
          state: data.stateLivedIn,
        },
      },
      attribution,
      {
        notify: () => [
          sendEligibilityNotificationEmail({
            name: data.fullName,
            email: data.email,
            phone: data.phoneNumber,
            message: data.message,
            industry: data.industry,
            qualification: data.qualification,
            yearsOfExperience: data.yearsOfExperience,
            state: data.stateLivedIn,
          }),
          createFormSubmissionNotification({
            title: "New Eligibility Form Submitted",
            description: `${data.fullName} submitted eligibility form.`,
            type: "eligibility",
          }),
        ],
        crm: (lead) => ({
          submissionId: lead.id,
          form: "eligibility",
          name: data.fullName,
          phone: data.phoneNumber,
          email: data.email,
          qualification: data.qualification,
          industry: data.industry,
          experience: getExperienceLabel(data.yearsOfExperience),
          state: data.stateLivedIn,
          message: data.message,
          sourceDetail: "Eligibility form",
          submittedAt: lead.createdAt.toISOString(),
        }),
      },
    );

    return {
      success: true,
      message: "Data saved successfully",
    };
  } catch (error) {
    console.error("Error saving eligibility data:", error);
    return {
      error: "Failed to save data. Please try again.",
    };
  }
}
