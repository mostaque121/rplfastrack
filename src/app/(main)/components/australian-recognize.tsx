import { Briefcase, CheckCircle, Clock, CreditCard } from "lucide-react";

export default function EmployerRecognition() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
              How Australian Employers Value Your{" "}
              <span className="text-brand"> RPL Qualification</span>
            </h2>
            <p className="mb-6 text-gray-600">
              Your Recognition of Prior Learning qualification is more than just a certificate -
              it&apos;s formal recognition of your skills that Australian employers understand and
              respect.
            </p>
            <div className="flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-brand"></span>
              <span className="h-1 w-24 rounded-full bg-brand-bright"></span>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-brand-strong to-brand-strong p-8 text-white shadow-xl md:w-1/2">
            <h3 className="mb-4 text-xl font-semibold">Key Benefits for Your Career</h3>
            <ul className="space-y-4">
              {[
                "Faster pathway to employment in Australia",
                "Recognition of your international experience",
                "Same qualification as traditional education",
                "Demonstrates your practical skills to employers",
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/20 p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-xl border border-brand-subtle bg-brand-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-full bg-brand-subtle p-3">
                <Briefcase className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Equal Recognition</h3>
            </div>
            <p className="text-gray-600">
              Australian employers treat RPL qualifications the same as traditional qualifications
              because they meet the same national standards.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-bright to-brand" />
          </div>

          <div className="relative overflow-hidden rounded-xl border border-brand-subtle bg-brand-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-full bg-brand-subtle p-3">
                <Clock className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Migration Purposes</h3>
            </div>
            <p className="text-gray-600">
              RPL is ideal for migrants in Australia who have valuable work experience but lack
              formal qualifications. It helps them obtain the certifications required for jobs, visa
              applications, or skills assessments.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-bright to-brand" />
          </div>

          <div className="relative overflow-hidden rounded-xl border border-brand-subtle bg-brand-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-full bg-brand-subtle p-3">
                <CreditCard className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Salary Potential</h3>
            </div>
            <p className="text-gray-600">
              With formal recognition of your skills through RPL, you can negotiate better salary
              packages based on your qualified experience level.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-bright to-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
