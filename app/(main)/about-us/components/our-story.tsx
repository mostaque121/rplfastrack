import { Award, Clock } from "lucide-react";
import Image from "next/image";
export default function OurStory() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our <span className="text-emerald-600">Story</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Turning real experience into recognised qualifications and
              brighter futures.
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <p className="mt-3 max-w-3xl text-lg text-gray-700">
              Founded in 2020, RPL Assessments has been at the forefront of
              recognizing and validating the skills and knowledge that
              individuals have acquired through work experience, life
              experience, and informal training.
            </p>
            <p className="mt-3 max-w-3xl text-lg text-gray-700">
              Our team of industry experts and education professionals is
              dedicated to helping people transform their experience into
              nationally recognized qualifications, opening doors to new career
              opportunities and personal growth.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Nationally Recognized
                  </h3>
                  <p className="mt-2 text-base text-gray-700">
                    All our qualifications are nationally recognized and comply
                    with the Australian Qualifications Framework (AQF).
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Fast-Track Your Career
                  </h3>
                  <p className="mt-2 text-base text-gray-700">
                    Our streamlined process helps you gain qualifications in
                    weeks, not years, saving you time and money.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/meeting.jpg"
                alt="Team meeting"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
