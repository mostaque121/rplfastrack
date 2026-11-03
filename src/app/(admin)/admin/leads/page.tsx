import { PageHeader } from "@/app/(admin)/_components/page-header";
import { PageLinks } from "@/app/(admin)/_components/page-links";
import { LeadFilters } from "@/features/leads/components/lead-filters";
import { LeadTable } from "@/features/leads/components/lead-table";
import { listLeads, parseLeadFilters } from "@/features/leads/queries";
import { getAdminOrRedirect } from "@/server/admin";

export const metadata = { title: "Leads" };

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await getAdminOrRedirect();
  const filters = parseLeadFilters(await searchParams);
  const { leads, total, pages } = await listLeads(filters);

  const params = {
    q: filters.q,
    form: filters.form,
    status: filters.status,
    from: filters.from,
    to: filters.to,
  };
  const exportQuery = new URLSearchParams(
    Object.entries(params).filter((entry): entry is [string, string] => !!entry[1]),
  ).toString();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="Leads"
        description={`${total.toLocaleString("en-AU")} leads. A backup copy of every form submission; the CRM is the system of record.`}
      />
      <LeadFilters filters={filters} exportHref={`/api/admin/leads/export?${exportQuery}`} />
      <LeadTable leads={leads} />
      <PageLinks page={filters.page} pages={pages} params={params} />
    </div>
  );
}
