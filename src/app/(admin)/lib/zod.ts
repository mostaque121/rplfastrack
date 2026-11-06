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
