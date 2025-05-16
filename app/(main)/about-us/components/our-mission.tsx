import { BookOpen, Target, Users } from "lucide-react";

export default function OurMission() {
  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]   overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our <span className="text-emerald-600">Mission</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              To recognise real-world skills and experience, helping individuals
              gain formal qualifications that unlock career and education
              opportunities.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white pt-6 px-6 pb-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white mx-auto">
                <Target className="h-6 w-6" />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Our Vision
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  To create a world where experience is valued equally with
                  formal education, and where everyone has the opportunity to
                  have their skills recognized.
                </p>
              </div>
            </div>

            <div className="bg-white pt-6 px-6 pb-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg font-medium text-gray-900">Our Team</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our assessors are industry experts with extensive experience
                  in their fields, ensuring that your skills are evaluated by
                  professionals who understand your industry.
                </p>
              </div>
            </div>

            <div className="bg-white pt-6 px-6 pb-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white mx-auto">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Our Approach
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  We take a personalized approach to each assessment, working
                  closely with you to identify and document your skills and
                  knowledge in a way that meets national standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
