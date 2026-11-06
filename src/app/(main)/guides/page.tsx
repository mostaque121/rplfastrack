import { BadgeCheck, BookOpenText } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { SITE_URL } from "@/config/site";
import { GuideCard } from "@/features/guides/components/guide-card";
import { listGuides } from "@/features/guides/queries";
import { absoluteUrl } from "@/lib/url";

import type { Metadata } from "next";
import type { BreadcrumbList, CollectionPage, WithContext } from "schema-dts";

const description =
  "Plain-English guides to Recognition of Prior Learning in Australia: what RPL is, how the process works, the evidence you need, licensing for trades, and how RPL compares with TAFE and apprenticeships.";

export const metadata: Metadata = {
  title: "RPL Guides: How Recognition of Prior Learning Works",
  description,
  alternates: { canonical: absoluteUrl("/guides") },
  openGraph: {
    title: "RPL Guides | RPL Fast Track",
    description,
    url: absoluteUrl("/guides"),
    type: "website",
  },
};

export default async function GuidesPage() {
  const guides = await listGuides();
  const [featured, ...rest] = guides;

  const collectionSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RPL Guides",
    url: absoluteUrl("/guides"),
    description,
    hasPart: guides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      url: absoluteUrl(`/guides/${guide.slug}`),
    })),
  };
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
    ],
  };

  return (
    <div>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        title="RPL guides"
        eyebrow="Learn before you apply"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        intro={
          <p>
            Straight answers about Recognition of Prior Learning: how it works, what it takes and
            which qualification fits your experience. Written by our RPL consultants, updated
            regularly.
          </p>
        }
        chips={["Plain English", "Australia-wide", "No jargon"]}
      />

      <section className="bg-surface py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          {guides.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <BookOpenText aria-hidden className="mx-auto size-10 text-brand" />
              <p className="mt-4 text-lg font-semibold text-ink">Guides are on their way.</p>
            </div>
          ) : (
            <>
              <SectionHeading
                eyebrow={`${guides.length} guides`}
                title={
                  <>
                    Start with the <Accent>basics</Accent>
                  </>
                }
                description="New to RPL? Read the first guide, then pick the topic that matches your situation."
              />
              <div className="mt-10">
                <GuideCard guide={featured} featured />
              </div>
              {rest.length > 0 && (
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((guide) => (
                    <li key={guide.id}>
                      <GuideCard guide={guide} />
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-gray-600">
                <BadgeCheck aria-hidden className="size-4 text-brand" />
                Qualifications are assessed and issued by registered training organisations (RTOs).
              </p>
            </>
          )}
        </div>
      </section>

      <ClosingCta tone="white" />
    </div>
  );
}
