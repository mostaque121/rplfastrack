import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";

export default function IntroductionAboutUs() {
  return (
    <section className="overflow-hidden bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/about-us-intro.webp"
                sizes="(min-width: 640px) 600px, 100vw"
                alt="RPL Fast Track consultant reviewing a client's work experience for an RPL application"
                width={1200}
                height={800}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="absolute -right-8 -bottom-8 z-0 hidden h-75 w-75 md:block">
              <div className="absolute h-full w-full rounded-lg bg-linear-to-r from-brand-strong to-brand opacity-30"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 z-11 hidden -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-6 shadow-xl lg:block">
              <div className="text-center">
                <span className="block text-4xl font-bold text-brand">5+</span>
                <span className="text-sm font-medium text-gray-600">Years of Experience</span>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  Australia&apos;s <Accent>Recognition of Prior Learning (RPL)</Accent> specialists
                </>
              }
            />
            <p className="mt-6 mb-8 text-gray-600">
              RPL Fast Track helps experienced workers get the certificate their skills already
              deserve. Through Recognition of Prior Learning, your work experience is assessed
              against national standards and turned into a nationally recognised qualification, from
              Certificate III and IV to Diploma level, with no classroom study. Whether you want to
              advance your career, meet a licensing or employer requirement, or you are a migrant
              with overseas experience, we guide you through every step.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Free Eligibility Check</h4>
                  <p className="text-sm text-gray-600">
                    Find out in minutes which qualification your experience can lead to
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Personalised RPL Pathway</h4>
                  <p className="text-sm text-gray-600">
                    A clear plan matched to your industry, experience and career goals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Help With Your Evidence</h4>
                  <p className="text-sm text-gray-600">
                    We show you what to gather, so your application is complete the first time
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h4 className="mb-1 font-semibold">Nationally Recognised Results</h4>
                  <p className="text-sm text-gray-600">
                    Assessed and issued by a registered training organisation under the AQF
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link prefetch={false} href="/contact">
                <Button size="lg" className="group bg-linear-to-r from-brand to-brand-strong">
                  Talk to an RPL Consultant
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
