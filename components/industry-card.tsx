import Image from "next/image";
import Link from "next/link";

type Industry = {
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="bg-white border border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full group">
      <Link
        href={`/industry/${industry.link}`}
        className="block overflow-hidden"
      >
        <div className="p-3 pb-0">
          <div className="relative rounded-lg overflow-hidden w-full pb-[70%]">
            <Image
              src={industry.imageSquareLink || "/placeholder.svg"}
              alt={`${industry.title} Image`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 pt-2 flex-1 flex flex-col">
        <Link href={`/industry/${industry.link}`} className="block flex-1">
          <h3 className="tex-base font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
            {industry.title}
          </h3>
        </Link>
      </div>

      <div className="px-4 pb-3">
        <Link
          href={`/industry/${industry.link}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 text-sm rounded-lg transition-colors"
        >
          View all Course
        </Link>
      </div>
    </div>
  );
}
