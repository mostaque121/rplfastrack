import getAllReview from "@/app/(admin)/action/review";
import PaginationControl from "@/app/(admin)/components/common/pagination";
import { ReviewCard } from "./review-card";

interface Props {
  page: number;
  search: string;
  approved: boolean;
}

export default async function ReviewControl({ page, search, approved }: Props) {
  const pageSize = 20;
  const { reviews, pagination } = await getAllReview(
    search,
    approved,
    page,
    pageSize
  );

  return (
    <div className="max-w-7xl max-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No reviews found.
          </p>
        )}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <PaginationControl
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}
