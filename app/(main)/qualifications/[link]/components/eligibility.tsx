import { EligibilityForm } from "@/components/eligibility-form";
import {
  Award,
  Briefcase,
  Globe,
  GraduationCap,
  Lightbulb,
  Users,
} from "lucide-react";

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
    <section className="w-full py-16 bg-[#F5F7FA] md:py-24">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Who Can <span className="text-emerald-600">Apply</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              You&apos;re eligible for RPL if you have any of them
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eligibilityCriteria.map((criteria, index) => (
            <div
              key={index}
              className="flex items-start relative overflow-hidden gap-4 p-5 rounded-lg bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  {criteria.icon}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-lg">
                  {criteria.title}
                </h4>
                <p className="text-emerald-600">{criteria.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-500" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-emerald-700 mb-6 max-w-2xl mx-auto">
            Not sure if your experience qualifies? Our RPL specialists can help
            assess your individual situation and guide you through the process.
          </p>

          <EligibilityForm
            trigger={
              <button className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg">
                Check Your Eligibility
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
