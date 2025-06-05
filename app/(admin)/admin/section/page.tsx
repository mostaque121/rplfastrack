export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { SectionContent } from "../../components/section/section-content";
import SectionCreateBtn from "../../components/section/section-create-btn";
import { SectionCardSkeleton } from "../../components/section/skeleton";
// Create a separate component for sections content
async function SectionsContent() {
  // Move data fetching inside this component
  const { getSections } = await import("../../action/section");
  const sections = await getSections();

  return (
    <>
      <div className="flex justify-between w-full gap-4">
        <h1 className="text-3xl font-bold">Manage Course</h1>
        <SectionCreateBtn allSections={sections} />
      </div>

      {sections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            return (
              <SectionContent
                sections={sections}
                section={section}
                key={section.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">No Sections Available</h2>
          <p className="text-muted-foreground">
            Please create a section before adding courses.
          </p>
        </div>
      )}
    </>
  );
}

export default function Page() {
  return (
    <div className="max-w-7xl w-full mx-auto px-5 py-10">
      <div className="flex flex-col gap-8">
        <Suspense
          fallback={
            <>
              {/* Show a simplified header in the loading state */}
              <div className="flex justify-between w-full gap-4">
                <h1 className="text-3xl font-bold">Manage Course</h1>
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Skeleton grid */}
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SectionCardSkeleton key={index} />
                ))}
              </div>
            </>
          }
        >
          <SectionsContent />
        </Suspense>
      </div>
    </div>
  );
}
