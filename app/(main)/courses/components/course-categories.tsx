import { getAllSections } from "../../action/courses";
import SectionCard from "../../components/card/section-card";
export default async function CourseCategories() {
  const sections = await getAllSections();
  return (
    <section className="py-16 bg-[#F5F7FA] md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Industry <span className="text-emerald-500">Categories</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Browse our range of qualifications by industry. Click on a
              category to explore the available qualifications and assessment
              options.
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
