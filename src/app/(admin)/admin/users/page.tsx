import { Suspense } from "react";

import UserTableSkeleton from "./components/skeleton";
import UserTable from "./components/user-table";
import SearchForm from "../../components/common/search-form";
import { getAdminOrRedirect } from "@/server/admin";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getAdminOrRedirect();

  // Use await to resolve the Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.q || "";

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex w-full items-center space-x-2">
            <SearchForm initialValue={search} />
          </div>
        </div>

        <Suspense fallback={<UserTableSkeleton length={3} />} key={`${search}-${currentPage}`}>
          <UserTable loggedInUser={user} search={search} page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
