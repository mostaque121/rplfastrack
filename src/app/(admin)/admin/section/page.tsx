export const dynamic = "force-dynamic";
import { Plus } from "lucide-react";
import { Suspense } from "react";

import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";

import AdminSectionCard from "./components/section-card";
import SectionForm from "./components/section-form";
import { SectionCardSkeleton } from "./components/skeleton";
import { getUserOrRedirect } from "../../lib/get-user";
// Create a separate component for sections content
async function SectionsContent() {
  // Move data fetching inside this component
  const { getSections } = await import("../../action/section");
  const sections = await getSections();

  return (
    <>
      {sections.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            return <AdminSectionCard section={section} key={section.id} />;
          })}
        </div>
      ) : (
        <div className="py-10 text-center">
          <h2 className="mb-2 text-xl font-semibold">No Sections Available</h2>
          <p className="text-muted-foreground">Please create a section before adding courses.</p>
        </div>
      )}
    </>
  );
}

export default async function Page() {
  await getUserOrRedirect();
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-5 py-10">
      <div className="flex w-full justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Course</h1>
        <FormDialog Form={SectionForm}>
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Create Section
          </Button>
        </FormDialog>
      </div>
      <Suspense
        fallback={
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
