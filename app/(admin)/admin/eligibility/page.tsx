import { Suspense } from "react";
import SearchForm from "../../components/common/search-form";
import EligibilityControl from "../../components/eligibility/eligibility-control";
import EligibilityTableSkeleton from "../../components/eligibility/skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  // Use await to resolve the Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.q || "";

  return (
    <div className=" w-full mx-auto px-5 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Eligibility Request</h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <SearchForm initialValue={search} />
          </div>
        </div>

        <Suspense
          fallback={<EligibilityTableSkeleton />}
          key={`${search}-${currentPage}`}
        >
          <EligibilityControl search={search} page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
