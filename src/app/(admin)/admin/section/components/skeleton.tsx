import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionCardSkeleton() {
  return (
    <Card className="gap-3 overflow-hidden py-0 pb-4">
      {/* Image placeholder */}
      <div className="relative w-full">
        <Skeleton className="aspect-[150/72] w-full" />
      </div>

      {/* Header placeholder */}
      <CardHeader className="px-3">
        <CardTitle className="flex items-center">
          <Skeleton className="mr-3 h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-[180px]" />
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3">
        <Skeleton className="h-8 w-full" />
      </CardContent>

      {/* Footer placeholder */}
      <CardFooter className="flex-col items-start border-t px-3 pt-0">
        <div className="flex w-full justify-between gap-2">
          {/* Edit button placeholder */}
          <Skeleton className="h-9 w-[80px]" />

          {/* Delete button placeholder */}
          <Skeleton className="h-9 w-[90px]" />
        </div>

        {/* Updated timestamp placeholder */}
        <Skeleton className="mt-3 h-4 w-[120px]" />
      </CardFooter>
    </Card>
  );
}
