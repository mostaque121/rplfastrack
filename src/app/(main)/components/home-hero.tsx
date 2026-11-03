import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";

import { ResponseForm } from "./form/response-form";

export default function HomeHero() {
  return (
    <div className="relative py-16">
      {/* Background Image */}
      <Image
        src="/home-hero.webp"
        sizes="100vw"
        alt="Background Image"
        fill
        quality={75}
        priority
        className="z-[-1] object-cover object-left"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900 opacity-70"></div>

      <div className="relative container mx-auto flex h-full w-full flex-col justify-between gap-10 px-4 py-5 md:flex-row md:items-center md:px-8">
        <div className="max-w-4xl">
          <span className="mb-4 text-2xl font-semibold text-emerald-400 md:text-3xl">
            Welcome to RPL Fast Track
          </span>
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl">
            Accelerate your skills recognition
          </h1>
          <p className="mb-2 text-base text-muted md:text-xl">
            Unlock the value of your real-world experience and earn a nationally recognised
            qualification —
            <span className="font-medium">no classrooms, no exams, no extra study required</span>.
          </p>
          <p className="mb-6 text-xl text-muted">
            Our simple and proven process helps you get certified quickly and confidently — saving
            you time, money, and effort.
          </p>

          <EligibilityForm
            trigger={
              <Button size="lg" className="group bg-emerald-600 text-white hover:bg-emerald-700">
                Check Your Eligibility
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            }
            title="RPL Eligibility Assessment"
            description="Find out if you qualify for our RPL program in just a few minutes."
          />
        </div>

        {/* Response Form */}
        <div className="items-center">
          <ResponseForm />
        </div>
      </div>
    </div>
  );
}
