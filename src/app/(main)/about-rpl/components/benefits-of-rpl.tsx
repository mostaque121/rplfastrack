import { Award, Briefcase, Clock, GraduationCap, Smile, Wallet } from "lucide-react";

import { Accent, SectionHeading } from "@/components/sections/section-heading";

const BENEFITS = [
  {
    icon: Clock,
    title: "Save time",
    text: "Skip training for skills you already have and reach your qualification sooner.",
  },
  {
    icon: Wallet,
    title: "Save on study costs",
    text: "Get credit for existing skills instead of paying for courses that repeat what you know.",
  },
  {
    icon: Award,
    title: "Formal recognition",
    text: "Turn your experience into a nationally recognised qualification employers understand.",
  },
  {
    icon: Briefcase,
    title: "Career advancement",
    text: "Open the door to promotions, better pay and new job opportunities.",
  },
  {
    icon: GraduationCap,
    title: "Pathway to further study",
    text: "Use your qualification as a stepping stone to higher or specialised training.",
  },
  {
    icon: Smile,
    title: "Confidence",
    text: "See your abilities validated and take pride in what you have already achieved.",
  },
];

export default function BenefitsOfRPL() {
  return (
    <section className="relative overflow-hidden bg-surface py-14 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--brand-subtle)_1.5px,transparent_1.5px)] mask-[radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)] bg-size-[24px_24px]"
      />
      <div
        aria-hidden
        className="absolute -right-24 -bottom-24 size-96 rounded-full bg-brand-subtle/60 blur-3xl"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Benefits"
          title={
            <>
              Benefits of <Accent>Recognition of Prior Learning</Accent>
            </>
          }
          description="Why so many skilled workers choose RPL over studying the full course."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-subtle hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute top-3 right-5 text-6xl leading-none font-bold text-brand-soft transition-colors duration-300 select-none group-hover:text-brand-subtle"
              >
                0{i + 1}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-strong text-white shadow-lg shadow-brand/25">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold text-ink">{title}</h3>
              <p className="relative mt-2 text-gray-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
