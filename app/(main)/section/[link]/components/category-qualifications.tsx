import CourseCard from "@/app/(main)/components/card/course-card";
interface Qualification {
  id: string;
  link: string;
  title: string;
  imageSquareLink: string;
}
interface QualificationsProps {
  qualifications: Qualification[];
}
export default function CaregoryQualifications({
  qualifications,
}: QualificationsProps) {
  return (
    qualifications.length > 0 && (
      <section className="py-16 bg-white md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Our{" "}
                <span className="text-emerald-600">Qualifications</span>
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Browse our range of qualifications by industry. Click on a
                category to explore the available qualifications and assessment
                options.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
            {qualifications.map((qualification) => (
              <CourseCard course={qualification} key={qualification.id} />
            ))}
          </div>
        </div>
      </section>
    )
  );
}
