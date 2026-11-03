import { Award, BookOpen, Lightbulb } from "lucide-react";

export default function WhatIsRPL() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              <span className="font-bold text-emerald-600">
                Recognition of Prior Learning (RPL)
              </span>{" "}
              is an assessment process that evaluates your existing skills,
              knowledge, and experience gained throughout your life, regardless
              of how or where they were acquired.
            </p>
            <p className="text-lg text-gray-700">
              RPL acknowledges that learning doesn&apos;t only happen in formal
              education settings. Your work experience, volunteer activities,
              community involvement, and self-directed learning all contribute
              to your professional capabilities.
            </p>
            <p className="text-lg text-gray-700">
              Through RPL, you can receive formal recognition for your
              competencies without having to relearn what you already know,
              saving you time and money while advancing your career.
            </p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl shadow-sm p-4 md:p-8">
            <h3 className="text-xl font-bold text-emerald-700 mb-6">
              Key Features of RPL
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Evidence-Based Assessment
                  </h4>
                  <p className="text-gray-700">
                    RPL evaluates evidence of your existing skills against
                    industry or qualification standards
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Nationally Recognized
                  </h4>
                  <p className="text-gray-700">
                    RPL results in formal qualifications that are recognized
                    throughout the country
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Flexible Pathways
                  </h4>
                  <p className="text-gray-700">
                    RPL can provide full qualifications or credits toward
                    further education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
