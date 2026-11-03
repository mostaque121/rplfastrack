import { Skeleton } from "@/components/ui/skeleton";

export function ReviewCardSkeleton() {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm bg-white dark:bg-zinc-900 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full max-h-60 bg-gray-200 dark:bg-zinc-700" />

      <div className="p-4 space-y-3">
        {/* User info */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1 flex-1">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded" />
          ))}
        </div>

        {/* Review text */}
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />

        {/* Approved switch */}
        <div className="flex items-center justify-between pt-2 border-t">
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
