import Image from "next/image";
import Link from "next/link";

type qualification = {
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function RelatedQualificationCard({
  qualification,
}: {
  qualification: qualification;
}) {
  return (
    <div className="bg-white border border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full group">
      <Link
        prefetch={false}
        href={`/courses/${qualification.link}`}
        className="block overflow-hidden"
      >
        <div className="p-3 pb-0">
          <div className="relative rounded-lg overflow-hidden w-full pb-[70%]">
            <Image
              src={qualification.imageSquareLink}
              alt={`${qualification.title} Image`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 pt-2 flex-1 flex flex-col">
        <Link
          prefetch={false}
          href={`/courses/${qualification.link}`}
          className="block flex-1"
        >
          <h3 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
            {qualification.title}
          </h3>
        </Link>
      </div>

      <div className="px-4 pb-3">
        <Link
          prefetch={false}
          href={`/courses/${qualification.link}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 text-sm rounded-lg transition-colors"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
