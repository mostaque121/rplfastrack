import type { Lead } from "@/generated/prisma";

import { LEAD_TIME_ZONE } from "./queries";

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  timeZone: LEAD_TIME_ZONE,
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export const formatLeadDate = (date: Date) => dateFormat.format(date);

export function leadSource(lead: Lead) {
  if (lead.gclid) return "Google Ads";
  if (lead.fbclid) return "Facebook";
  return [lead.utmSource, lead.utmMedium].filter(Boolean).join(" / ") || "Direct";
}

export function leadDetails(lead: Lead) {
  const details = (lead.details ?? {}) as Record<string, unknown>;
  return {
    industry: details.industry,
    experience: details.experience ?? details.yearsOfExperience,
    state: details.state,
  };
}

/** Label/value pairs shown when a lead row is expanded. */
export function leadDetailRows(lead: Lead): [string, string][] {
  const details = leadDetails(lead);
  const rows: [string, unknown][] = [
    ["Message", lead.message],
    ["Industry", details.industry],
    ["Experience", details.experience],
    ["State", details.state],
    ["Landing page", lead.landingPage],
    ["Campaign", lead.utmCampaign],
    ["Device", lead.device],
    ["CRM error", lead.crmError],
  ];
  return rows
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([label, value]) => [label, String(value)]);
}
