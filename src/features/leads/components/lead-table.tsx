import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Lead } from "@/generated/prisma/client";

import { formatLeadDate, leadDetailRows, leadSource } from "../format";
import { LEAD_FORM_LABELS } from "../labels";
import { CrmStatusBadge } from "./crm-status-badge";
import { RetrySyncButton } from "./retry-sync-button";

export function LeadTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
        No leads match these filters.
      </p>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Received</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Form</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>CRM</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const rows = leadDetailRows(lead);
            return (
              <TableRow key={lead.id} className="align-top">
                <TableCell className="text-muted-foreground">
                  {formatLeadDate(lead.createdAt)}
                </TableCell>
                <TableCell className="font-medium">
                  {lead.name}
                  {rows.length > 0 && (
                    <details className="mt-1 max-w-sm font-normal whitespace-normal">
                      <summary className="cursor-pointer text-xs text-muted-foreground">
                        Details
                      </summary>
                      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                        {rows.map(([label, value]) => (
                          <div key={label} className="contents">
                            <dt className="text-muted-foreground">{label}</dt>
                            <dd className="break-words">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  )}
                </TableCell>
                <TableCell>
                  <a href={`mailto:${lead.email}`} className="block hover:underline">
                    {lead.email}
                  </a>
                  <a href={`tel:${lead.phone}`} className="block text-muted-foreground">
                    {lead.phone}
                  </a>
                </TableCell>
                <TableCell>{LEAD_FORM_LABELS[lead.form]}</TableCell>
                <TableCell className="max-w-56 whitespace-normal">{lead.interest ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">{leadSource(lead)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CrmStatusBadge status={lead.crmStatus} />
                    {lead.crmStatus !== "SYNCED" && <RetrySyncButton leadId={lead.id} />}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
