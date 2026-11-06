import { ArrowRight } from "lucide-react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { RPL_STEPS } from "@/components/sections/rpl-steps";
import { Button } from "@/components/ui/button";

/** Home "how it works": the shared four steps (same copy as the timeline on other pages) as cards. */
export default function RplProcess() {
  const steps = RPL_STEPS.map((step, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: step.title,
    description: step.long,
  }));

  return (
    <section className="overflow-hidden bg-surface py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="How RPL works"
          title={
            <>
              Get qualified in <Accent>4 simple steps</Accent>
            </>
          }
          description="No classes and no exams. You show what you already know, and we guide you from the first call to your certificate."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative overflow-hidden rounded-lg border border-brand-subtle bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-brand-soft transition-colors group-hover:bg-brand-subtle" />
              <div className="relative space-y-4">
                <span className="block text-4xl font-bold text-brand">{step.number}</span>
                <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-bright to-brand" />
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row sm:justify-center">
          <EligibilityForm
            trigger={
              <Button
                size="lg"
                className="group h-12 w-full bg-cta px-6 text-base text-white hover:bg-cta-strong sm:w-auto"
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
