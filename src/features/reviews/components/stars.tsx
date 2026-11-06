import { Star, StarHalf } from "lucide-react";

import { cn } from "@/lib/utils";

/** Always five stars for a rating, rounded to the nearest half. Decorative: show the number as text too. */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  const halves = Math.round(rating * 2);
  const size = cn("size-5 sm:size-6", className);
  return (
    <span className="flex" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = halves - i * 2;
        if (filled >= 2) return <Star key={i} className={cn(size, "fill-brand text-brand")} />;
        if (filled === 1) {
          return (
            <span key={i} className="relative inline-flex">
              <Star className={cn(size, "text-gray-300")} />
              <StarHalf className={cn(size, "absolute inset-0 fill-brand text-brand")} />
            </span>
          );
        }
        return <Star key={i} className={cn(size, "text-gray-300")} />;
      })}
    </span>
  );
}
