import { Skeleton } from "@/components/ui/skeleton";

export function ReviewCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-md border bg-white shadow-sm">
      {/* Image placeholder */}
      <div className="max-h-60 w-full bg-gray-200" />

      <div className="space-y-3 p-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
        </div>

        {/* Review text */}
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />

        {/* Approved switch */}
        <div className="flex items-center justify-between border-t pt-2">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        {/* Delete button */}
        <div className="pt-3">
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
