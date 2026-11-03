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
export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type LoginFormData = z.infer<typeof signInSchema>;
