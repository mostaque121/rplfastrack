import { z } from "zod";

export const bookingSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[0-9\s\-$$$$]+$/, "Please enter a valid phone number"),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
});

export type BookingData = z.infer<typeof bookingSchema>;

export const validateStep = (step: number, data: Partial<BookingData>) => {
  const errors: Record<string, string> = {};

  try {
    switch (step) {
      case 0:
        bookingSchema.pick({ date: true }).parse(data);
        break;
      case 1:
        bookingSchema.pick({ date: true, time: true }).parse(data);
        break;
      case 2:
        bookingSchema.parse(data);
        break;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
    }
  }

  return errors;
};
