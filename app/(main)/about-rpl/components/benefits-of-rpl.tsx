import {
  Award,
  Briefcase,
  Clock,
  DollarSign,
  GraduationCap,
  Smile,
} from "lucide-react";

export default function BenefitsOfRPL() {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      title: "Save Time",
      description:
        "Skip unnecessary training for skills you already possess, completing your qualification faster.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
      title: "Save Money",
      description:
        "Reduce education costs by getting credit for existing skills instead of paying for redundant courses.",
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Formal Recognition",
      description:
        "Convert your experience into nationally recognized qualifications that employers value.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-emerald-600" />,
      title: "Career Advancement",
      description:
        "Qualify for promotions, salary increases, and new job opportunities with recognized credentials.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-emerald-600" />,
      title: "Pathway to Further Education",
      description:
        "Use RPL credits as a stepping stone to higher qualifications and specialized training.",
    },
    {
      icon: <Smile className="h-8 w-8 text-emerald-600" />,
      title: "Increased Confidence",
      description:
        "Gain validation of your abilities and boost your professional confidence and self-esteem.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-[#F5F7FA]">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose <span className="text-emerald-600">RPL</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Benefits of Recognition of Prior Learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-emerald-100 hover:shadow-lg transition-shadow"
            >
              <div className="h-14 w-14 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-emerald-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
