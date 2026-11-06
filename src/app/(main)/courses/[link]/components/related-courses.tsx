import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { QualificationCard } from "@/components/sections/qualification-card";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";

type Qualification = {
  id: string;
  link: string;
  title: string;
  imageUrl: string;
};

const SHOWN_COURSES = 3;

/** Other qualifications in the same industry (never the current one), for internal linking. */
export default function RelatedCourses({
  qualifications,
  industryLink,
  industryTitle,
  currentLink,
  tone = "white",
}: {
  qualifications?: Qualification[];
  industryLink: string;
  industryTitle: string;
  currentLink: string;
  tone?: "white" | "surface";
}) {
  const others = (qualifications ?? []).filter((q) => q.link !== currentLink);
  if (others.length === 0) return null;

  return (
    <section className={`${tone === "white" ? "bg-white" : "bg-surface"} py-14 md:py-24`}>
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Related qualifications"
          title={
            <>
              More <Accent>{industryTitle}</Accent> qualifications
            </>
          }
          description="Looking at a different level or specialisation? These are available through RPL too."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {others.slice(0, SHOWN_COURSES).map((qualification) => (
            <li key={qualification.id}>
              <QualificationCard qualification={qualification} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
          >
            <Link prefetch={false} href={`/section/${industryLink}`}>
              View all {industryTitle} qualifications
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
