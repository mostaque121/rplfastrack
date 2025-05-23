import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutRpl() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content - Now on the left */}
          <div className="space-y-6">
            <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">
              Recognition of Prior Learning
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Turn Your Experience Into Recognized{" "}
              <span className="text-emerald-600">Qualifications</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Recognition of Prior Learning (RPL) is a formal assessment
                process that evaluates your existing skills, knowledge, and
                experience gained through work, life, or informal training to
                award you with nationally recognized qualifications without
                unnecessary retraining.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
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
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link href="/about-rpl">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r text-white from-emerald-600 to-teal-600"
                  >
                    Discover How RPL Works
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Collage - Now on the right */}
          <div className="relative ">
            {/* Image Collage Grid */}
            <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[500px]">
              {/* Large Main Image */}
              <div className="col-span-4 row-span-4 relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/recognition.jpg"
                  width={500}
                  height={400}
                  alt="Professional receiving qualification"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <div className="text-white">
                    <h4 className="font-bold text-lg">Formal Recognition</h4>
                    <p className="text-sm">
                      Convert experience into qualifications
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Right Image */}
              <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/success.jpg"
                  width={200}
                  height={200}
                  alt="Career advancement"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <div className="text-white">
                    <h4 className="font-bold text-sm">Career Growth</h4>
                  </div>
                </div>
              </div>

              {/* Bottom Right Image */}
              <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/time.jpg"
                  width={200}
                  height={200}
                  alt="Time saving"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <div className="text-white">
                    <h4 className="font-bold text-sm">Save Time</h4>
                  </div>
                </div>
              </div>

              {/* Bottom Left Image */}
              <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/industry.jpg"
                  width={300}
                  height={200}
                  alt="Industry recognition"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <div className="text-white">
                    <h4 className="font-bold text-sm">Industry Recognition</h4>
                    <p className="text-xs">
                      Nationally accredited qualifications
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial Box */}
              <div className="col-span-3 row-span-2 b bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-4 flex flex-col justify-center shadow-lg">
                <p className="text-sm text-white italic">
                  RPL transformed my 12 years of experience into a formal
                  qualification, opening doors I never thought possible.
                </p>
                <p className="text-xs text-gray-50 font-semibold mt-2">
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
