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
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-md">
      <Link
        prefetch={false}
        href={`/courses/${qualification.link}`}
        className="block overflow-hidden"
      >
        <div className="p-3 pb-0">
          <div className="relative w-full overflow-hidden rounded-lg pb-[70%]">
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

      <div className="flex flex-1 flex-col p-4 pt-2">
        <Link prefetch={false} href={`/courses/${qualification.link}`} className="block flex-1">
          <h3 className="text-sm font-bold text-gray-800 transition-colors group-hover:text-emerald-600">
            {qualification.title}
          </h3>
        </Link>
      </div>

      <div className="px-4 pb-3">
        <Link
          prefetch={false}
          href={`/courses/${qualification.link}`}
          className="block w-full rounded-lg bg-emerald-600 py-1.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
