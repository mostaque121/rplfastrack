import { getCommonReviews } from "../action/review";
import ReviewCommonContent from "./review-common-content";
export default async function ReviewCommon() {
  const { latestReviews, stats } = await getCommonReviews();
  return (
    latestReviews && (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Clients <span className="text-emerald-600">Say</span>
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from individuals who have successfully qualified through
                our RPL services.
              </p>
            </div>
          </div>
          <ReviewCommonContent stats={stats} reviews={latestReviews} />
        </div>
      </section>
    )
  );
}
