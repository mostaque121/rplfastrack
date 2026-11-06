import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { listSections } from "@/features/courses/queries";

import IndustryShowcaseCard from "./card/industry-showcase-card";

/**
 * Industry hub on the home page. Links to the section pages and the top qualifications in each,
 * which is the internal linking the content strategy asks for.
 */
export default async function ClientsFavourite() {
  const sections = await listSections();

  return (
    <section className="bg-surface py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Popular qualifications"
          title={
            <>
              RPL qualifications in Australia, <Accent>by industry</Accent>
            </>
          }
          description="Pick your industry to see the qualifications you can get through RPL. All are nationally recognised and assessed 100% online."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {sections.slice(0, 6).map((section) => (
            <IndustryShowcaseCard key={section.id} section={section} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-brand px-6 text-base hover:bg-brand-strong"
          >
            <Link prefetch={false} href="/courses">
              View all qualifications
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <EligibilityForm
            trigger={
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-brand bg-white px-6 text-base text-brand hover:bg-brand-soft hover:text-brand-strong"
              >
                Not sure? Check eligibility
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
