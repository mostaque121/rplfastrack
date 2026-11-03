import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeadForm } from "@/generated/prisma";

import { formatLeadDate } from "../format";
import { LEAD_FORM_LABELS } from "../labels";
import { getDailyLeadCounts, getTopLeadPages, listUnsyncedLeads } from "../queries";
import { CrmStatusBadge } from "./crm-status-badge";
import { RetrySyncButton } from "./retry-sync-button";

type Counts = { total: number; byForm: Partial<Record<LeadForm, number>> };

function sumSince(rows: { day: string; form: LeadForm; count: number }[], since: string): Counts {
  const counts: Counts = { total: 0, byForm: {} };
  for (const row of rows) {
    if (row.day < since) continue;
    counts.total += row.count;
    counts.byForm[row.form] = (counts.byForm[row.form] ?? 0) + row.count;
  }
  return counts;
}

/** Lead totals for today / 7 / 30 days plus a per-day bar chart. */
export async function LeadCounts() {
  const { days, rows } = await getDailyLeadCounts(30);
  const periods = [
    { label: "Today", counts: sumSince(rows, days[days.length - 1]) },
    { label: "Last 7 days", counts: sumSince(rows, days[days.length - 7]) },
    { label: "Last 30 days", counts: sumSince(rows, days[0]) },
  ];

  const perDay = days.map((day) => ({
    day,
    count: rows.filter((row) => row.day === day).reduce((sum, row) => sum + row.count, 0),
  }));
  const max = Math.max(1, ...perDay.map((d) => d.count));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {periods.map(({ label, counts }) => (
          <Card key={label} className="gap-2 py-4">
            <CardHeader className="px-4">
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{counts.total}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 text-xs text-muted-foreground">
              {Object.entries(counts.byForm)
                .map(([form, count]) => `${LEAD_FORM_LABELS[form as LeadForm]} ${count}`)
                .join(" · ") || "No leads"}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="gap-3 py-4">
        <CardHeader className="px-4">
          <CardTitle className="text-sm font-medium">Leads per day, last 30 days</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="flex h-28 items-end gap-1" role="img" aria-label="Leads per day">
            {perDay.map(({ day, count }) => (
              <div
                key={day}
                title={`${day}: ${count}`}
                className="flex-1 rounded-sm bg-primary/80 hover:bg-primary"
                style={{ height: `${Math.max(2, (count / max) * 100)}%` }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{days[0]}</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function UnsyncedLeads() {
  const leads = await listUnsyncedLeads();
  if (leads.length === 0) return null;

  return (
    <Card className="gap-3 border-red-200 py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-sm font-medium">CRM sync problems ({leads.length})</CardTitle>
        <CardDescription>
          These leads are saved here but did not reach the CRM. Retry, or add them by hand.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        {leads.map((lead) => (
          <div key={lead.id} className="flex flex-wrap items-center gap-3 text-sm">
            <CrmStatusBadge status={lead.crmStatus} />
            <span className="font-medium">{lead.name}</span>
            <span className="text-muted-foreground">
              {LEAD_FORM_LABELS[lead.form]} · {formatLeadDate(lead.createdAt)}
            </span>
            {lead.crmError && (
              <span className="truncate text-xs text-red-700" title={lead.crmError}>
                {lead.crmError.slice(0, 80)}
              </span>
            )}
            <span className="ml-auto">
              <RetrySyncButton leadId={lead.id} />
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export async function TopLeadPages() {
  const pages = await getTopLeadPages(5);
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-sm font-medium">Top lead pages, last 30 days</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        {pages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No landing-page data yet.</p>
        ) : (
          <ol className="space-y-1.5 text-sm">
            {pages.map(({ page, leads }) => (
              <li key={page} className="flex justify-between gap-4">
                <Link
                  href={page}
                  target="_blank"
                  prefetch={false}
                  className="truncate hover:underline"
                >
                  {page}
                </Link>
                <span className="tabular-nums">{leads}</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
