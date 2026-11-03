import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { getUserOrRedirect } from "@/app/(admin)/lib/get-user";
import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";

import { AdminCourseCard } from "./components/course-card";
import CourseForm from "./components/course-form";
import { CourseCardSkeleton } from "./components/skeleton";

// Create a separate component for the section content
async function SectionContent({ link }: { link: string }) {
  await getUserOrRedirect();
  // Move data fetching inside this component
  const { getSectionByLink } = await import("@/app/(admin)/action/section");
  const section = await getSectionByLink(link);

  if (!section) {
    // Use a client component for notFound or handle differently
    return (
      <div className="py-10 text-center">
        <h2 className="mb-2 text-xl font-semibold">Section not found</h2>
      </div>
    );
  }

  const item = {
    section: section,
  };

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1">
          <Link href={"/admin/section"}>
            <h3 className="text-xl font-bold text-blue-500 hover:underline">Manage Course</h3>
          </Link>

          <ChevronRight className="h-5 w-5 text-blue-500" />
          <h4 className="text-xl font-bold">{section.title}</h4>
        </div>

        <FormDialog Form={CourseForm} item={item}>
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Add Course
          </Button>
        </FormDialog>
      </div>

      {section.courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.courses.map((course) => (
            <AdminCourseCard course={course} section={section} key={course.id} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <h2 className="mb-2 text-xl font-semibold">No Courses Available under {section.title}</h2>
          <p className="text-muted-foreground">Please add a course to this section.</p>
        </div>
      )}
    </>
  );
}
export default async function Page({ params }: { params: Promise<{ link: string }> }) {
  const { link } = await params;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10">
      <div className="flex flex-col gap-8">
        <Suspense
          fallback={
            <>
              {/* Show a simplified header in the loading state */}
              <div className="flex w-full justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1">
                  <Link href={"/admin/section"}>
                    <h3 className="text-xl font-bold text-blue-500 hover:underline">
                      Manage Course
                    </h3>
                  </Link>
                  <ChevronRight className="h-5 w-5 text-blue-500" />
                  <div className="h-7 w-32 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-9 w-32 animate-pulse rounded bg-gray-200"></div>
              </div>

              {/* Skeleton grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 12 }).map((_, index) => (
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
