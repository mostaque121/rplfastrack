import { Suspense } from "react";
import SearchForm from "../../components/common/search-form";
import AddReviewBtn from "../../components/review/add-review-btn";
import { ApprovedSelector } from "../../components/review/approved-selector";
import { ReviewCardSkeleton } from "../../components/review/review-card-skeleton";
import ReviewControl from "../../components/review/review-control";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; approved?: string }>;
}) {
  // Await the searchParams promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.q || "";
  const approved =
    typeof params.approved === "string" ? params.approved !== "false" : true;

  // Number of skeletons to show while loading
  const skeletonCount = 12;

  return (
    <div className="max-w-7xl w-full mx-auto px-5 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex w-full justify-between gap-4">
          <div className="flex items-center gap-3">
            <SearchForm initialValue={search} />
            <AddReviewBtn />
          </div>

          <ApprovedSelector />
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </div>
          }
          key={`${currentPage}-${search}-${approved}`}
        >
          <ReviewControl
            page={currentPage}
            search={search}
            approved={approved}
          />
        </Suspense>
      </div>
    </div>
  );
}
