import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function IntroductionAboutUs() {
  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]  overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/introduction-bg.jpg"
                alt="Company office"
                width={600}
                height={500}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="absolute -bottom-8 w-[300px] h-[300px] -right-8 z-0 hidden md:block">
              <div className="bg-gradient-to-r to-emerald-500 from-teal-500 h-full w-full absolute opacity-30 rounded-lg"></div>
            </div>
            <div className="absolute top-1/2 z-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-6 shadow-xl hidden lg:block">
              <div className="text-center">
                <span className="block text-4xl font-bold text-emerald-500">
                  5+
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  Years of Experience
                </span>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="mb-4">
              <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">
                About RPL Fast Track
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              We Are The Leader In The{" "}
              <span className="text-emerald-600">
                Recognition of Prior Learning (RPL)
              </span>
            </h2>
            <p className="text-gray-600 mb-8">
              At RPL Fast Track, we help individuals gain formal qualifications
              by recognising their existing skills, experience, and knowledge—no
              classroom required. Whether you&apos;re advancing your career or
              migrating to Australia, we simplify the process of turning your
              experience into nationally recognised certifications
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Experienced Assessors</h4>
                  <p className="text-gray-600 text-sm">
                    Our certified professionals ensure your skills meet industry
                    standards
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Personalised RPL Plans</h4>
                  <p className="text-gray-600 text-sm">
                    We create a custom plan based on your experience and career
                    goals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Fast & Reliable</h4>
                  <p className="text-gray-600 text-sm">
                    Quick processing with no shortcuts on quality or compliance
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Always Up-to-Date</h4>
                  <p className="text-gray-600 text-sm">
                    We follow the latest rules and training updates in your
                    field
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link prefetch={false} href="/contact">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-emerald-500 to-teal-500"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
