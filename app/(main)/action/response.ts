"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendContactNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { prisma } from "@/lib/prisma";
import { contactSchema, responseFormSchema } from "@/lib/zod";
import { z } from "zod";

type ResponseFormData = z.infer<typeof responseFormSchema>;

function runInBackground(taskName: string, task: Promise<unknown>) {
  void task.catch((error) => {
    console.error(
      `[createResponse] Background task failed: ${taskName}`,
      error,
    );
  });
}

function getFirstAndLastName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

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
    return `hs409-duplicate-${Date.now()}@invalid.local`;
  }

  const localPart = trimmedEmail.slice(0, atIndex);
  const domain = trimmedEmail.slice(atIndex + 1);

  // Keep original local part readable, append a conflict marker for managers.
  const readableLocal = localPart.replace(
    /[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/g,
    "_",
  );
  const marker = `hs409-${Date.now().toString().slice(-6)}`;
  const maxLocalLength = Math.max(1, 64 - marker.length - 1);
  const shortenedLocal = readableLocal.slice(0, maxLocalLength);

  return `${shortenedLocal}+${marker}@${domain}`;
}

async function createHubSpotContact(
  token: string,
  data: ResponseFormData,
  email: string,
) {
  const { firstName, lastName } = getFirstAndLastName(data.name);

  return fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        date: new Date().toLocaleString("en-AU", {
          timeZone: "Australia/Sydney",
        }),
        email,
        firstname: firstName,
        lastname: lastName,
        phone: data.phone,
        qualification: data.interest,
        message: data.message,
      },
    }),
  });
}

async function syncContactToHubSpot(data: ResponseFormData) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    return;
  }

  const response = await createHubSpotContact(token, data, data.email);

  if (response.ok) {
    return;
  }

  if (response.status === 409) {
    const conflictBody = await response.text();
    const fallbackEmail = createConflictReadableEmail(data.email);
    const retryResponse = await createHubSpotContact(
      token,
      data,
      fallbackEmail,
    );

    if (retryResponse.ok) {
      console.warn(
        `[syncContactToHubSpot] Duplicate email in HubSpot. Saved with fallback email: ${fallbackEmail}. Original email: ${data.email}`,
      );
      return;
    }

    const retryBody = await retryResponse.text();
    throw new Error(
      `HubSpot sync retry failed after 409. Original email: ${data.email}, fallback email: ${fallbackEmail}, first error: ${conflictBody}, retry error (${retryResponse.status}): ${retryBody}`,
    );
  }

  const errorBody = await response.text();
  throw new Error(`HubSpot sync failed (${response.status}): ${errorBody}`);
}

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
    await prisma.response.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
      },
    });

    runInBackground(
      "sendContactNotificationEmail",
      sendContactNotificationEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
      }),
    );

    runInBackground(
      "createFormSubmissionNotification",
      createFormSubmissionNotification({
        title: "New Response Form Submitted",
        description: `${formData.name} has submitted a response form.`,
        type: "response",
      }),
    );

    runInBackground("syncContactToHubSpot", syncContactToHubSpot(formData));

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

type ContactData = z.infer<typeof contactSchema>;

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

  try {
    await prisma.response.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest,
      },
    });

    runInBackground(
      "sendContactNotificationEmail:createContact",
      sendContactNotificationEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest,
      }),
    );

    runInBackground(
      "createFormSubmissionNotification:createContact",
      createFormSubmissionNotification({
        title: "New Response Form Submitted",
        description: `${formData.name} has submitted a response form.`,
        type: "response",
      }),
    );

    runInBackground(
      "syncContactToHubSpot:createContact",
      syncContactToHubSpot({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest,
      }),
    );

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
