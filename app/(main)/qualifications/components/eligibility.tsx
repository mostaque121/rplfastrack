import { EligibilityForm } from "@/components/eligibility-form";
import {
  Award,
  Briefcase,
  Globe,
  GraduationCap,
  Lightbulb,
  Users,
} from "lucide-react";

export default function EligibilityForRPL() {
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Are You Eligible for{" "}
              <span className="text-emerald-500">RPL?</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              RPL recognises your past experience. If any of the following apply
              to you, you might be eligible.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eligibilityCriteria.map((criteria, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-[#F5F7FA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white">
                {criteria.icon}
              </div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {criteria.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {criteria.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-b-lg" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-emerald-700 dark:text-emerald-400 text-lg mb-6 max-w-xl mx-auto">
            Not sure if your background qualifies? Our RPL specialists will
            guide you through a quick and free assessment.
          </p>
          <EligibilityForm
            trigger={
              <button className="inline-block cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md transition duration-300">
                ✅ Check Eligibility in 30 Seconds
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
