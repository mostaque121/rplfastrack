import { Accent, SectionHeading } from "@/components/sections/section-heading";

import ReviewCard from "../../components/card/review-card";

import type { ComponentProps } from "react";

type UserReview = ComponentProps<typeof ReviewCard>["review"];

export default function ReviewList({ reviews }: { reviews: UserReview[] }) {
  if (reviews.length === 0) return null;
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Client feedback"
          title={
            <>
              Real reviews from <Accent>real clients</Accent>
            </>
          }
          description="Every review comes from a client who went through RPL with us, and is checked before it is published."
        />
        {/* Masonry columns, so short and long reviews pack without gaps. */}
        <div className="mt-10 gap-6 sm:columns-2 lg:columns-3 [&>*]:break-inside-avoid">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
