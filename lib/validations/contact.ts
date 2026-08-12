import { ContactType, LeadSource, LeadStatus } from "@/app/generated/prisma";
import { z } from "zod";

// FIX: Use z.preprocess to change "" to undefined BEFORE validation runs
const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema);

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Invalid email address"), // Fixed: z.string().email()

  phone: emptyToUndefined(z.string().optional()),

  contactType: z.enum(ContactType),
  source: emptyToUndefined(z.enum(LeadSource).optional()),
  leadStatus: emptyToUndefined(z.enum(LeadStatus).optional()),

  industry: emptyToUndefined(z.string().optional()),
  qualification: emptyToUndefined(z.string().optional()),
  experience: emptyToUndefined(z.string().optional()),
  city: emptyToUndefined(z.string().optional()),
  company: emptyToUndefined(z.string().optional()),
  message: emptyToUndefined(z.string().optional()),

  avatar: emptyToUndefined(z.string().optional()),
  avatarId: emptyToUndefined(z.string().optional()),
  assignedToId: emptyToUndefined(z.string().optional()),

  responseTime: z.coerce.date().optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
