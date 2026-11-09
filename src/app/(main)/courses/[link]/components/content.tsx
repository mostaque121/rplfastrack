import {
  BadgeCheck,
  BookOpen,
  BookOpenText,
  Clock,
  FileCheck,
  Hash,
  Info,
  Laptop,
  Layers,
  ListChecks,
  Shapes,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { LucideIcon as IndustryIcon } from "@/components/icon/lucide-icon";
import { RichText } from "@/components/rich-text/rich-text";
import { EligibilityCtaCard } from "@/components/sections/eligibility-cta-card";

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
    /** Missing on course entries cached before guides existed. */
    guides?: { guide: { title: string; slug: string } }[];
  };
}

const hasText = (html?: string | null) => !!html?.replace(/<[^>]*>/g, "").trim();

/**
 * Qualification page body. Every block is in the HTML (no tabs), so Google sees all of it.
 * Layout: a quick-facts strip, then the content on the left and a sticky "On this page" +
 * call-to-action panel on the right.
 */
export default function QualificationContent({ data }: QualificationProps) {
  const facts = [
    data.code && { icon: <Hash />, label: "National code", value: data.code },
    {
      icon: data.section.icon ? <IndustryIcon name={data.section.icon} /> : <Shapes />,
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
      value: data.deliveryMode || "Recognition of Prior Learning (RPL) Assessment",
    },
    {
      icon: <BadgeCheck />,
      label: "Issued by",
      value: "A registered training organisation (RTO)",
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: React.ReactNode }[];

  const blocks: { id: string; title: string; icon: LucideIcon; html: string }[] = [
    {
      id: "who-is-it-for",
      title: "Who this qualification is for",
      icon: Users,
      html: data.whoIsItFor ?? "",
    },
    {
      id: "evidence",
      title: "Evidence you'll need",
      icon: FileCheck,
      html: data.evidenceExamples ?? "",
    },
    { id: "licensing", title: "Licensing", icon: ShieldCheck, html: data.licensingInfo ?? "" },
    {
      id: "description",
      title: "Qualification description",
      icon: BookOpen,
      html: data.description,
    },
    { id: "careers", title: "Career outcomes", icon: TrendingUp, html: data.jobOpportunity },
    { id: "entry", title: "Entry requirements", icon: ListChecks, html: data.entryRequirement },
    { id: "packaging", title: "Packaging rules", icon: Layers, html: data.packagingRule },
  ].filter((block) => hasText(block.html));

  const showUnits = hasText(data.coreUnits) || hasText(data.electiveUnits);
  const toc = [
    ...blocks.map(({ id, title }) => ({ id, title })),
    ...(showUnits ? [{ id: "units", title: "Units" }] : []),
  ];

  const replacement =
    data.qualificationStatus === "SUPERSEDED" && data.replacedBy?.status === "PUBLISHED"
      ? data.replacedBy
      : null;

  return (
    <section className="bg-white py-12 [overflow-anchor:none] md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        {data.qualificationStatus === "SUPERSEDED" && (
          <div className="mb-8 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
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

        {/* Quick facts */}
        <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-brand-soft to-white p-5 shadow-sm md:p-6">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-brand uppercase">
            Quick facts
          </h2>
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
            {facts.map((fact) => (
              // A <div> inside <dl> may hold only <dt>/<dd>, so the icon lives in the <dt> and is
              // positioned beside both lines.
              <div key={fact.label} className="relative min-h-10 pl-13">
                <dt className="text-sm text-gray-600">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm [&_svg]:size-5"
                  >
                    {fact.icon}
                  </span>
                  {fact.label}
                </dt>
                <dd className="font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="min-w-0 divide-y divide-gray-200">
            {blocks.map(({ id, title, icon: Icon, html }) => (
              <article key={id} id={id} className="scroll-mt-24 py-8 first:pt-0">
                <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-ink md:text-3xl">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  {title}
                </h2>
                <RichText html={html} />
              </article>
            ))}

            {showUnits && (
              <article id="units" className="scroll-mt-24 py-8 first:pt-0">
                <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-ink md:text-3xl">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                    <Layers aria-hidden className="size-5" />
                  </span>
                  Units
                </h2>
                <Units coreUnits={data.coreUnits} electiveUnits={data.electiveUnits} />
              </article>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {toc.length > 1 && (
              <nav
                aria-label="On this page"
                className="hidden rounded-2xl border border-gray-200 bg-surface p-5 lg:block"
              >
                <p className="text-sm font-semibold tracking-wider text-brand uppercase">
                  On this page
                </p>
                <ol className="mt-3 space-y-1">
                  {toc.map(({ id, title }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-brand"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <EligibilityCtaCard
              heading={`See if your experience qualifies for ${data.code ?? "this qualification"}`}
            />

            {(data.guides?.length ?? 0) > 0 && (
              <nav
                aria-label="Related guides"
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <p className="text-sm font-semibold tracking-wider text-brand uppercase">
                  Helpful guides
                </p>
                <ul className="mt-3 space-y-3">
                  {data.guides?.map(({ guide }) => (
                    <li key={guide.slug}>
                      <Link
                        prefetch={false}
                        href={`/guides/${guide.slug}`}
                        className="group flex gap-2 text-sm font-semibold text-ink hover:text-brand-strong"
                      >
                        <BookOpenText aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                        <span className="underline-offset-2 group-hover:underline">
                          {guide.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
