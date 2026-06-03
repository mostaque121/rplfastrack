"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendEligibilityNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { prisma } from "@/lib/prisma";
import { after } from "next/server";
import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

/* ------------------ CONFIG & TYPES ------------------ */

type EligibilityFormData = {
  industry: string;
  qualification: string;
  yearsOfExperience: string;
  stateLivedIn: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
};

const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  }),
);

/* -------------------- UTILITIES -------------------- */

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

/* ------------------ NETWORK HELPERS ------------------ */

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

/* -------------------- HUBSPOT -------------------- */

async function createHubSpotEligibilityContact(
  token: string,
  data: EligibilityFormData,
  email: string,
) {
  const { firstName, lastName } = getFirstAndLastName(data.fullName);

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
          phone: data.phoneNumber,
          industry: data.industry,
          qualification: data.qualification,
          experience: data.yearsOfExperience,
          city: data.stateLivedIn,
          message: data.message,
        },
      }),
    },
    8000,
  );
}

async function syncEligibilityToHubSpot(data: EligibilityFormData) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return;
  if (process.env.NODE_ENV === "development") {
    console.log("[HubSpot] Skipping contact sync in development");
    return;
  }
  return retry(async () => {
    const response = await createHubSpotEligibilityContact(
      token,
      data,
      data.email,
    );

    if (response.ok) return;

    if (response.status === 409) {
      const fallbackEmail = createConflictReadableEmail(data.email);

      const retryResponse = await createHubSpotEligibilityContact(
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

/* ------------------ MAIN ACTIONS ------------------ */

export async function saveEligibilityData(data: EligibilityFormData) {
  // 1. Structural Validation Layer
  if (!data.industry) return { error: "Industry is required" };
  if (!data.qualification) return { error: "Qualification is required" };
  if (!data.yearsOfExperience)
    return { error: "Years of experience is required" };
  if (!data.stateLivedIn) return { error: "State is required" };
  if (!data.fullName || data.fullName.length < 2)
    return { error: "Full name is required" };
  if (!data.email || !data.email.includes("@"))
    return { error: "Valid email is required" };
  if (!data.phoneNumber || data.phoneNumber.length < 8)
    return { error: "Valid phone number is required" };

  try {
    // 2. Critical Path: Local State Synchronization (Database Save)
    await prisma.eligibilitySubmission.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        industry: data.industry,
        qualification: data.qualification,
        yearsOfExperience: parseInt(data.yearsOfExperience) || 0,
        stateLivedIn: data.stateLivedIn,
        message: data.message || "",
      },
    });
    // 3. Non-Critical Deferred Processing Layer
    after(async () => {
      try {
        const results = await Promise.allSettled([
          syncEligibilityToHubSpot(data),
          sendEligibilityNotificationEmail({
            name: data.fullName,
            email: data.email,
            phone: data.phoneNumber,
            message: data.message,
            industry: data.industry,
            qualification: data.qualification,
            yearsOfExperience: data.yearsOfExperience,
            state: data.stateLivedIn,
          }),
          createFormSubmissionNotification({
            title: "New Eligibility Form Submitted",
            description: `${data.fullName} submitted eligibility form.`,
            type: "eligibility",
          }),
        ]);
        // Systematic Background Exception Tracking
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `[Background Task Error][saveEligibilityData][Task ${index}]:`,
              result.reason,
            );
          }
        });
      } catch (error) {
        console.error(
          "[Unexpected error in after() block of saveEligibilityData]:",
          error,
        );
      }
    });

    // Structural JSON response return vector
    return {
      success: true,
      message: "Data saved successfully",
    };
  } catch (error) {
    console.error("Error saving eligibility data:", error);
    return {
      error: "Failed to save data. Please try again.",
    };
  }
}
