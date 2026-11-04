import Image from "next/image";
import Link from "next/link";

type Course = {
  link: string;
  title: string;
  imageSquareLink: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-subtle bg-white shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md">
      <Link prefetch={false} href={`/courses/${course.link}`} className="block overflow-hidden">
        <div className="p-3">
          <div className="relative w-full overflow-hidden rounded-lg pb-[70%]">
            <Image
              src={course.imageSquareLink}
              alt={`${course.title} Image`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-2">
        <Link prefetch={false} href={`/courses/${course.link}`} className="block flex-1">
          <h3 className="line-clamp-2 text-lg font-bold text-ink transition-colors group-hover:text-brand">
            {course.title}
          </h3>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <Link
          prefetch={false}
          href={`/courses/${course.link}`}
          className="block w-full rounded-lg bg-brand py-2 text-center font-medium text-white transition-colors hover:bg-brand-strong"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
