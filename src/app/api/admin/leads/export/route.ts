import { NextRequest, NextResponse } from "next/server";

import { leadDetails, leadSource } from "@/features/leads/format";
import { LEAD_FORM_LABELS } from "@/features/leads/labels";
import { listLeadsForExport, parseLeadFilters, todayInSydney } from "@/features/leads/queries";
import { withAdminGuard } from "@/server/with-admin-guard";

const COLUMNS = [
  "Received (UTC)",
  "Form",
  "Name",
  "Email",
  "Phone",
  "Interest",
  "Message",
  "Industry",
  "Experience",
  "State",
  "Source",
  "UTM source",
  "UTM medium",
  "UTM campaign",
  "Landing page",
  "Device",
  "CRM status",
  "CRM error",
];

function csvCell(value: unknown) {
  if (value === null || value === undefined) return "";
  let text = String(value);
  // Stop spreadsheet apps from running cell content as a formula
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export const GET = withAdminGuard(async (req: NextRequest) => {
  const filters = parseLeadFilters(Object.fromEntries(req.nextUrl.searchParams));
  const leads = await listLeadsForExport(filters);

  const lines = leads.map((lead) => {
    const details = leadDetails(lead);
    return [
      lead.createdAt.toISOString(),
      LEAD_FORM_LABELS[lead.form],
      lead.name,
      lead.email,
      lead.phone,
      lead.interest,
      lead.message,
      details.industry,
      details.experience,
      details.state,
      leadSource(lead),
      lead.utmSource,
      lead.utmMedium,
      lead.utmCampaign,
      lead.landingPage,
      lead.device,
      lead.crmStatus,
      lead.crmError,
    ]
      .map(csvCell)
      .join(",");
  });

  // BOM so Excel opens the file as UTF-8
  const csv = "﻿" + [COLUMNS.join(","), ...lines].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${todayInSydney()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
