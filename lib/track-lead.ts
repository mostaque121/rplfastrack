import { sendGAEvent } from "@next/third-parties/google";

export type LeadForm = "response" | "contact" | "eligibility";

/**
 * GA4 recommended `generate_lead` event. Mark it as a key event in GA4
 * (Admin > Events). GA4 attributes it to the session's source, medium,
 * campaign and gclid on its own.
 */
export function trackLead(form: LeadForm, qualification?: string) {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  sendGAEvent("event", "generate_lead", {
    form_name: form,
    qualification: qualification || undefined,
    page_path: window.location.pathname,
  });
}
