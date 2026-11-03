import { Plus } from "lucide-react";
import { Suspense } from "react";

import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";

import { ApprovedSelector } from "./components/approved-selector";
import ReviewForm from "./components/form/review-form";
import { ReviewCardSkeleton } from "./components/review-card-skeleton";
import ReviewControl from "./components/review-control";
import SearchForm from "../../components/common/search-form";
import { getUserOrRedirect } from "../../lib/get-user";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; approved?: string }>;
}) {
  await getUserOrRedirect();
  // Await the searchParams promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.q || "";
  const approved = typeof params.approved === "string" ? params.approved !== "false" : true;

  // Number of skeletons to show while loading
  const skeletonCount = 12;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex w-full justify-between gap-4">
          <div className="flex w-full flex-col items-center gap-3 md:flex-row">
            <SearchForm initialValue={search} />
            <div className="flex w-full items-center justify-between gap-6">
              <FormDialog Form={ReviewForm}>
                <Button className="flex items-center gap-2">
                  <Plus size={18} />
                  Add Review
                </Button>
              </FormDialog>
              <ApprovedSelector />
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </div>
          }
          key={`${currentPage}-${search}-${approved}`}
        >
          <ReviewControl page={currentPage} search={search} approved={approved} />
        </Suspense>
      </div>
    </div>
  );
}
