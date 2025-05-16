import { EligibilityForm } from "@/components/eligibility-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ResponseForm } from "./response-form";

export default function HomeHero() {
  return (
    <div className="relative py-16">
      {/* Background Image */}
      <Image
        src="/herobg-2.jpg"
        alt="Background Image"
        fill
        quality={75}
        priority
        className="z-[-1] object-left object-cover "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative container mx-auto flex-col md:flex-row md:items-center flex gap-10 w-full justify-between h-full px-4 md:px-8 py-5">
        <div className="max-w-4xl ">
          <div className="text-emerald-400 text-2xl md:text-3xl font-semibold mb-4">
            Welcome to RPL Fast Track
          </div>
          <h1 className="md:text-6xl text-4xl font-bold text-primary-foreground mb-6">
            Accelerate your skills recognition
          </h1>
          <p className="text-muted text-base md:text-xl mb-2">
            Unlock the value of your real-world experience and earn a nationally
            recognised qualification —
            <span className="font-medium">
              no classrooms, no exams, no extra study required
            </span>
            .
          </p>
          <p className="text-muted text-xl mb-6">
            Our simple and proven process helps you get certified quickly and
            confidently — saving you time, money, and effort.
          </p>

          <EligibilityForm
            trigger={
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Check Your Eligibility
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
