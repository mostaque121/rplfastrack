import { ArrowRight, GraduationCapIcon as Graduation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LucideIcon } from "@/components/icon/lucide-icon";
import { Button } from "@/components/ui/button";
import { Section } from "@/types/shared";

interface SectionCardProps {
  section: Section;
}

export default function SectionCard({ section }: SectionCardProps) {
  return (
    section.courses && (
      <div className="group mb-8 flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg md:flex-row">
        <Link prefetch={false} href={`section/${section.link}`} className="group">
          <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-64">
            <Image
              src={section.imageSquareLink}
              sizes="(min-width: 768px) 256px, 100vw"
              alt={section.title}
              width={720}
              height={720}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between px-6 py-4">
          <Link prefetch={false} href={`section/${section.link}`}>
            <h3 className="flex items-center gap-2 text-2xl font-bold text-ink transition-colors duration-300 hover:text-brand-strong">
              <LucideIcon name={section.icon} className="size-6 shrink-0 text-brand" />
              {section.title}
            </h3>
          </Link>

          <div className="mt-3 space-y-2">
            {section.courses.slice(0, 4).map((course) => (
              <Link prefetch={false} key={course.id} href={`/courses/${course.link}`}>
                <p className="mt-1 flex items-start gap-2 text-base text-gray-600 transition-colors hover:text-brand md:items-center">
                  <Graduation className="h-5 w-5 text-brand" />
                  <span>{course.title}</span>
                </p>
              </Link>
            ))}
          </div>

          <Link prefetch={false} href={`section/${section.link}`} className="mt-4">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-brand to-brand-strong text-white"
            >
              More Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    )
  );
}
