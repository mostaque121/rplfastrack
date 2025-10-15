import { z } from "zod";

export const responseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number is required"),
  message: z.string().optional(),
  interest: z.string(),
});

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
  industry: z.string().optional(),
  qualification: z.string().optional(),
});

export const reviewFormSchema = z.object({
  userName: z.string().min(1, { message: "Name is required." }),
  userImage: z.string().min(1, { message: "Profile image is required." }),
  purchasedCourse: z
    .string()
    .min(1, { message: "Please select a valid course." }),
  reviewText: z.string().min(1, { message: "Review text is required." }),
  reviewImage: z.string().optional(),
  givenStar: z.number().min(1, { message: "Rating is required." }),
});
