import { z } from "zod";

// Shared by the admin editors (react-hook-form) and the Server Actions.
// Rich text fields hold HTML; the action sanitises them before saving.

export const slugSchema = z
  .string()
  .min(1, "URL slug is required")
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and single hyphens only");

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const richText = z.string();

export const faqSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(300),
  answer: richText.refine((html) => html.replace(/<[^>]*>/g, "").trim().length > 0, {
    message: "Answer is required",
  }),
});

const imageFields = {
  imageSquareLink: z.string(),
  imageSquarePublicId: z.string(),
  imageCoverLink: z.string(),
  imageCoverPublicId: z.string(),
  imageAlt: z.string().trim().max(200),
};

const seoFields = {
  metaTitle: z.string().trim().min(1, "Meta title is required").max(120),
  metaDescription: z.string().trim().min(1, "Meta description is required").max(320),
};

export const courseEditorSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(200),
    code: z.string().trim().max(20),
    sectionId: z.string().min(1, "Choose a section"),
    link: slugSchema,
    index: z.number().int().min(1),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    qualificationStatus: z.enum(["CURRENT", "SUPERSEDED"]),
    replacedById: z.string().nullable(),
    isPopular: z.boolean(),
    ...imageFields,

    heroIntro: richText,
    whoIsItFor: richText,
    evidenceExamples: richText,
    licensingInfo: richText,
    description: richText,
    jobOpportunity: richText,
    entryRequirement: richText,
    packagingRule: richText,
    coreUnits: richText,
    electiveUnits: richText,
    duration: z.string().trim().max(60),
    deliveryMode: z.string().trim().max(120),

    ...seoFields,
    searchAliases: z.array(z.string().trim().min(1).max(80)).max(20),
    faqs: z.array(faqSchema).max(30),
  })
  .superRefine((data, ctx) => {
    if (data.status !== "PUBLISHED") return;
    // A published page needs the pieces the template can't do without
    const required: [keyof typeof data, string][] = [
      ["imageCoverLink", "A cover image is required to publish"],
      ["imageSquareLink", "A square image is required to publish"],
      ["description", "A description is required to publish"],
    ];
    for (const [field, message] of required) {
      if (!String(data[field] ?? "").trim())
        ctx.addIssue({ code: "custom", path: [field], message });
    }
  });

export type CourseEditorValues = z.infer<typeof courseEditorSchema>;

export const sectionEditorSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  link: slugSchema,
  index: z.number().int().min(1),
  ...imageFields,
  intro: richText,
  ...seoFields,
  faqs: z.array(faqSchema).max(30),
});

export type SectionEditorValues = z.infer<typeof sectionEditorSchema>;

export const redirectSchema = z.object({
  // Only course and section pages look up redirects on a 404
  fromPath: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^\/(courses|section)\/[a-z0-9-]+$/, "An old /courses/… or /section/… path"),
  toPath: z
    .string()
    .trim()
    .regex(/^\/[^\s]*$/, "A path starting with /"),
});
