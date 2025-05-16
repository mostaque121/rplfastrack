import { CourseContent } from "@/app/(admin)/components/course/course-content";
import CourseCreateBtn from "@/app/(admin)/components/course/course-create.btn";
import { CourseCardSkeleton } from "@/app/(admin)/components/course/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Create a separate component for the section content
async function SectionContent({ link }: { link: string }) {
  // Move data fetching inside this component
  const { getSectionByLink } = await import("@/app/(admin)/action/section");
  const section = await getSectionByLink(link);

  if (!section) {
    // Use a client component for notFound or handle differently
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Section not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1">
          <Link href={"/admin/section"}>
            <h3 className="text-xl hover:underline text-blue-500 font-bold">
              Manage Course
            </h3>
          </Link>

          <ChevronRight className="w-5 text-blue-500 h-5" />
          <h4 className="text-xl font-bold">{section.title}</h4>
        </div>
        <CourseCreateBtn section={section} />
      </div>

      {section.courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.courses.map((course) => (
            <CourseContent course={course} section={section} key={course.id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">
            No Courses Available under {section.title}
          </h2>
          <p className="text-muted-foreground">
            Please add a course to this section.
          </p>
        </div>
      )}
    </>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;
  return (
    <div className="max-w-7xl w-full mx-auto px-5 py-10">
      <div className="flex flex-col gap-8">
        <Suspense
          fallback={
            <>
              {/* Show a simplified header in the loading state */}
              <div className="flex w-full justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1">
                  <Link href={"/admin/section"}>
                    <h3 className="text-xl hover:underline text-blue-500 font-bold">
                      Manage Course
                    </h3>
                  </Link>
                  <ChevronRight className="w-5 text-blue-500 h-5" />
                  <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Skeleton grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 2 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            </>
          }
        >
          <SectionContent link={link} />
        </Suspense>
      </div>
    </div>
  );
}
