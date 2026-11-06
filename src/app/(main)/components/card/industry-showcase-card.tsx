import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LucideIcon } from "@/components/icon/lucide-icon";
import { Section } from "@/types/shared";

const SHOWN_COURSES = 3;

/**
 * Industry card for the home page: photo, industry name, its top qualifications as tappable
 * rows (min 44px high), and a link to the full list. On mobile the photo is a short banner
 * so several cards fit on screen without long scrolling.
 */
export default function IndustryShowcaseCard({ section }: { section: Section }) {
  const courses = section.courses ?? [];
  const href = `/section/${section.link}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link prefetch={false} href={href} className="relative block aspect-16/8 overflow-hidden">
        <Image
          src={section.imageUrl}
          alt={`${section.title} RPL qualifications`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent"
        />
        <span className="absolute bottom-3 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
          {courses.length} {courses.length === 1 ? "qualification" : "qualifications"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-xl font-bold text-ink">
          <Link
            prefetch={false}
            href={href}
            className="flex items-center gap-2 hover:text-brand-strong"
          >
            <LucideIcon name={section.icon} className="size-5 shrink-0 text-brand" />
            {section.title}
          </Link>
        </h3>

        <ul className="mt-3 flex-1 divide-y divide-gray-100">
          {courses.slice(0, SHOWN_COURSES).map((course) => (
            <li key={course.id}>
              <Link
                prefetch={false}
                href={`/courses/${course.link}`}
                className="flex min-h-11 items-center gap-3 py-2 text-sm text-gray-700 hover:text-brand"
              >
                <GraduationCap aria-hidden className="size-5 shrink-0 text-brand" />
                <span className="line-clamp-2 flex-1">{course.title}</span>
                <ArrowRight aria-hidden className="size-4 shrink-0 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          prefetch={false}
          href={href}
          className="mt-3 flex h-10 items-center justify-center gap-2 rounded-lg border border-brand-subtle bg-brand-soft px-4 text-sm font-semibold text-brand-strong transition-colors hover:border-brand hover:bg-brand-subtle"
        >
          See all {section.title} courses
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </article>
  );
}
