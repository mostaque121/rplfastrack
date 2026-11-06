import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb trail. The last crumb is the current page (no link). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="size-4 text-gray-500" />}
            {item.href ? (
              <Link
                prefetch={false}
                href={item.href}
                className="font-medium text-brand transition-colors hover:text-brand-strong"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-gray-700">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
