import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <Card className="gap-3 py-0 pb-4 overflow-hidden">
      {/* Image placeholder */}
      <div className="relative w-full">
        <Skeleton className="w-full aspect-[150/72]" />
      </div>

      {/* Header placeholder */}
      <CardHeader className="px-3">
        <CardTitle className="flex items-center">
          <Skeleton className="w-6 h-6 rounded-full mr-3" />
          <Skeleton className="h-6 w-[180px]" />
        </CardTitle>
      </CardHeader>

      {/* Footer placeholder */}
      <CardFooter className="flex-col px-3 pt-0 items-start border-t">
        <div className="flex justify-between w-full gap-2">
          {/* Edit button placeholder */}
          <Skeleton className="h-9 w-[80px]" />

          {/* Delete button placeholder */}
          <Skeleton className="h-9 w-[90px]" />
        </div>

        {/* Updated timestamp placeholder */}
        <Skeleton className="h-4 w-[120px] mt-3" />
      </CardFooter>
    </Card>
  );
}
