import { z } from "zod";

export const reviewFormSchema = z.object({
  userName: z.string().min(1, { message: "Name is required." }),
  userImage: z.string().optional(),
  purchasedCourse: z.string().min(1, { message: "Please select a valid course." }),
  reviewText: z.string().min(1, { message: "Review text is required." }),
  reviewImage: z.string().optional(),
  givenStar: z.number().min(1, { message: "Rating is required." }),
  reviewDate: z.date("Review date is required."),
});

export const sectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metaDescription: z.string().min(1, "Meta Description is required"),
  index: z.number().min(1, "index is required"),
  imageSquareLink: z.string().min(1, "Image link is required"),
  imageSquarePublicId: z.string().min(1, "Image public ID is required"),
  imageCoverLink: z.string().min(1, "Image link is required"),
  imageCoverPublicId: z.string().min(1, "Image public ID is required"),
});
export type SectionFormData = z.infer<typeof sectionSchema>;

export const CourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metaTitle: z.string().min(1, "Meta title is required"),
  metaDescription: z.string().min(1, "Meta Description title is required"),
  index: z.number().min(1, "index is required"),
  imageSquareLink: z.string().min(1, "Image link is required"),
  imageSquarePublicId: z.string().min(1, "Image public ID is required"),
  imageCoverLink: z.string().min(1, "Image link is required"),
  imageCoverPublicId: z.string().min(1, "Image public ID is required"),

  description: z.string().min(10, "Description is required"),
  jobOpportunity: z.string().min(10, "Job Opportunity is required"),
  entryRequirement: z.string().min(10, "Entry Requirement is required"),
  packagingRule: z.string().min(10, "Packaging Rule is required"),
  coreUnits: z.string().min(10, "Core Units is required"),
  electiveUnits: z.string().min(10, "Elective Units is required"),
});

export type CourseFormData = z.infer<typeof CourseSchema>;
