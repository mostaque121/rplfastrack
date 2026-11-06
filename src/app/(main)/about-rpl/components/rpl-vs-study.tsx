import { Check, Minus } from "lucide-react";

import { Accent, SectionHeading } from "@/components/sections/section-heading";

const ROWS = [
  {
    label: "How you are assessed",
    study: "Classes, assignments and exams",
    rpl: "Your existing skills and evidence",
  },
  {
    label: "What you study",
    study: "The full course, even topics you know",
    rpl: "Only where a skill gap is found",
  },
  {
    label: "Time",
    study: "Months to years",
    rpl: "Often a matter of weeks, depending on your evidence",
  },
  {
    label: "Where",
    study: "Classroom or scheduled classes",
    rpl: "100% online",
  },
  {
    label: "Result",
    study: "A nationally recognised qualification",
    rpl: "The same nationally recognised qualification",
  },
];

/** Comparison table. A real <table> so search engines and screen readers get the structure. */
export default function RplVsStudy() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="RPL vs study"
          title={
            <>
              RPL or studying the course: <Accent>what is the difference?</Accent>
            </>
          }
          description="Both lead to the same kind of qualification. RPL just skips what you already know."
        />

        <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
          <table className="w-full min-w-xl border-collapse text-left">
            <caption className="sr-only">Comparison of RPL and studying the full course</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/4 bg-surface p-4 text-sm font-semibold text-gray-500">
                  &nbsp;
                </th>
                <th scope="col" className="bg-surface p-4 text-base font-bold text-ink">
                  Studying the full course
                </th>
                <th scope="col" className="bg-brand p-4 text-base font-bold text-white">
                  RPL with RPL Fast Track
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-gray-200">
                  <th scope="row" className="bg-surface p-4 text-sm font-semibold text-ink">
                    {row.label}
                  </th>
                  <td className="p-4 text-gray-600">
                    <span className="flex items-start gap-2">
                      <Minus aria-hidden className="mt-1 size-4 shrink-0 text-gray-400" />
                      {row.study}
                    </span>
                  </td>
                  <td className="bg-brand-soft/60 p-4 font-medium text-ink">
                    <span className="flex items-start gap-2">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                      {row.rpl}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
