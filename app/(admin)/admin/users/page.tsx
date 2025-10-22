import { Suspense } from "react";
import SearchForm from "../../components/common/search-form";
import { getUserOrRedirect } from "../../lib/get-user";
import UserTableSkeleton from "./components/skeleton";
import UserTable from "./components/user-table";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getUserOrRedirect();

  // Use await to resolve the Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.q || "";

  return (
    <div className="max-w-7xl w-full mx-auto px-5 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex w-full items-center space-x-2">
            <SearchForm initialValue={search} />
          </div>
        </div>

        <Suspense
          fallback={<UserTableSkeleton length={3} />}
          key={`${search}-${currentPage}`}
        >
          <UserTable loggedInUser={user} search={search} page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
