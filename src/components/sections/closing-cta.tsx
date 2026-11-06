import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";

/** Closing call to action: a dark rounded card on a light band, so it stays apart from the footer. */
/** `tone` sets the band colour, so it never matches the section next to it. */
export function ClosingCta({ tone = "surface" }: { tone?: "white" | "surface" }) {
  return (
    <section className={`${tone === "white" ? "bg-white" : "bg-surface"} py-14 md:py-20`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center md:px-12 md:py-16">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-brand/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-brand-bright/15 blur-3xl"
          />

          <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-bold tracking-tight text-balance text-white md:text-4xl">
            Ready to turn your experience into a{" "}
            <span className="text-brand-bright">qualification</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Start with a free eligibility check. Our RPL consultants will tell you which
            qualification you could get and guide you through every step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link prefetch={false} href="/contact">
                Talk to our team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
