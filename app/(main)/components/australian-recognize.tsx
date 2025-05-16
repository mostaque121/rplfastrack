import { Briefcase, CheckCircle, Clock, CreditCard } from "lucide-react";

export default function EmployerRecognition() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              How Australian Employers Value Your{" "}
              <span className="text-emerald-600"> RPL Qualification</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Your Recognition of Prior Learning qualification is more than just
              a certificate - it&apos;s formal recognition of your skills that
              Australian employers understand and respect.
            </p>
            <div className="flex items-center gap-3">
              <span className="h-1 w-12 bg-emerald-500 rounded-full"></span>
              <span className="h-1 w-24 bg-teal-300 rounded-full"></span>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              Key Benefits for Your Career
            </h3>
            <ul className="space-y-4">
              {[
                "Faster pathway to employment in Australia",
                "Recognition of your international experience",
                "Same qualification as traditional education",
                "Demonstrates your practical skills to employers",
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-white/20 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-emerald-50 relative  transition-all  hover:-translate-y-1 overflow-hidden rounded-xl p-6 border border-emerald-100 hover:shadow-md  duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Equal Recognition
              </h3>
            </div>
            <p className="text-gray-600">
              Australian employers treat RPL qualifications the same as
              traditional qualifications because they meet the same national
              standards.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-300 to-emerald-600" />
          </div>

          <div className="bg-emerald-50  transition-all  hover:-translate-y-1 rounded-xl relative overflow-hidden p-6 border border-emerald-100 hover:shadow-md  duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Migration Purposes
              </h3>
            </div>
            <p className="text-gray-600">
              RPL is ideal for migrants in Australia who have valuable work
              experience but lack formal qualifications. It helps them obtain
              the certifications required for jobs, visa applications, or skills
              assessments.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-300 to-emerald-600" />
          </div>

          <div className="bg-emerald-50 transition-all  hover:-translate-y-1 overflow-hidden relative rounded-xl p-6 border border-emerald-100 hover:shadow-md  duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Salary Potential
              </h3>
            </div>
            <p className="text-gray-600">
              With formal recognition of your skills through RPL, you can
              negotiate better salary packages based on your qualified
              experience level.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-300 to-emerald-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
