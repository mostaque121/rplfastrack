export type LeadForm = "response" | "contact" | "eligibility";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 recommended `generate_lead` event. Mark it as a key event in GA4
 * (Admin > Events). GA4 attributes it to the session's source, medium,
 * campaign and gclid on its own. If gtag.js hasn't loaded yet the event is
 * queued in dataLayer and sent when it does.
 */
export function trackLead(form: LeadForm, qualification?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "generate_lead", {
    form_name: form,
    qualification: qualification || undefined,
    page_path: window.location.pathname,
  });
}

/** Generic GA4 event (quiz steps, call / WhatsApp / email clicks). */
export function track(name: string, params: Record<string, string | number> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
