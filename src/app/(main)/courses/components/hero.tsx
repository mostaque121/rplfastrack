import { ArrowRight } from "lucide-react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { listSections } from "@/features/courses/queries";

/** Courses hub hero: short, dark, with live counts so the numbers never go stale. */
export default async function HeroSection() {
  const sections = await listSections();
  const courseCount = sections.reduce(
    (total, section) => total + (section.courses?.length ?? 0),
    0,
  );

  return (
    <PageHero
      title={
        <>
          RPL qualifications in Australia, <span className="text-brand-bright">by industry</span>
        </>
      }
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
      intro={
        <p>
          Browse {courseCount} nationally recognised qualifications across {sections.length}{" "}
          industries that you can get through Recognition of Prior Learning (RPL). Pick your
          industry, find your qualification and check your eligibility for free.
        </p>
      }
      chips={["Nationally recognised", "100% online assessment", "Free eligibility check"]}
      actions={
        <EligibilityForm
          trigger={
            <Button
              size="lg"
              className="group h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
            >
              Check your eligibility
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          }
          title="RPL Eligibility Assessment"
          description="Find out if you qualify for our RPL program in just a few minutes."
        />
      }
    />
  );
}
