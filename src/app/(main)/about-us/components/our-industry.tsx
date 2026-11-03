import { MoveRight } from "lucide-react";
import Link from "next/link";
import IndustryCard from "../../components/card/industry-card";
type Industry = {
  id: string;
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function OurIndustry({
  industries,
}: {
  industries: Industry[];
}) {
  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]  overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Sectors We Specialise In
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {industries.splice(0, 4).map((industry) => (
            <IndustryCard industry={industry} key={industry.id} />
          ))}
          <div className="bg-white border border-emerald-100 md:col-auto md:mt-0 py-1  mt-4 col-span-2 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl items-center justify-center overflow-hidden flex flex-col h-full group">
            <Link
              prefetch={false}
              href={"/courses"}
              className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg inline-flex items-center gap-2"
            >
              See all industry <MoveRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
