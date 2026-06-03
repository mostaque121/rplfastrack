"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendContactNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { prisma } from "@/lib/prisma";
import { contactSchema, responseFormSchema } from "@/lib/zod";
import { after } from "next/server";
import { z } from "zod";

type ResponseFormData = z.infer<typeof responseFormSchema>;
type ContactData = z.infer<typeof contactSchema>;

/* ---------------- UTILITIES ---------------- */

function getFirstAndLastName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return { firstName: "", lastName: "" };

  const [firstName, ...rest] = trimmed.split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

function createConflictReadableEmail(originalEmail: string) {
  const trimmedEmail = originalEmail.trim().toLowerCase();
  const atIndex = trimmedEmail.lastIndexOf("@");

  if (atIndex <= 0 || atIndex === trimmedEmail.length - 1) {
    return `hs409-${Date.now()}@invalid.local`;
  }

  const localPart = trimmedEmail.slice(0, atIndex);
  const domain = trimmedEmail.slice(atIndex + 1);

  const readableLocal = localPart.replace(
    /[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/g,
    "_",
  );

  const marker = `hs409-${Date.now().toString().slice(-6)}`;
  const maxLocalLength = Math.max(1, 64 - marker.length - 1);

  return `${readableLocal.slice(0, maxLocalLength)}+${marker}@${domain}`;
}

/* ---------------- NETWORK HELPERS ---------------- */

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 8000,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(id);
  }
}

async function retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  throw lastError;
}

/* ---------------- HUBSPOT ---------------- */

async function createHubSpotContact(
  token: string,
  data: ResponseFormData,
  email: string,
) {
  const { firstName, lastName } = getFirstAndLastName(data.name);

  return fetchWithTimeout(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          response_time: new Date().toISOString(),
          email,
          firstname: firstName,
          lastname: lastName,
          phone: data.phone,
          qualification: data.interest,
          message: data.message,
        },
      }),
    },
    8000,
  );
}

async function syncContactToHubSpot(data: ResponseFormData) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return;
  if (process.env.NODE_ENV === "development") {
    console.log("[HubSpot] Skipping contact sync in development");
    return;
  }
  return retry(async () => {
    const response = await createHubSpotContact(token, data, data.email);

    if (response.ok) return;

    if (response.status === 409) {
      const fallbackEmail = createConflictReadableEmail(data.email);

      const retryResponse = await createHubSpotContact(
        token,
        data,
        fallbackEmail,
      );

      if (retryResponse.ok) {
        console.warn(
          `[HubSpot] Duplicate handled. Saved with fallback email: ${fallbackEmail}`,
        );
        return;
      }

      throw new Error(
        `HubSpot retry failed (${retryResponse.status}): ${await retryResponse.text()}`,
      );
    }

    throw new Error(
      `HubSpot failed (${response.status}): ${await response.text()}`,
    );
  });
}

/* ---------------- MAIN ACTIONS ---------------- */

export async function createResponse(data: ResponseFormData) {
  const parsed = responseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  const formData = parsed.data;

  try {
    // 1. Critical path: Save to DB immediately
    await prisma.response.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
      },
    });

    // 2. Non-critical path: Defer all external API requests to background execution
    after(async () => {
      try {
        const results = await Promise.allSettled([
          syncContactToHubSpot(formData),
          sendContactNotificationEmail({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            interest: formData.interest,
          }),
          createFormSubmissionNotification({
            title: "New Response Form Submitted",
            description: `${formData.name} submitted a response form.`,
            type: "response",
          }),
        ]);

        // Monitor background failures in your server logs
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `[Background Task Error][createResponse][Task ${index}]:`,
              result.reason,
            );
          }
        });
      } catch (error) {
        console.error(
          "[Unexpected error in after() block of createResponse]:",
          error,
        );
      }
    });

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

/* ---------------- CONTACT ---------------- */

export async function createContact(data: ContactData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
    };
  }

  const formData = parsed.data;
  const interest = formData.qualification || formData.industry || "none";

  const payload: ResponseFormData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    interest,
  };

  try {
    // 1. Critical path: Save to DB immediately
    await prisma.response.create({
      data: payload,
    });

    // 2. Non-critical path: Defer all external API requests to background execution
    after(async () => {
      try {
        const results = await Promise.allSettled([
          syncContactToHubSpot(payload),
          sendContactNotificationEmail(payload),
          createFormSubmissionNotification({
            title: "New Response Form Submitted",
            description: `${payload.name} submitted a response form.`,
            type: "response",
          }),
        ]);

        // Monitor background failures in your server logs
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `[Background Task Error][createContact][Task ${index}]:`,
              result.reason,
            );
          }
        });
      } catch (error) {
        console.error(
          "[Unexpected error in after() block of createContact]:",
          error,
        );
      }
    });

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("DB Error:", error);
    return {
      success: false,
      message: "Failed to submit form",
    };
  }
}
