import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Qualification = {
  id: string;
  link: string;
  title: string;
  imageUrl: string;
};

/** One qualification as a single clickable card: photo, title, "View qualification". */
export function QualificationCard({ qualification }: { qualification: Qualification }) {
  return (
    <Link
      prefetch={false}
      href={`/courses/${qualification.link}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-subtle hover:shadow-xl"
    >
      <span className="relative block aspect-16/10 overflow-hidden">
        <Image
          src={qualification.imageUrl}
          alt={`${qualification.title} RPL`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent"
        />
      </span>
      <span className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="line-clamp-3 flex-1 text-lg leading-snug font-bold text-ink transition-colors group-hover:text-brand-strong">
          {qualification.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          View qualification
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </span>
    </Link>
  );
}
