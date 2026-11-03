import EligibilityCard from "./eligibility-card";
import { getAllEligibility } from "../../action/eligibility";
import PaginationControl from "../common/pagination";

export default async function EligibilityControl({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const pageSize = 12;

  const { eligibilities, pagination } = await getAllEligibility(search, page, pageSize);

  if (eligibilities.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="mb-2 text-xl font-semibold">No ELigibility request found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {eligibilities.map((eligibility) => (
          <EligibilityCard key={eligibility.id} eligibility={eligibility} />
        ))}
      </div>

      <div>
        <PaginationControl
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    </div>
  );
}
