import { Star } from "lucide-react";

import { Stars } from "@/features/reviews/components/stars";

type UserReview = { givenStar: number };

/** Average rating and the spread of 5 to 1 stars. */
export default function ReviewStats({ reviews }: { reviews: UserReview[] }) {
  const rated = reviews.filter((r) => r.givenStar >= 1 && r.givenStar <= 5);
  const total = rated.length;
  if (total === 0) return null;

  const average = rated.reduce((sum, r) => sum + r.givenStar, 0) / total;
  const rows = [5, 4, 3, 2, 1].map((star) => {
    const count = rated.filter((r) => r.givenStar === star).length;
    return { star, count, percent: Math.round((count / total) * 100) };
  });

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:grid-cols-[14rem_minmax(0,1fr)] md:p-8">
          <div className="flex flex-col items-center justify-center text-center md:border-r md:border-gray-200 md:pr-8">
            <p className="font-display text-5xl font-bold text-ink">{average.toFixed(1)}</p>
            <div className="mt-2">
              <Stars rating={average} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="sr-only">Average rating {average.toFixed(1)} out of 5, </span>
              based on {total} {total === 1 ? "review" : "reviews"}
            </p>
          </div>

          <ul className="space-y-3 self-center" aria-label="Ratings breakdown">
            {rows.map(({ star, count, percent }) => (
              <li key={star} className="flex items-center gap-3 text-sm">
                <span className="flex w-10 shrink-0 items-center gap-1 font-medium text-ink">
                  {star}
                  <Star aria-hidden className="size-4 fill-brand text-brand" />
                </span>
                <span className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <span
                    className="block h-full rounded-full bg-brand"
                    style={{ width: `${percent}%` }}
                  />
                </span>
                <span className="w-20 shrink-0 text-right text-gray-600">
                  {count} {count === 1 ? "review" : "reviews"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
