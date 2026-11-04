import { getReviewSummary } from "@/features/reviews/queries";

import ReviewCommonContent from "./review-common-content";
export default async function ReviewCommon() {
  const { latestReviews, stats } = await getReviewSummary();
  return (
    latestReviews && (
      <section className="overflow-hidden bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Clients <span className="text-brand">Say</span>
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from individuals who have successfully qualified through our RPL services.
              </p>
            </div>
          </div>
          <ReviewCommonContent stats={stats} reviews={latestReviews} />
        </div>
      </section>
    )
  );
}
