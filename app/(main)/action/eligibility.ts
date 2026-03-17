"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

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

function runInBackground(taskName: string, task: Promise<unknown>) {
  void task.catch((error) => {
    console.error(
      `[saveEligibilityData] Background task failed: ${taskName}`,
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

  // Preserve readability for managers while signaling this was auto-modified.
  const readableLocal = localPart.replace(
    /[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/g,
    "_",
  );
  const marker = `hs409-${Date.now().toString().slice(-6)}`;
  const maxLocalLength = Math.max(1, 64 - marker.length - 1);
  const shortenedLocal = readableLocal.slice(0, maxLocalLength);

  return `${shortenedLocal}+${marker}@${domain}`;
}

async function createHubSpotEligibilityContact(
  token: string,
  data: EligibilityFormData,
  email: string,
) {
  const { firstName, lastName } = getFirstAndLastName(data.fullName);

  return fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
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
  });
}

async function syncEligibilityToHubSpot(data: EligibilityFormData) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    return;
  }

  const response = await createHubSpotEligibilityContact(
    token,
    data,
    data.email,
  );

  if (response.ok) {
    return;
  }

  if (response.status === 409) {
    const conflictBody = await response.text();
    const fallbackEmail = createConflictReadableEmail(data.email);
    const retryResponse = await createHubSpotEligibilityContact(
      token,
      data,
      fallbackEmail,
    );

    if (retryResponse.ok) {
      console.warn(
        `[syncEligibilityToHubSpot] Duplicate email in HubSpot. Saved with fallback email: ${fallbackEmail}. Original email: ${data.email}`,
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

// Email transporter
const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  }),
);

export async function saveEligibilityData(data: EligibilityFormData) {
  try {
    // Manual validation
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

    // Save to database
    await prisma.eligibilitySubmission.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        industry: data.industry,
        qualification: data.qualification,
        yearsOfExperience: parseInt(data.yearsOfExperience),
        stateLivedIn: data.stateLivedIn,
        message: data.message || "",
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL!,
      to: process.env.RECEIVER_EMAIL!,
      subject: "New Eligibility Submission",
      text: `
------------------------------------------------------------
               New Eligibility Form Submission
------------------------------------------------------------

Full Name:           ${data.fullName}
Email:               ${data.email}
Phone Number:        ${data.phoneNumber}
Industry:            ${data.industry}
Qualification:       ${data.qualification}
Years of Experience: ${data.yearsOfExperience}
State Lived In:      ${data.stateLivedIn}

Message:
${data.message?.trim() || "No message provided"}

------------------------------------------------------------
Submitted via your website eligibility form.
------------------------------------------------------------
      `,
    };

    if (process.env.NODE_ENV !== "development") {
      runInBackground(
        "sendEligibilityEmail",
        transporter.sendMail(mailOptions),
      );
    }

    runInBackground(
      "createFormSubmissionNotification",
      createFormSubmissionNotification({
        title: "New Eligibility Form Submitted",
        description: `${data.fullName} has submitted a eligibility form.`,
        type: "eligibility",
      }),
    );

    runInBackground("syncEligibilityToHubSpot", syncEligibilityToHubSpot(data));

    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving eligibility data:", error);
    return { error: "Failed to save data. Please try again." };
  }
}
