import { Download, Search } from "lucide-react";
import Link from "next/link";

import { NativeSelect } from "@/app/(admin)/_components/native-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrmSyncStatus, LeadForm } from "@/generated/prisma/enums";

import { CRM_STATUS_LABELS, LEAD_FORM_LABELS } from "../labels";

import type { LeadFilters as Filters } from "../queries";

/** A plain GET form: filters live in the URL, so links and the back button work. */
export function LeadFilters({ filters, exportHref }: { filters: Filters; exportHref: string }) {
  return (
    <form className="flex flex-wrap items-end gap-3" action="/admin/leads">
      <div className="relative min-w-56 flex-1">
        <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          name="q"
          defaultValue={filters.q}
          placeholder="Name, email, phone or course"
          aria-label="Search leads"
          className="pl-8"
        />
      </div>
      <NativeSelect name="form" defaultValue={filters.form ?? ""} aria-label="Form">
        <option value="">All forms</option>
        {Object.values(LeadForm).map((form) => (
          <option key={form} value={form}>
            {LEAD_FORM_LABELS[form]}
          </option>
        ))}
      </NativeSelect>
      <NativeSelect name="status" defaultValue={filters.status ?? ""} aria-label="CRM status">
        <option value="">Any CRM status</option>
        {Object.values(CrmSyncStatus).map((status) => (
          <option key={status} value={status}>
            {CRM_STATUS_LABELS[status]}
          </option>
        ))}
      </NativeSelect>
      <label className="flex flex-col gap-1 text-xs text-muted-foreground">
        From
        <Input type="date" name="from" defaultValue={filters.from} className="w-40" />
      </label>
      <label className="flex flex-col gap-1 text-xs text-muted-foreground">
        To
        <Input type="date" name="to" defaultValue={filters.to} className="w-40" />
      </label>
      <Button type="submit">Filter</Button>
      <Button variant="ghost" asChild>
        <Link href="/admin/leads">Reset</Link>
      </Button>
      <Button variant="outline" asChild className="ml-auto">
        <a href={exportHref}>
          <Download /> CSV
        </a>
      </Button>
    </form>
  );
}
