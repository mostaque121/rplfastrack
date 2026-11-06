import { ArrowRight, Briefcase, Globe, GraduationCap, Heart, Lightbulb, Users } from "lucide-react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";

import { Accent, SectionHeading } from "./section-heading";

const CRITERIA = [
  {
    icon: Briefcase,
    title: "Relevant work experience",
    text: "You have worked in roles related to the qualification, gaining practical skills and knowledge.",
  },
  {
    icon: GraduationCap,
    title: "Previous training",
    text: "You have done courses, workshops or in-house training, even if they never led to a formal qualification.",
  },
  {
    icon: Users,
    title: "Volunteer work",
    text: "You built skills through unpaid roles, community service or a family business.",
  },
  {
    icon: Lightbulb,
    title: "Self-directed learning",
    text: "You picked up knowledge through independent study, research or hands-on practice.",
  },
  {
    icon: Heart,
    title: "Life experience",
    text: "Personal projects, hobbies or life circumstances gave you skills that apply to your field.",
  },
  {
    icon: Globe,
    title: "Overseas experience",
    text: "You studied or worked in your field overseas and want it recognised in Australia.",
  },
];

/** `tone` sets the band colour, so it never matches the section next to it. */
export function WhoIsEligible({ tone = "surface" }: { tone?: "white" | "surface" }) {
  return (
    <section className={`relative overflow-hidden ${tone === "white" ? "bg-white" : "bg-surface"} py-14 md:py-24`}>
      <div
        aria-hidden
        className="absolute top-0 right-0 hidden h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-subtle/60 lg:block"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Eligibility"
          title={
            <>
              Who is <Accent>eligible for RPL?</Accent>
            </>
          }
          description="There are no formal prerequisites. If any of these apply to you, you may qualify, as long as you can show evidence of your skills."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-brand-subtle hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-subtle text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-gray-600">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-brand-deep p-6 md:flex-row md:items-center md:p-8">
          <div>
            <p className="text-xl font-bold text-white">Not sure if your background qualifies?</p>
            <p className="mt-1 text-brand-subtle">
              Take the free eligibility check. It takes a few minutes and there is no obligation.
            </p>
          </div>
          <EligibilityForm
            trigger={
              <Button
                size="lg"
                className="group h-12 shrink-0 bg-white px-6 text-base text-brand-deep hover:bg-brand-subtle"
              >
                Check your eligibility
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
