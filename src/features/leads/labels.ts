import type { CrmSyncStatus, LeadForm } from "@/generated/prisma";

export const LEAD_FORM_LABELS: Record<LeadForm, string> = {
  HERO: "Hero form",
  RESPONSE: "Enquiry form",
  ELIGIBILITY: "Eligibility",
  CONTACT: "Contact page",
};

export const CRM_STATUS_LABELS: Record<CrmSyncStatus, string> = {
  PENDING: "Pending",
  SYNCED: "In CRM",
  FAILED: "Failed",
};
