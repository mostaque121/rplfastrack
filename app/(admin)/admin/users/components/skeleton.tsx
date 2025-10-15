import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type TableSkeletonProps = {
  length: number;
};

export default function UserTableSkeleton({ length }: TableSkeletonProps) {
  const skeletonRows = Array.from({ length }, (_, i) => i);

  return (
    <Table>
      <TableBody className="hover:bg-transparent">
        {skeletonRows.map((row) => (
          <TableRow key={row} className="hover:bg-transparent">
            <TableCell>
              <Skeleton className="h-5 w-[120px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-[180px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-[120px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
