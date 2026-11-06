import { RichText } from "@/components/rich-text/rich-text";
import { Accent, SectionHeading } from "@/components/sections/section-heading";

/** The long-form intro written for the industry (admin panel), in a clean reading card. */
export default function SectionIntro({ title, html }: { title: string; html: string }) {
  return (
    <section className="relative overflow-hidden bg-surface py-14 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--brand-subtle)_1.5px,transparent_1.5px)] mask-[radial-gradient(ellipse_at_top_left,black_15%,transparent_60%)] bg-size-[24px_24px]"
      />
      <div className="relative container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="About this industry"
            title={
              <>
                RPL for <Accent>{title}</Accent>
              </>
            }
          />
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
            <RichText html={html} />
          </div>
        </div>
      </div>
    </section>
  );
}
