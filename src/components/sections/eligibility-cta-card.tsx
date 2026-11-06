import { ArrowRight, Phone } from "lucide-react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/config/contact";

/** Dark sidebar card with the eligibility form and phone number (course and guide pages). */
export function EligibilityCtaCard({ heading }: { heading: string }) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl bg-linear-to-br from-ink via-ink to-brand-deep p-6 text-white">
      <div
        aria-hidden
        className="absolute -top-12 -right-12 -z-10 size-40 rounded-full bg-brand/30 blur-2xl"
      />
      <p className="text-sm font-semibold tracking-wider text-brand-bright uppercase">
        Free eligibility check
      </p>
      <p className="mt-2 text-xl leading-snug font-bold">{heading}</p>
      <EligibilityForm
        trigger={
          <Button
            size="lg"
            className="group mt-5 h-12 w-full bg-cta px-6 text-base text-white hover:bg-cta-strong"
          >
            Check your eligibility
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        }
        title="RPL Eligibility Assessment"
        description="Find out if you qualify for our RPL program in just a few minutes."
      />
      <a
        href={contactInfo.phoneHref}
        className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
      >
        <Phone aria-hidden className="size-4 text-brand-bright" />
        Or call {contactInfo.phone}
      </a>
    </div>
  );
}
