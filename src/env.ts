import "server-only";
import { z } from "zod";

const required = z.string().min(1);
const blankAsUnset = (v: unknown) => (v === "" ? undefined : v);

export const env = z
  .object({
    DATABASE_URL: required,

    // Admin sign-in (better-auth reads BETTER_AUTH_SECRET itself)
    GOOGLE_CLIENT_ID: required,
    GOOGLE_CLIENT_SECRET: required,
    UPSTASH_REDIS_REST_URL: z.url(),
    UPSTASH_REDIS_REST_TOKEN: required,

    // Brevo email
    SENDINBLUE_API_KEY: required,
    SENDER_EMAIL: z.email(),
    RECEIVER_EMAIL: z.email(),
    ADMIN_SENDER_EMAIL: z.email(),

    // Cloudinary (the cloud name is public: siteConfig.cloudinaryCloudName)
    CLOUDINARY_API_KEY: required,
    CLOUDINARY_API_SECRET: required,

    // GA4 Data API service account
    GA4_PROPERTY_ID: required,
    GOOGLE_CLIENT_EMAIL: z.email(),
    GOOGLE_PRIVATE_KEY: required.transform((key) => key.replace(/\\n/g, "\n")),
    GOOGLE_PROJECT_ID: required,

    // Set by Vercel; GA only loads on "production"
    VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),

    // Optional: lead sync is skipped when unset
    CRM_INTAKE_URL: z.preprocess(blankAsUnset, z.url().optional()),
    CRM_INTAKE_KEY: z.preprocess(blankAsUnset, z.string().optional()),
  })
  .parse(process.env);
