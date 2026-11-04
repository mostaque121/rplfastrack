// The content strategy as a checklist (docs/ADMIN_PLAN.md §3). Pure, so the
// list (server) and the editor (client, live while typing) share it.

export const META_TITLE_RANGE = [30, 60] as const;
export const META_DESCRIPTION_RANGE = [120, 155] as const;
export const MIN_FAQS = 4;

export type CompletenessInput = {
  code?: string | null;
  heroIntro?: string | null;
  whoIsItFor?: string | null;
  evidenceExamples?: string | null;
  description?: string | null;
  duration?: string | null;
  imageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  faqCount: number;
};

const hasText = (html?: string | null) => !!html && html.replace(/<[^>]*>/g, "").trim().length > 0;

const inRange = (text: string | null | undefined, [min, max]: readonly [number, number]) => {
  const length = text?.trim().length ?? 0;
  return length >= min && length <= max;
};

export function courseCompleteness(course: CompletenessInput) {
  const checks = [
    { label: "National code", ok: !!course.code?.trim() },
    { label: "Intro", ok: hasText(course.heroIntro) },
    { label: "Who it's for", ok: hasText(course.whoIsItFor) },
    { label: "Evidence examples", ok: hasText(course.evidenceExamples) },
    { label: "Description", ok: hasText(course.description) },
    { label: `At least ${MIN_FAQS} FAQs`, ok: course.faqCount >= MIN_FAQS },
    {
      label: `Meta title ${META_TITLE_RANGE.join("–")} characters`,
      ok: inRange(course.metaTitle, META_TITLE_RANGE),
    },
    {
      label: `Meta description ${META_DESCRIPTION_RANGE.join("–")} characters`,
      ok: inRange(course.metaDescription, META_DESCRIPTION_RANGE),
    },
    { label: "Image alt text", ok: !!course.imageAlt?.trim() },
    { label: "Duration", ok: !!course.duration?.trim() },
  ];
  return { score: checks.filter((c) => c.ok).length, total: checks.length, checks };
}
