import { Award, Briefcase, Globe, GraduationCap, Lightbulb, Users } from "lucide-react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";

export default function EligibilityForRPLSimple() {
  const eligibilityCriteria = [
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Relevant Work Experience",
      description:
        "You have worked in roles related to your desired qualification, gaining practical skills and knowledge.",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      title: "Previous Training",
      description:
        "You've completed courses, workshops, or in-house training related to your field, even if they didn't result in formal qualifications.",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Volunteer Work",
      description:
        "You've developed skills through unpaid positions, community service, or volunteer activities.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Self-Directed Learning",
      description:
        "You've acquired knowledge through independent study, research, or self-guided practice.",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Life Experience",
      description:
        "You've gained relevant skills through personal projects, hobbies, or life circumstances that apply to your field.",
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Overseas Qualifications or Experience",
      description:
        "You've studied or worked in your field internationally and want your experience recognised in Australia.",
    },
  ];

  return (
    <section className="w-full bg-[#F5F7FA] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Who Can <span className="text-emerald-600">Apply</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              You&apos;re eligible for RPL if you have any of them
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {eligibilityCriteria.map((criteria, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 overflow-hidden rounded-lg bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                  {criteria.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{criteria.title}</h3>
                <p className="text-emerald-600">{criteria.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-500" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-emerald-700">
            Not sure if your experience qualifies? Our RPL specialists can help assess your
            individual situation and guide you through the process.
          </p>

          <EligibilityForm
            trigger={
              <button className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-emerald-700">
                Check Your Eligibility
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
