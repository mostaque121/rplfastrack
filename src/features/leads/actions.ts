"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server";
import { z } from "zod";

import { Prisma } from "@/generated/prisma/client";
import { Attribution, attributionSchema } from "@/lib/attribution";
import { getExistingQualificationLabel, getWorkStatusLabel } from "@/lib/eligibility-options";
import { getExperienceLabel } from "@/lib/experience-years";
import { contactSchema, responseFormSchema } from "@/lib/zod";
import { requireAdmin } from "@/server/admin";
import { prisma } from "@/server/db";

import { crmSourceSelect, syncLeadToCrm } from "./crm-sync";
import { sendContactNotificationEmail, sendEligibilityNotificationEmail } from "./notify-email";

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
  notify: () => Promise<unknown>,
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
    select: crmSourceSelect,
  });

  after(async () => {
    const [, email] = await Promise.allSettled([syncLeadToCrm(lead), notify()]);
    if (email.status === "rejected") {
      console.error(`[Lead ${lead.id}] notification email failed:`, email.reason);
    }
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
      () => sendContactNotificationEmail(formData),
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
      () =>
        sendContactNotificationEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          interest,
        }),
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
  /** Option ids from eligibility-options.ts */
  workStatus?: string;
  existingQualification?: string;
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

  const workStatus = getWorkStatusLabel(data.workStatus);
  const existingQualification = getExistingQualificationLabel(data.existingQualification);

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
          yearsOfExperience: data.yearsOfExperience, // band id, e.g. "1-3"
          experience: getExperienceLabel(data.yearsOfExperience),
          state: data.stateLivedIn,
          workStatus,
          existingQualification,
        },
      },
      attribution,
      () =>
        sendEligibilityNotificationEmail({
          name: data.fullName,
          email: data.email,
          phone: data.phoneNumber,
          message: data.message,
          industry: data.industry,
          qualification: data.qualification,
          yearsOfExperience: data.yearsOfExperience,
          state: data.stateLivedIn,
          workStatus,
          existingQualification,
        }),
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

/* ---------------- ADMIN: CRM RETRY ---------------- */

export async function retryLeadSync(id: string) {
  await requireAdmin();
  const lead = await prisma.lead.findUnique({ where: { id }, select: crmSourceSelect });
  if (!lead) return { success: false, message: "Lead not found" };

  const outcome = await syncLeadToCrm(lead);
  revalidatePath("/admin", "layout");
  if (outcome.status === "SYNCED") return { success: true, message: "Sent to the CRM" };
  if (outcome.status === "SKIPPED") return { success: false, message: "The CRM isn't configured" };
  return { success: false, message: outcome.error };
}
