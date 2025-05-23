import { Section } from "@/type/type";
import { GraduationCapIcon as Graduation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SectionCardProps {
  section: Section;
}

export default function SectionCard({ section }: SectionCardProps) {
  return (
    section.courses && (
      <div className="bg-white group mb-8 flex flex-col md:flex-row shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link href={`section/${section.link}`} className="group">
          <div className="relative overflow-hidden w-full md:w-64 h-64 md:h-auto">
            <Image
              src={section.imageSquareLink}
              alt="Section Image"
              width={720}
              height={720}
              className="object-cover transition-all duration-500 group-hover:scale-110 w-full h-full"
            />
          </div>
        </Link>

        <div className="px-6 py-4 flex flex-col justify-between">
          <Link href={`section/${section.link}`}>
            <h3 className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors duration-300">
              {section.title}
            </h3>
          </Link>

          <div className="mt-3 space-y-2">
            {section.courses.slice(0, 4).map((course) => (
              <Link key={course.id} href={`/courses/${course.link}`}>
                <p className="text-base  mt-1 flex md:items-center items-start  gap-2 text-gray-600 hover:text-emerald-500 transition-colors">
                  <Graduation className="text-emerald-500 w-5 h-5" />
                  <span>{course.title}</span>
                </p>
              </Link>
            ))}
          </div>

          <Link href={`section/${section.link}`}>
            <p className="inline-block mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 px-8 rounded-full shadow hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm font-medium">
              More Courses
            </p>
          </Link>
        </div>
      </div>
    )
  );
}
