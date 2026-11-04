import Image from "next/image";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";

import { ResponseForm } from "@/app/(main)/components/form/response-form";
import { LucideIcon } from "@/components/icon/lucide-icon";
interface HeroSectionProps {
  data: {
    title: string;
    imageCoverLink: string;
    imageAlt?: string | null;
    icon?: string | null;
  };
}
export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="overflow-hidden bg-[#F5F7FA] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex w-full flex-col items-end justify-end gap-10 md:flex-row">
          <div className="flex flex-col-reverse md:flex-col">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-semibold text-emerald-700 md:text-4xl">
                {data.icon && (
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <LucideIcon name={data.icon} className="size-6" />
                  </span>
                )}
                {data.title}
              </h1>
              <div className="mt-3 flex items-center">
                <Link prefetch={false} href="/">
                  <span className="cursor-pointer font-medium text-emerald-600 transition duration-200 ease-in-out hover:text-emerald-700">
                    Home
                  </span>
                </Link>
                <span className="text-emerald-600">
                  <MdOutlineNavigateNext />
                </span>
                <Link prefetch={false} href="/courses">
                  <span className="cursor-pointer font-medium text-emerald-600 transition duration-200 ease-in-out hover:text-emerald-700">
                    Courses
                  </span>
                </Link>
                <span className="text-emerald-600">
                  <MdOutlineNavigateNext />
                </span>
                <span className="text-dark-gray inline-block align-middle font-semibold">
                  {data.title}
                </span>
              </div>
              <p className="text-charcoal mt-3 mb-3">
                At RPL FAST TRACK, we turn your real-world experience into formal qualifications.
                Our streamlined RPL assessment process covers {data.title} and more, making it easy
                to convert your skills into recognized credentials. With dedicated support from
                assessment to certification, we help you unlock new career and educational
                opportunities with confidence.
              </p>
            </div>

            <div className="relative mb-8 h-auto w-full overflow-hidden rounded-md shadow-md md:mb-0">
              <Image
                src={data.imageCoverLink}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={data.imageAlt || data.title}
                width={1500}
                height={720}
              />
            </div>
          </div>
          <div className="w-full">
            <ResponseForm interest={data.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
