import { z } from "zod";

export const reviewFormSchema = z.object({
  userName: z.string().min(1, { message: "Name is required." }),
  userImage: z.string().optional(),
  purchasedCourse: z
    .string()
    .min(1, { message: "Please select a valid course." }),
  reviewText: z.string().min(1, { message: "Review text is required." }),
  reviewImage: z.string().optional(),
  givenStar: z.number().min(1, { message: "Rating is required." }),
  reviewDate: z.date({
    required_error: "Review date is required.",
  }),
});

// Schema for an individual payment installment
export const paymentPartSchema = z.object({
  id: z.string().uuid().optional(),
  amount: z.number().positive("Amount must be a positive number."),
  paidAt: z.date(),
});

// Base schema for the payment form, used for client-side validation
export const paymentSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required."),
  qualification: z.string().min(1, "Qualification is required."),
  phoneNumber: z.string().min(10, "A valid phone number is required."),
  email: z.string().email("A valid email is required."),
  source: z.string().min(1, "Source is required."),
  collegeName: z.string().min(1, "College name is required."),
  courseFee: z.number().min(0),
  paymentStatus: z.enum(["paid", "installment", "refunded"]),
  collegePayment: z.number().min(0),
  agentCommission: z.number().min(0),
  bankCommission: z.number().min(0),
  enrollmentDate: z.date(),
  additionalNote: z.string().optional(),
  parts: z.array(paymentPartSchema).min(1, "At least one payment is required."),
});

// Schema for creating a new payment (no top-level 'id')
export const createPaymentSchema = paymentSchema.omit({ id: true });

// Schema for updating an existing payment (top-level 'id' is required)
export const updatePaymentSchema = paymentSchema.extend({
  id: z.string().uuid("A valid payment ID is required for updates."),
});

// Export inferred TypeScript types for use across the application
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type CreatePaymentData = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentData = z.infer<typeof updatePaymentSchema>;

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
