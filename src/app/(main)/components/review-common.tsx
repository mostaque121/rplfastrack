import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { getReviewSummary } from "@/features/reviews/queries";

import ReviewCommonContent from "./review-common-content";
export default async function ReviewCommon() {
  const { latestReviews, stats } = await getReviewSummary();
  return (
    latestReviews && (
      <section className="overflow-hidden bg-surface py-14 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <ReviewCommonContent
            stats={stats}
            reviews={latestReviews}
            heading={
              <SectionHeading
                eyebrow="Client reviews"
                title={
                  <>
                    What our clients <Accent>say</Accent>
                  </>
                }
                description="Hear from people who have qualified through RPL with our help."
              />
            }
          />
        </div>
      </section>
    )
  );
}
