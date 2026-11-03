import {
  ArrowRight,
  Award,
  ClipboardCheck,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function RplProcessTimeline() {
  const steps = [
    {
      number: "01",
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      title: "Free Skills Assesment",
      description:
        "   Connect with RPL Fast Track to discuss your career goals, and let us assist you in identifying the qualifications that will enable you to achieve them.",
    },
    {
      number: "02",
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Evidence Collection",
      description:
        "Gather and prepare evidence of your prior learning, work experience, and relevant skills. This includes documents such as qualifications, work samples, employment records, and references.",
    },
    {
      number: "03",
      title: "Review of Evidence",
      icon: <ClipboardCheck className="h-10 w-10 text-white" />,
      description:
        "After you submit your portfolio, one of our affiliated registered training organizations (RTOs) will evaluate it. If the assigned assessor requires more information, they will contact you. If any skill gaps are identified, the RTO may provide a trainer to help you enhance your skills at no cost.",
    },
    {
      number: "04",
      title: "Certification!",
      icon: <Award className="h-10 w-10 text-white" />,
      description:
        "                        RPL Fast Track works with Registered Training Organizations to provide nationally recognized qualifications in Australia. These qualifications are equivalent to those obtained through full-time studies and can also be used for licensing applications.",
    },
  ];
  return (
    <section className="w-full bg-[#F5F7FA] py-12 md:py-24  ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              RPL <span className="text-emerald-600">Process</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Four Simple Steps Your Path to Recognition
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl space-y-8 relative">
          {/* Vertical line */}
          <div className="absolute left-16 top-0 bottom-0 w-1 bg-emerald-200 hidden md:block" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr] items-start"
            >
              <div className="flex justify-center md:justify-start">
                <div
                  className={`z-10 flex h-16 w-16 bg-emerald-500 items-center justify-center rounded-full `}
                >
                  {step.icon}
                </div>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-white p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800">
                    {step.title}
                  </h3>
                </div>
                <p className="text-emerald-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="mt-4 flex justify-end">
                    <ArrowRight className="h-5 w-5 text-emerald-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
