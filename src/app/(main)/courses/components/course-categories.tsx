import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LucideIcon } from "@/components/icon/lucide-icon";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { listSections } from "@/features/courses/queries";

/**
 * Every industry with every qualification as a plain link. This is the page that links down to
 * all course pages, so every course is listed (not just the first few). The chips at the top
 * jump to an industry.
 */
export default async function CourseCategories() {
  const sections = await listSections();

  return (
    <section className="relative overflow-hidden bg-surface py-14 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--brand-subtle)_1.5px,transparent_1.5px)] mask-[radial-gradient(ellipse_at_top,black_15%,transparent_60%)] bg-size-[24px_24px]"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Browse by industry"
          title={
            <>
              Find your <Accent>RPL qualification</Accent>
            </>
          }
          description="Choose your industry to see every qualification available through RPL. Open one to see the units, the evidence you need and how to apply."
        />

        <nav aria-label="Industries" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.link}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-subtle bg-white px-4 py-2 text-sm font-medium text-brand-strong shadow-xs transition-colors hover:border-brand hover:bg-brand hover:text-white"
                >
                  <LucideIcon name={section.icon} className="size-4" />
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-8">
          {sections.map((section) => {
            const courses = section.courses ?? [];
            const href = `/section/${section.link}`;
            return (
              <article
                key={section.id}
                id={section.link}
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
              >
                <header className="flex flex-col gap-4 border-b border-gray-100 bg-linear-to-r from-brand-soft to-white p-5 sm:flex-row sm:items-center sm:p-6">
                  <Link
                    prefetch={false}
                    href={href}
                    className="relative block size-20 shrink-0 overflow-hidden rounded-2xl shadow-md"
                  >
                    <Image
                      src={section.imageUrl}
                      alt={`${section.title} RPL qualifications`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-bold text-ink">
                      <Link
                        prefetch={false}
                        href={href}
                        className="flex items-center gap-2 hover:text-brand-strong"
                      >
                        <LucideIcon name={section.icon} className="size-6 shrink-0 text-brand" />
                        {section.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {courses.length} {courses.length === 1 ? "qualification" : "qualifications"}{" "}
                      available through RPL
                    </p>
                  </div>
                  <Link
                    prefetch={false}
                    href={href}
                    className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
                  >
                    View {section.title}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </header>

                <ul className="grid gap-x-6 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3">
                  {courses.map((course) => (
                    <li key={course.id}>
                      <Link
                        prefetch={false}
                        href={`/courses/${course.link}`}
                        className="group flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 text-gray-700 transition-colors hover:bg-brand-soft hover:text-brand-strong"
                      >
                        <GraduationCap aria-hidden className="size-5 shrink-0 text-brand" />
                        <span className="flex-1 text-sm font-medium">{course.title}</span>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
