import { Suspense } from "react";
import SearchForm from "../../components/common/search-form";
import { ExcelExportButton } from "../../components/response/excel-export-button";
import ResponseControl from "../../components/response/response-control";
import ResponseTableSkeleton from "../../components/response/skeleton";

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
    <div className=" w-full mx-auto max-w-7xl px-5 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Responses</h1>
          <div className="flex w-full flex-wrap justify-between gap-4 items-center space-x-2">
            <SearchForm initialValue={search} />
            <ExcelExportButton />
          </div>
        </div>

        <Suspense
          fallback={<ResponseTableSkeleton />}
          key={`${search}-${currentPage}`}
        >
          <ResponseControl search={search} page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
