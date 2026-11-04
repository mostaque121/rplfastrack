import { listSections } from "@/features/courses/queries";

import SectionCard from "../../components/card/section-card";
export default async function CourseCategories() {
  const sections = await listSections();
  return (
    <section className="overflow-hidden bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Industry <span className="text-brand">Categories</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our range of qualifications by industry. Click on a category to explore the
              available qualifications and assessment options.
            </p>
          </div>
        </div>

        {sections.map((section) => (
          <SectionCard section={section} key={section.id} />
        ))}
      </div>
    </section>
  );
}
