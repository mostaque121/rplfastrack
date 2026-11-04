import { BadgeCheck, Clock, Hash, Info, Laptop, Shapes } from "lucide-react";
import Link from "next/link";

import { LucideIcon } from "@/components/icon/lucide-icon";
import { RichText } from "@/components/rich-text/rich-text";

import Units from "./units";

interface QualificationProps {
  data: {
    title: string;
    code?: string | null;
    duration?: string | null;
    deliveryMode?: string | null;
    whoIsItFor?: string | null;
    evidenceExamples?: string | null;
    licensingInfo?: string | null;
    description: string;
    packagingRule: string;
    electiveUnits: string;
    coreUnits: string;
    entryRequirement: string;
    jobOpportunity: string;
    qualificationStatus: "CURRENT" | "SUPERSEDED";
    replacedBy?: { title: string; link: string; status: string } | null;
    section: { title: string; link: string; icon?: string | null };
  };
}

// Every block is in the HTML (no tabs), so Google sees all of it.
function Block({ title, html }: { title: string; html?: string | null }) {
  if (!html?.replace(/<[^>]*>/g, "").trim()) return null;
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-emerald-700 md:text-3xl">{title}</h2>
      <RichText html={html} />
    </div>
  );
}

export default function QualificationContent({ data }: QualificationProps) {
  const facts = [
    data.code && { icon: <Hash />, label: "National code", value: data.code },
    {
      icon: data.section.icon ? <LucideIcon name={data.section.icon} /> : <Shapes />,
      label: "Industry",
      value: (
        <Link
          prefetch={false}
          href={`/section/${data.section.link}`}
          className="underline-offset-2 hover:underline"
        >
          {data.section.title}
        </Link>
      ),
    },
    data.duration && { icon: <Clock />, label: "Typical duration", value: data.duration },
    {
      icon: <Laptop />,
      label: "Delivery",
      value: data.deliveryMode || "Online assessment, Australia-wide",
    },
    {
      icon: <BadgeCheck />,
      label: "Issued by",
      value: "A registered training organisation (RTO)",
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: React.ReactNode }[];

  const replacement =
    data.qualificationStatus === "SUPERSEDED" && data.replacedBy?.status === "PUBLISHED"
      ? data.replacedBy
      : null;

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container mx-auto max-w-3xl space-y-12 px-4 md:px-8">
        {data.qualificationStatus === "SUPERSEDED" && (
          <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p>
              This qualification has been superseded.
              {replacement && (
                <>
                  {" "}
                  The current version is{" "}
                  <Link
                    prefetch={false}
                    href={`/courses/${replacement.link}`}
                    className="font-semibold underline"
                  >
                    {replacement.title}
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-[#F5F7FA] p-5 md:p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Quick facts</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white [&_svg]:size-5">
                  {fact.icon}
                </span>
                <div>
                  <dt className="text-sm text-gray-600">{fact.label}</dt>
                  <dd className="font-semibold text-gray-900">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <Block title="Who this qualification is for" html={data.whoIsItFor} />
        <Block title="Evidence you'll need" html={data.evidenceExamples} />
        <Block title="Licensing" html={data.licensingInfo} />
        <Block title="Qualification description" html={data.description} />
        <Block title="Career outcomes" html={data.jobOpportunity} />
        <Block title="Entry requirements" html={data.entryRequirement} />
        <Block title="Packaging rules" html={data.packagingRule} />

        <div>
          <h2 className="mb-4 text-2xl font-bold text-emerald-700 md:text-3xl">Units</h2>
          <Units coreUnits={data.coreUnits} electiveUnits={data.electiveUnits} />
        </div>
      </div>
    </section>
  );
}
