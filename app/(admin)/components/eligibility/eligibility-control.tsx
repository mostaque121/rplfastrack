import { getAllEligibility } from "../../action/eligibility";
import PaginationControl from "../common/pagination";
import EligibilityCard from "./eligibility-card";

export default async function EligibilityControl({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const pageSize = 12;

  const { eligibilities, pagination } = await getAllEligibility(
    search,
    page,
    pageSize
  );

  if (eligibilities.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">
          No ELigibility request found
        </h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl ">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
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
