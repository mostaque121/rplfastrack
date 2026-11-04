import Image from "next/image";
import Link from "next/link";

import { LucideIcon } from "@/components/icon/lucide-icon";

type Industry = {
  link: string;
  title: string;
  imageSquareLink: string;
  icon?: string | null;
};

export default function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-md">
      <Link prefetch={false} href={`/section/${industry.link}`} className="block overflow-hidden">
        <div className="p-3 pb-0">
          <div className="relative w-full overflow-hidden rounded-lg pb-[70%]">
            <Image
              src={industry.imageSquareLink}
              alt={`${industry.title} Image`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-2">
        <Link prefetch={false} href={`/section/${industry.link}`} className="block flex-1">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-800 transition-colors group-hover:text-emerald-700">
            <LucideIcon name={industry.icon} className="size-5 shrink-0 text-emerald-700" />
            {industry.title}
          </h3>
        </Link>
      </div>

      <div className="px-4 pb-3">
        <Link
          prefetch={false}
          href={`/section/${industry.link}`}
          className="block w-full rounded-lg bg-emerald-600 py-1.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          View all Course
        </Link>
      </div>
    </div>
  );
}
