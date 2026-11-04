import { MoveRight } from "lucide-react";
import Link from "next/link";

import RelatedQualificationCard from "@/app/(main)/components/card/qualification-card";
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
      <section className="overflow-hidden bg-ink py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Related Qualification</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {qualifications.slice(0, 4).map((qualification) => (
              <RelatedQualificationCard qualification={qualification} key={qualification.id} />
            ))}
            {qualifications.length > 4 && (
              <div className="group col-span-2 mt-4 flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border border-brand-subtle bg-white py-1 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md md:col-auto md:mt-0">
                <Link
                  prefetch={false}
                  href={`/section/${industryLink}`}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-brand hover:text-brand-strong"
                >
                  See more courses <MoveRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
}
