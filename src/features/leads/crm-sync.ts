import "server-only";

import type { Lead } from "@/generated/prisma/client";
import { formatAuPhone } from "@/lib/phone";
import { CrmLead, CrmResult, sendLeadToCrm } from "@/server/crm";
import { prisma } from "@/server/db";

type LeadDetails = {
  industry?: string;
  experience?: string; // label, e.g. "1-3 years"
  state?: string;
  workStatus?: string;
  existingQualification?: string;
};

export type CrmSource = Pick<
  Lead,
  "id" | "form" | "name" | "email" | "phone" | "interest" | "message" | "details" | "createdAt"
>;

export const crmSourceSelect = {
  id: true,
  form: true,
  name: true,
  email: true,
  phone: true,
  interest: true,
  message: true,
  details: true,
  createdAt: true,
} as const;

/** Builds the CRM payload from the saved Lead, so a retry sends the same data. */
export function leadToCrm(lead: CrmSource): CrmLead {
  const details = (lead.details ?? {}) as LeadDetails;
  const interest = lead.interest ?? undefined;
  const base = {
    submissionId: lead.id,
    name: lead.name,
    phone: formatAuPhone(lead.phone),
    email: lead.email,
    message: lead.message ?? undefined,
    industry: details.industry,
    submittedAt: lead.createdAt.toISOString(),
  };

  switch (lead.form) {
    case "ELIGIBILITY":
      // The CRM has no fields for the extra answers yet, so they go in as readable lines.
      return {
        ...base,
        message:
          [
            details.workStatus && `Current role: ${details.workStatus}`,
            details.existingQualification &&
              `Existing qualification: ${details.existingQualification}`,
            lead.message && `Message: ${lead.message}`,
          ]
            .filter(Boolean)
            .join("\n") || undefined,
        form: "eligibility",
        qualification: interest,
        experience: details.experience,
        state: details.state,
        sourceDetail: "Eligibility form",
      };
    case "CONTACT":
      return {
        ...base,
        form: "contact",
        // interest is the qualification, or the industry when none was picked
        qualification: interest !== details.industry ? interest : undefined,
        sourceDetail: "Contact page",
      };
    default:
      return {
        ...base,
        form: "contact",
        qualification: interest === "RPL" ? undefined : interest,
        sourceDetail: `Enquiry form: ${interest ?? "none"}`,
      };
  }
}

/** Sends the lead to the CRM and records SYNCED or FAILED on the row. */
export async function syncLeadToCrm(lead: CrmSource): Promise<CrmResult> {
  const outcome: CrmResult = await sendLeadToCrm(leadToCrm(lead)).catch((error) => ({
    status: "FAILED" as const,
    error: String(error).slice(0, 500),
  }));
  if (outcome.status === "SKIPPED") return outcome;

  await prisma.lead
    .update({
      where: { id: lead.id },
      data: {
        crmStatus: outcome.status,
        crmError: outcome.status === "FAILED" ? outcome.error : null,
      },
    })
    .catch((error) => console.error(`[Lead ${lead.id}] saving CRM status failed:`, error));

  return outcome;
}
