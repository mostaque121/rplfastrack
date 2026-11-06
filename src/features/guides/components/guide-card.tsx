import { ArrowRight, BookOpenText, Clock } from "lucide-react";
import Image from "@/components/cloudinary-image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type GuideCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  imageLink: string | null;
  imageAlt: string | null;
  readingMinutes: number;
};

/** One guide as a single clickable card. `featured` is the wide first card on /guides. */
export function GuideCard({
  guide,
  featured = false,
}: {
  guide: GuideCardProps;
  featured?: boolean;
}) {
  return (
    <Link
      prefetch={false}
      href={`/guides/${guide.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-subtle hover:shadow-xl",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <span
        className={cn(
          "relative block aspect-16/9 overflow-hidden bg-brand-soft",
          featured && "lg:aspect-auto lg:min-h-80",
        )}
      >
        {guide.imageLink ? (
          <Image
            src={guide.imageLink}
            alt={guide.imageAlt ?? ""}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-brand">
            <BookOpenText aria-hidden className="size-12" />
          </span>
        )}
      </span>
      <span
        className={cn("flex flex-1 flex-col gap-3 p-5", featured && "lg:justify-center lg:p-10")}
      >
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <Clock aria-hidden className="size-4 text-brand" />
          {guide.readingMinutes} min read
        </span>
        <h3
          className={cn(
            "text-lg leading-snug font-bold text-ink transition-colors group-hover:text-brand-strong",
            featured && "lg:text-3xl",
          )}
        >
          {guide.title}
        </h3>
        <span className={cn("line-clamp-3 flex-1 text-gray-700", featured && "lg:text-lg")}>
          {guide.excerpt}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          Read the guide
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </span>
    </Link>
  );
}
