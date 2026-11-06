import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Section } from "@/types/shared";

import IndustryShowcaseCard from "../../components/card/industry-showcase-card";

const SHOWN_SECTIONS = 3;

/** Dark band, so it does not blend into the light Reviews section that follows. */
export default function OurIndustry({ industries }: { industries: Section[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-14 md:py-24">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-[35%] bg-white/6 [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden
        className="absolute -right-24 -bottom-24 -z-10 size-96 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Industries we specialise in"
          title={
            <>
              RPL qualifications <Accent tone="dark">by industry</Accent>
            </>
          }
          description="We specialise in RPL for the industries where hands-on experience counts most. Pick yours to see the qualifications your skills could lead to."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {industries.slice(0, SHOWN_SECTIONS).map((section) => (
            <IndustryShowcaseCard key={section.id} section={section} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
          >
            <Link prefetch={false} href="/courses">
              View all industries
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
