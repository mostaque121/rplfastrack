import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function RplProcess() {
  const steps = [
    {
      number: "01",
      title: "Free Skills Assesment",
      description:
        "   Connect with RPL Fast Track to discuss your career goals, and let us assist you in identifying the qualifications that will enable you to achieve them.",
    },
    {
      number: "02",
      title: "Evidence Collection",
      description:
        "Gather and prepare evidence of your prior learning, work experience, and relevant skills. This includes documents such as qualifications, work samples, employment records, and references.",
    },
    {
      number: "03",
      title: "Review of Evidence",
      description:
        "After you submit your portfolio, one of our affiliated registered training organizations (RTOs) will evaluate it. If the assigned assessor requires more information, they will contact you. If any skill gaps are identified, the RTO may provide a trainer to help you enhance your skills at no cost.",
    },
    {
      number: "04",
      title: "Certification!",
      description:
        "                        RPL Fast Track works with Registered Training Organizations to provide nationally recognized qualifications in Australia. These qualifications are equivalent to those obtained through full-time studies and can also be used for licensing applications.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]  overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              RPL <span className="text-emerald-600">Process</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get recognition for your skills and experience with our simple
              four-step process
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-emerald-100 bg-white p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors" />
              <div className="relative space-y-4">
                <span className="block text-4xl font-bold text-emerald-300">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-slate-700">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-300 to-emerald-600" />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <EligibilityForm
            trigger={
              <Button
                size="lg"
                className=" group bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              >
                Check Your Eligibility
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            }
            title="RPL Eligibility Assessment"
            description="Find out if you qualify for our RPL program in just a few minutes."
          />
        </div>
      </div>
    </section>
  );
}
