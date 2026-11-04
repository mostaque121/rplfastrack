import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AboutRpl() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          {/* Text Content - Now on the left */}
          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider text-brand uppercase">
              Recognition of Prior Learning
            </span>

            <h2 className="mb-6 text-3xl leading-tight font-bold md:text-4xl">
              Turn Your Experience Into Recognized{" "}
              <span className="text-brand">Qualifications</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Recognition of Prior Learning (RPL) is a formal assessment process that evaluates
                your existing skills, knowledge, and experience gained through work, life, or
                informal training to award you with nationally recognized qualifications without
                unnecessary retraining.
              </p>

              <h3 className="mt-6 mb-3 text-xl font-semibold text-foreground">
                Key Benefits of RPL
              </h3>

              <ul className="space-y-3">
                {[
                  "Save time and money by avoiding relearning what you already know",
                  "Gain formal recognition for skills acquired through work experience",
                  "Increase your employability and earning potential",
                  "Fast-track your career progression with recognized qualifications",
                  "Identify skill gaps to focus your professional development",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-brand" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link prefetch={false} href="/about-rpl">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-brand to-brand-strong text-white"
                  >
                    Discover How RPL Works
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Collage - Now on the right */}
          <div className="relative">
            {/* Image Collage Grid */}
            <div className="relative grid h-[500px] grid-cols-6 grid-rows-6 gap-3">
              {/* Large Main Image */}
              <div className="relative col-span-4 row-span-4 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/recognition.webp"
                  sizes="(min-width: 768px) 33vw, 67vw"
                  width={500}
                  height={400}
                  alt="Professional receiving qualification"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="text-white">
                    <h4 className="text-lg font-bold">Formal Recognition</h4>
                    <p className="text-sm">Convert experience into qualifications</p>
                  </div>
                </div>
              </div>

              {/* Top Right Image */}
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/success.webp"
                  sizes="(min-width: 768px) 17vw, 33vw"
                  width={200}
                  height={200}
                  alt="Career advancement"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white">
                    <h4 className="text-sm font-bold">Career Growth</h4>
                  </div>
                </div>
              </div>

              {/* Bottom Right Image */}
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/time.webp"
                  sizes="(min-width: 768px) 17vw, 33vw"
                  width={200}
                  height={200}
                  alt="Time saving"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white">
                    <h4 className="text-sm font-bold">Save Time</h4>
                  </div>
                </div>
              </div>

              {/* Bottom Left Image */}
              <div className="relative col-span-3 row-span-2 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/industry.webp"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  width={300}
                  height={200}
                  alt="Industry recognition"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white">
                    <h4 className="text-sm font-bold">Industry Recognition</h4>
                    <p className="text-xs">Nationally accredited qualifications</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Box */}
              <div className="b col-span-3 row-span-2 flex flex-col justify-center rounded-xl bg-gradient-to-br from-brand to-brand-strong p-4 shadow-lg">
                <p className="text-xs text-white italic md:text-sm">
                  RPL transformed my 12 years of experience into a formal qualification, opening
                  doors I never thought possible.
                </p>
                <p className="mt-2 text-xs font-semibold text-gray-50">
                  — Michael Chen, RPL Graduate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
