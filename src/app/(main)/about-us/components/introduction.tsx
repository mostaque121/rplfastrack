import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function IntroductionAboutUs() {
  return (
    <section className="overflow-hidden bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/introduction-bg.webp"
                sizes="(min-width: 640px) 600px, 100vw"
                alt="Company office"
                width={600}
                height={500}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="absolute -right-8 -bottom-8 z-0 hidden h-[300px] w-[300px] md:block">
              <div className="absolute h-full w-full rounded-lg bg-gradient-to-r from-brand-strong to-brand opacity-30"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 z-11 hidden -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-6 shadow-xl lg:block">
              <div className="text-center">
                <span className="block text-4xl font-bold text-brand">5+</span>
                <span className="text-sm font-medium text-gray-600">Years of Experience</span>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="mb-4">
              <span className="text-sm font-semibold tracking-wider text-brand uppercase">
                About RPL Fast Track
              </span>
            </div>
            <h2 className="mb-6 text-3xl leading-tight font-bold md:text-4xl">
              We Are The Leader In The{" "}
              <span className="text-brand">Recognition of Prior Learning (RPL)</span>
            </h2>
            <p className="mb-8 text-gray-600">
              At RPL Fast Track, we help individuals gain formal qualifications by recognising their
              existing skills, experience, and knowledge—no classroom required. Whether you&apos;re
              advancing your career or migrating to Australia, we simplify the process of turning
              your experience into nationally recognised certifications
            </p>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Experienced Assessors</h4>
                  <p className="text-sm text-gray-600">
                    Our certified professionals ensure your skills meet industry standards
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Personalised RPL Plans</h4>
                  <p className="text-sm text-gray-600">
                    We create a custom plan based on your experience and career goals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Fast & Reliable</h4>
                  <p className="text-sm text-gray-600">
                    Quick processing with no shortcuts on quality or compliance
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Always Up-to-Date</h4>
                  <p className="text-sm text-gray-600">
                    We follow the latest rules and training updates in your field
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link prefetch={false} href="/contact">
                <Button size="lg" className="group bg-gradient-to-r from-brand to-brand-strong">
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
