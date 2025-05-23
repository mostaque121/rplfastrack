import RelatedQualificationCard from "@/components/qualification-card";
import { MoveRight } from "lucide-react";
import Link from "next/link";
type qualification = {
  id: string;
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function RelatedCourses({
  qualifications,
  industryLink,
}: {
  qualifications?: qualification[];
  industryLink: string;
}) {
  return (
    qualifications && (
      <section className="py-16 md:py-24 bg-slate-800  overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="md:text-3xl text-2xl font-bold text-white mb-4">
            Related Qualification
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {qualifications.splice(0, 4).map((qualification) => (
              <RelatedQualificationCard
                qualification={qualification}
                key={qualification.id}
              />
            ))}
            {qualifications.length > 4 && (
              <div className="bg-white border border-emerald-100 md:col-auto md:mt-0 py-1  mt-4 col-span-2 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl items-center justify-center overflow-hidden flex flex-col h-full group">
                <Link
                  href={`/section/${industryLink}`}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg inline-flex items-center gap-2"
                >
                  See more courses <MoveRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
}
