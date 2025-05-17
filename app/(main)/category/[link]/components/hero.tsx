import { ResponseForm } from "@/app/(main)/components/response-form";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";
interface HeroSectionProps {
  data: {
    title: string;
    imageCoverLink: string;
  };
}
export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="py-16 bg-[#F5F7FA] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col w-full md:flex-row gap-10 items-end justify-end">
          <div className="flex flex-col-reverse md:flex-col">
            <div>
              <h1 className="md:text-4xl text-3xl text-emerald-600 font-semibold">
                {data.title}
              </h1>
              <div className="mt-3 flex items-center">
                <Link href="/">
                  <span className="text-emerald-600 font-medium hover:text-emerald-700 transition duration-200 ease-in-out cursor-pointer ">
                    Home
                  </span>
                </Link>
                <span className="text-emerald-600">
                  <MdOutlineNavigateNext />
                </span>
                <Link href="/qualifications">
                  <span className="text-emerald-600 font-medium hover:text-emerald-700 transition duration-200 ease-in-out cursor-pointer ">
                    Qualifications
                  </span>
                </Link>
                <span className="text-emerald-600">
                  <MdOutlineNavigateNext />
                </span>
                <span className="inline-block text-dark-gray font-semibold align-middle">
                  {data.title}
                </span>
              </div>
              <p className="mt-3 text-charcoal mb-3">
                At RPL FAST TRACK, we turn your real-world experience into
                formal qualifications. Our streamlined RPL assessment process
                covers {data.title} and more, making it easy to convert your
                skills into recognized credentials. With dedicated support from
                assessment to certification, we help you unlock new career and
                educational opportunities with confidence.
              </p>
            </div>

            <div className="relative w-full mb-8 md:mb-0 rounded-md overflow-hidden shadow-md h-auto">
              <Image
                src={data.imageCoverLink}
                alt={data.title}
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
