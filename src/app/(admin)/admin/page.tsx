import { PageHeader } from "@/app/(admin)/_components/page-header";
import { LeadCounts, TopLeadPages, UnsyncedLeads } from "@/features/leads/components/lead-overview";
import { getAdminOrRedirect } from "@/server/admin";

export default async function DashboardPage() {
  const user = await getAdminOrRedirect();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader title="Dashboard" description={`Signed in as ${user.name}`} />
      <UnsyncedLeads />
      <LeadCounts />
      <div className="grid gap-4 lg:grid-cols-2">
        <TopLeadPages />
      </div>
    </div>
  );
}
