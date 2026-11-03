import { Award, Briefcase, Clock, DollarSign, GraduationCap, Smile } from "lucide-react";

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
    <section className="w-full bg-[#F5F7FA] py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose <span className="text-emerald-600">RPL</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Benefits of Recognition of Prior Learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-xl border border-emerald-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-50">
                {benefit.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-emerald-800">{benefit.title}</h3>
              <p className="text-emerald-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
