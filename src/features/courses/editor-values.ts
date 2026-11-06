import "server-only";

import type { getCourseForEdit, getSectionForEdit } from "./admin-queries";
import type { CourseEditorValues, SectionEditorValues } from "./schema";

type CourseRow = NonNullable<Awaited<ReturnType<typeof getCourseForEdit>>>;
type SectionRow = NonNullable<Awaited<ReturnType<typeof getSectionForEdit>>>;

const faqValues = (faqs: { question: string; answer: string }[]) =>
  faqs.map(({ question, answer }) => ({ question, answer }));

export function toCourseEditorValues(
  course: CourseRow | null,
  defaults: { sectionId: string; index: number },
): CourseEditorValues {
  return {
    title: course?.title ?? "",
    code: course?.code ?? "",
    sectionId: course?.sectionId ?? defaults.sectionId,
    link: course?.link ?? "",
    index: course?.index ?? defaults.index,
    status: course?.status ?? "DRAFT",
    qualificationStatus: course?.qualificationStatus ?? "CURRENT",
    replacedById: course?.replacedById ?? null,
    isPopular: course?.isPopular ?? false,
    imageUrl: course?.imageUrl ?? "",
    imagePublicId: course?.imagePublicId ?? "",
    imageAlt: course?.imageAlt ?? "",
    heroIntro: course?.heroIntro ?? "",
    whoIsItFor: course?.whoIsItFor ?? "",
    evidenceExamples: course?.evidenceExamples ?? "",
    licensingInfo: course?.licensingInfo ?? "",
    description: course?.description ?? "",
    jobOpportunity: course?.jobOpportunity ?? "",
    entryRequirement: course?.entryRequirement ?? "",
    packagingRule: course?.packagingRule ?? "",
    coreUnits: course?.coreUnits ?? "",
    electiveUnits: course?.electiveUnits ?? "",
    duration: course?.duration ?? "",
    deliveryMode: course?.deliveryMode ?? "",
    metaTitle: course?.metaTitle ?? "",
    metaDescription: course?.metaDescription ?? "",
    searchAliases: course?.searchAliases ?? [],
    faqs: faqValues(course?.faqs ?? []),
  };
}

export function toSectionEditorValues(
  section: SectionRow | null,
  defaults: { index: number },
): SectionEditorValues {
  return {
    title: section?.title ?? "",
    link: section?.link ?? "",
    index: section?.index ?? defaults.index,
    imageUrl: section?.imageUrl ?? "",
    imagePublicId: section?.imagePublicId ?? "",
    imageAlt: section?.imageAlt ?? "",
    icon: section?.icon ?? "",
    heroIntro: section?.heroIntro ?? "",
    intro: section?.intro ?? "",
    metaTitle: section?.metaTitle ?? "",
    metaDescription: section?.metaDescription ?? "",
    faqs: faqValues(section?.faqs ?? []),
  };
}
