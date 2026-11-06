import { z } from "zod";

import { faqSchema, slugSchema } from "@/features/courses/schema";

// Shared by the guide editor (react-hook-form) and the Server Action.
// `body` and FAQ answers hold HTML; the action sanitises them before saving.

const hasText = (html: string) => html.replace(/<[^>]*>/g, "").trim().length > 0;

export const guideEditorSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(200),
    slug: slugSchema,
    status: z.enum(["DRAFT", "PUBLISHED"]),
    index: z.number().int().min(1),
    excerpt: z.string().trim().min(1, "A short summary is required").max(320),
    body: z.string(),
    imageLink: z.string().trim(),
    imageAlt: z.string().trim().max(200),
    metaTitle: z.string().trim().min(1, "Meta title is required").max(120),
    metaDescription: z.string().trim().min(1, "Meta description is required").max(320),
    courseIds: z.array(z.string()).max(9, "Link at most 9 qualifications"),
    faqs: z.array(faqSchema).max(20),
  })
  .superRefine((data, ctx) => {
    if (data.status === "PUBLISHED" && !hasText(data.body)) {
      ctx.addIssue({
        code: "custom",
        path: ["body"],
        message: "Write the article before publishing",
      });
    }
  });

export type GuideEditorValues = z.infer<typeof guideEditorSchema>;
