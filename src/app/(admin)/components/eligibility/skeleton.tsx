import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EligibilityTableSkeleton() {
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden py-0 transition-all hover:shadow-md"
            >
              <CardHeader className="bg-slate-50 pt-4 pb-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Date:</span>
                    <Skeleton className="h-4 w-32 col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Phone:</span>
                    <Skeleton className="h-4 w-32 col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Email:</span>
                    <Skeleton className="h-4 w-full col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Message:</span>
                    <Skeleton className="h-4 w-full col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Industry:</span>
                    <Skeleton className="h-4 w-24 col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">
                      Qualification:
                    </span>
                    <Skeleton className="h-4 w-24 col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Experience:</span>
                    <Skeleton className="h-4 w-24 col-span-2" />
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Current City:</span>
                    <Skeleton className="h-4 w-24 col-span-2" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 pt-3 pb-4">
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
