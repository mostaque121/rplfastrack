import { MoveRight } from "lucide-react";
import Link from "next/link";

import IndustryCard from "../../components/card/industry-card";
type Industry = {
  id: string;
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function OurIndustry({ industries }: { industries: Industry[] }) {
  return (
    <section className="overflow-hidden bg-[#F5F7FA] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Sectors We Specialise In</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {industries.splice(0, 4).map((industry) => (
            <IndustryCard industry={industry} key={industry.id} />
          ))}
          <div className="group col-span-2 mt-4 flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-white py-1 shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-md md:col-auto md:mt-0">
            <Link
              prefetch={false}
              href={"/courses"}
              className="inline-flex items-center gap-2 text-lg font-semibold text-emerald-600 hover:text-emerald-700"
            >
              See all industry <MoveRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
