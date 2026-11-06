import { ArrowRight, BadgeCheck, Compass, Laptop, PiggyBank, UserCheck, Users } from "lucide-react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: UserCheck,
    title: "Expert RPL Guidance",
    text: "Experienced RPL consultants support you through the whole process, so it feels clear and stress-free.",
  },
  {
    icon: Laptop,
    title: "A Fast, Online Process",
    text: "Apply and complete your assessment online, with no classes, no exams and no travel.",
  },
  {
    icon: PiggyBank,
    title: "Save Time and Study Costs",
    text: "Skip courses that repeat what you already know and get formal recognition for the skills you have.",
  },
  {
    icon: BadgeCheck,
    title: "Nationally Recognised Results",
    text: "Your qualification is assessed and issued by a registered training organisation and recognised across Australia, for jobs, licences and further study.",
  },
  {
    icon: Users,
    title: "Support at Every Step",
    text: "From your free eligibility check to your certificate, our team is on hand to answer your questions.",
  },
  {
    icon: Compass,
    title: "Built Around Your Goals",
    text: "Whether you want a promotion, a licence or a fresh start, we match you to the qualification that fits.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-24">
      {/* Big soft shapes in the corners. */}
      <div
        aria-hidden
        className="absolute top-0 right-0 hidden h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-soft lg:block"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 size-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-subtle/50 blur-2xl"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Why choose us"
              title={
                <>
                  Why choose <Accent>RPL Fast Track</Accent>
                </>
              }
              description="Six reasons skilled workers across Australia choose us for their RPL."
            />
            <EligibilityForm
              trigger={
                <Button
                  size="lg"
                  className="group mt-8 h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
                >
                  Check your eligibility
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              }
              title="RPL Eligibility Assessment"
              description="Find out if you qualify for our RPL program in just a few minutes."
            />
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group flex gap-4 rounded-2xl border border-gray-200 bg-surface p-6 transition-all duration-300 hover:border-brand-subtle hover:bg-white hover:shadow-lg"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-1.5 text-gray-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
