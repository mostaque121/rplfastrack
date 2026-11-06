import { Briefcase, FileText, GraduationCap, IdCard } from "lucide-react";

import { Accent, SectionHeading } from "./section-heading";

const DOCUMENTS = [
  {
    icon: IdCard,
    title: "100 points of ID",
    text: "Documents such as your passport, driver licence, Medicare card or visa that add up to 100 points of identification.",
  },
  {
    icon: GraduationCap,
    title: "Education certificates",
    text: "Copies of school, college or training certificates, diplomas, transcripts or qualifications.",
  },
  {
    icon: Briefcase,
    title: "Work experience",
    text: "Details of your past jobs: what you did, where you worked, and the skills you used and learned.",
  },
  {
    icon: FileText,
    title: "Supporting documents",
    text: "Extra items that strengthen your case, like reference letters, payslips, photos or work samples.",
  },
];

/** `tone` sets the band colour, so it never matches the section next to it. */
export function RplDocuments({ tone = "surface" }: { tone?: "white" | "surface" }) {
  return (
    <section className={`relative overflow-hidden ${tone === "white" ? "bg-white" : "bg-surface"} py-14 md:py-24`}>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--brand-subtle)_1.5px,transparent_1.5px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_bottom_right,black_20%,transparent_70%)]"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="What you need"
          title={
            <>
              Documents for your <Accent>RPL application</Accent>
            </>
          }
          description="These are the key items you will gather. We help you work out which ones suit your qualification."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOCUMENTS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-subtle hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-brand to-brand-bright transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                  <Icon aria-hidden className="size-6" />
                </span>
                <span aria-hidden className="text-3xl font-bold text-brand-subtle">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-gray-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
