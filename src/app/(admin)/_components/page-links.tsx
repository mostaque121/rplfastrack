import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Previous / next links that keep the current filters in the URL. */
export function PageLinks({
  page,
  pages,
  params,
}: {
  page: number;
  pages: number;
  params: Record<string, string | undefined>;
}) {
  if (pages <= 1) return null;

  const href = (target: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
    if (target > 1) search.set("page", String(target));
    const query = search.toString();
    return query ? `?${query}` : "?";
  };

  const linkClass = "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm";
  const disabled = "pointer-events-none opacity-40";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      <Link
        href={href(page - 1)}
        aria-disabled={page <= 1}
        className={cn(linkClass, page <= 1 && disabled)}
      >
        <ChevronLeft className="size-4" /> Previous
      </Link>
      <span className="text-sm text-muted-foreground">
        Page {page} of {pages}
      </span>
      <Link
        href={href(page + 1)}
        aria-disabled={page >= pages}
        className={cn(linkClass, page >= pages && disabled)}
      >
        Next <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
