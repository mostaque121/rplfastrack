import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Clock,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";

const WHO_FOR = [
  "You have years of experience but no certificate",
  "You need a qualification for a licence or promotion",
  "You learned on the job, in a family business or overseas",
  "You want to skip the classroom and the exams",
];

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Same qualification",
    text: "Issued by a registered training organisation, exactly like one earned by studying full-time.",
  },
  {
    icon: Clock,
    title: "Much faster",
    text: "You are assessed on skills you already have. No classes, no re-learning.",
  },
  {
    icon: Laptop,
    title: "100% online",
    text: "Upload your evidence and speak to your assessor by phone or video, Australia-wide.",
  },
  {
    icon: Briefcase,
    title: "Open more doors",
    text: "Meet licensing and job requirements and move up to supervisor roles.",
  },
];

/**
 * "What is RPL?" section, directly under the hero. Written answer-first: the opening paragraph
 * is the quotable definition for Google snippets and AI answers.
 */
export default function AboutRpl() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photos */}
          <div className="relative mx-auto w-full max-w-xl pb-10 lg:mx-0">
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-3/4 overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/about-rpl-main.webp"
                  alt="Smiling tradesperson on a construction site holding a certificate"
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 576px) 340px, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4 pt-10">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
                  <Image
                    src="/about-rpl-2.webp"
                    alt="Construction progress on a building site"
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 576px) 220px, 35vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
                  <Image
                    src="/about-rpl-3.webp"
                    alt="Support worker caring for a client at home"
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 576px) 220px, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating proof card */}
            <div className="absolute bottom-0 left-4 flex max-w-[16rem] items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:left-8">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <ShieldCheck aria-hidden className="size-6" />
              </span>
              <div>
                <p className="font-display leading-tight font-bold text-ink">
                  Nationally recognised
                </p>
                <p className="text-sm text-gray-600">Same certificate as full-time study</p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Recognition of Prior Learning"
              title={
                <>
                  What is RPL, and how does it <Accent>work in Australia?</Accent>
                </>
              }
            />

            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong className="font-semibold text-ink">
                  Recognition of Prior Learning (RPL) is a formal assessment that turns the skills
                  and experience you already have into a nationally recognised Australian
                  qualification.
                </strong>{" "}
                Instead of sitting in a classroom, you show an assessor what you can already do.
              </p>
              <p>
                You provide evidence from your work, such as references, payslips, work samples,
                photos of your work and your tickets or first-aid certificates, and talk through
                your experience. If it meets the standard, a registered training organisation issues
                the same certificate or diploma a full-time student would receive. We check your
                eligibility for free and guide you through collecting your evidence.
              </p>
            </div>

            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {WHO_FOR.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
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
              <Link
                prefetch={false}
                href="/about-rpl"
                className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-strong hover:underline"
              >
                How RPL works
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link
                prefetch={false}
                href="/guides/what-is-rpl"
                className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-strong hover:underline"
              >
                Read the RPL guide
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits strip */}
        <ul className="mt-16 grid divide-y divide-white/10 overflow-hidden rounded-2xl bg-ink sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-brand-bright">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-300">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
