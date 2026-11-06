import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import striptags from "striptags";

import { JsonLd } from "@/components/seo/json-ld";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { FaqSection, faqPageSchema } from "@/components/faq/faq-section";
import { RichText } from "@/components/rich-text/rich-text";
import { ClosingCta } from "@/components/sections/closing-cta";
import { EligibilityCtaCard } from "@/components/sections/eligibility-cta-card";
import { PageHero } from "@/components/sections/page-hero";
import { QualificationCard } from "@/components/sections/qualification-card";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { SITE_URL, siteConfig } from "@/config/site";
import { redirectOrNotFound } from "@/features/courses/redirects";
import { GuideCard } from "@/features/guides/components/guide-card";
import { withHeadingIds } from "@/features/guides/headings";
import { getGuideForPage, listGuides, readingMinutes } from "@/features/guides/queries";
import { organizationRef } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

import type { Metadata } from "next";
import type { Article, BreadcrumbList, WithContext } from "schema-dts";

type Props = { params: Promise<{ slug: string }> };
type Tone = "white" | "surface";

const monthYear = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-AU", { month: "long", year: "numeric" });

const bg = (tone: Tone) => (tone === "white" ? "bg-white" : "bg-surface");

export async function generateStaticParams() {
  try {
    const guides = await listGuides();
    return guides.map((guide) => ({ slug: guide.slug }));
  } catch (error) {
    console.error("Failed to list guides:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const guide = await getGuideForPage(slug);
    if (!guide) return {};
    const url = absoluteUrl(`/guides/${guide.slug}`);
    return {
      title: guide.metaTitle,
      description: guide.metaDescription,
      alternates: { canonical: url },
      openGraph: {
        title: guide.metaTitle,
        description: guide.metaDescription,
        url,
        type: "article",
        publishedTime: new Date(guide.publishedAt ?? guide.createdAt).toISOString(),
        modifiedTime: new Date(guide.updatedAt).toISOString(),
        images: guide.imageLink
          ? [{ url: guide.imageLink, width: 1600, height: 900, alt: guide.imageAlt ?? guide.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: guide.metaTitle,
        description: guide.metaDescription,
        images: guide.imageLink ? [guide.imageLink] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideForPage(slug);
  if (!guide) return redirectOrNotFound(`/guides/${slug}`);

  const { html, toc } = withHeadingIds(guide.body);
  const minutes = readingMinutes(guide.body);
  const url = absoluteUrl(`/guides/${guide.slug}`);
  const courses = guide.courses
    .map(({ course }) => ({ ...course, imageUrl: course.imageUrl || course.section.imageUrl }))
    .filter((c) => c.status === "PUBLISHED");
  const others = (await listGuides()).filter((g) => g.slug !== guide.slug).slice(0, 3);
  const hasFaqs = guide.faqs.length > 0;

  const articleSchema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url,
    mainEntityOfPage: url,
    inLanguage: siteConfig.language,
    ...(guide.imageLink && { image: absoluteUrl(guide.imageLink) }),
    datePublished: new Date(guide.publishedAt ?? guide.createdAt).toISOString(),
    dateModified: new Date(guide.updatedAt).toISOString(),
    author: { "@type": "Organization", name: siteConfig.name, url: SITE_URL },
    publisher: organizationRef,
    wordCount: striptags(guide.body).split(/\s+/).filter(Boolean).length,
  };
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  // Light bands alternate white/surface after the white article; each optional band takes
  // the opposite tone of whatever is shown above it.
  const flip = (tone: Tone): Tone => (tone === "white" ? "surface" : "white");
  const coursesTone = flip("white");
  const faqTone = courses.length ? flip(coursesTone) : coursesTone;
  const othersTone = hasFaqs ? flip(faqTone) : faqTone;
  const closingTone = others.length ? flip(othersTone) : othersTone;

  const tocLinks = (className: string) =>
    toc.map(({ id, title }) => (
      <li key={id}>
        <a href={`#${id}`} className={className}>
          {title}
        </a>
      </li>
    ));

  return (
    <div>
      <DraftPreviewBanner path={`/guides/${guide.slug}`} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {hasFaqs && (
        <JsonLd data={faqPageSchema(guide.faqs)} />
      )}

      <PageHero
        title={guide.title}
        eyebrow="RPL guide"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
        intro={<p>{guide.excerpt}</p>}
        actions={
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <CalendarDays aria-hidden className="size-4 text-brand-bright" />
              Updated{" "}
              <time dateTime={new Date(guide.updatedAt).toISOString()}>
                {monthYear(guide.updatedAt)}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden className="size-4 text-brand-bright" />
              {minutes} min read
            </span>
          </p>
        }
      />

      <section className="bg-white py-12 [overflow-anchor:none] md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <article className="min-w-0">
              {guide.imageLink && (
                <div className="mb-10 max-w-3xl">
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-soft shadow-md">
                    <Image
                      src={guide.imageLink}
                      alt={guide.imageAlt ?? ""}
                      fill
                      preload
                      sizes="(min-width: 1024px) 768px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {toc.length > 2 && (
                <details className="mb-10 max-w-3xl rounded-2xl border border-gray-200 bg-surface p-5 lg:hidden">
                  <summary className="cursor-pointer text-sm font-semibold tracking-wider text-brand uppercase">
                    In this guide
                  </summary>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
                    {tocLinks("font-medium text-gray-700 hover:text-brand")}
                  </ol>
                </details>
              )}

              <RichText html={html} className="prose-guide max-w-3xl" />

              <p className="mt-12 max-w-3xl rounded-xl bg-surface px-5 py-4 text-sm text-gray-600">
                This guide is general information, not advice for your situation. Requirements
                change, and the registered training organisation and your state&apos;s regulator
                have the final say. Talk to us for a free eligibility check.
              </p>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              {toc.length > 2 && (
                <nav
                  aria-label="In this guide"
                  className="hidden rounded-2xl border border-gray-200 bg-surface p-5 lg:block"
                >
                  <p className="text-sm font-semibold tracking-wider text-brand uppercase">
                    In this guide
                  </p>
                  <ol className="mt-3 space-y-1">
                    {tocLinks(
                      "block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-brand",
                    )}
                  </ol>
                </nav>
              )}
              <EligibilityCtaCard heading="See which qualification your experience could earn you" />
            </aside>
          </div>
        </div>
      </section>

      {courses.length > 0 && (
        <section className={`${bg(coursesTone)} py-14 md:py-20`}>
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeading
              eyebrow="Qualifications"
              title={
                <>
                  Qualifications in <Accent>this guide</Accent>
                </>
              }
              description="Each page explains who the qualification suits, the evidence you'll need and how the RPL assessment works."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <li key={course.id}>
                  <QualificationCard qualification={course} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FaqSection title="Guide" faqs={guide.faqs} tone={faqTone} />

      {others.length > 0 && (
        <section className={`${bg(othersTone)} py-14 md:py-20`}>
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeading
              eyebrow="Keep reading"
              title={
                <>
                  More <Accent>RPL guides</Accent>
                </>
              }
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <li key={other.id}>
                  <GuideCard guide={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ClosingCta tone={closingTone} />
    </div>
  );
}
