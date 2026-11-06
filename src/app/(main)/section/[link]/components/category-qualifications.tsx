import { QualificationCard } from "@/components/sections/qualification-card";
import { Accent, SectionHeading } from "@/components/sections/section-heading";

interface Qualification {
  id: string;
  link: string;
  title: string;
  imageUrl: string;
}

interface QualificationsProps {
  industry: string;
  qualifications: Qualification[];
}

/** Grid of every qualification in the industry. Each card is one link to the course page. */
export default function CategoryQualifications({ industry, qualifications }: QualificationsProps) {
  if (qualifications.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-24">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-soft blur-3xl"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow={`${qualifications.length} ${qualifications.length === 1 ? "qualification" : "qualifications"}`}
          title={
            <>
              {industry} <Accent>RPL qualifications</Accent>
            </>
          }
          description="Choose a qualification to see the units, the evidence you need and how to apply. All are nationally recognised and assessed 100% online."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {qualifications.map((qualification) => (
            <li key={qualification.id}>
              <QualificationCard qualification={qualification} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
