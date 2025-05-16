import Image from "next/image";
import Link from "next/link";

type Course = {
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white border border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full group">
      <Link
        href={`/qualifications/${course.link}`}
        className="block overflow-hidden"
      >
        <div className="p-3">
          <div className="relative rounded-lg overflow-hidden w-full pb-[70%]">
            <Image
              src={course.imageSquareLink || "/placeholder.svg"}
              alt={`${course.title} Image`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 pt-2 flex-1 flex flex-col">
        <Link href={`/qualifications/${course.link}`} className="block flex-1">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <Link
          href={`/qualifications/${course.link}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
