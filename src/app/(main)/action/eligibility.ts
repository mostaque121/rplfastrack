"use server";

import { createFormSubmissionNotification } from "@/app/(admin)/lib/create-notification";
import { sendEligibilityNotificationEmail } from "@/app/(admin)/lib/send-mail";
import { sendLeadToCrm } from "@/lib/crm";
import { getExperienceLabel } from "@/lib/experience-years";
import { prisma } from "@/lib/prisma";
import { after } from "next/server";

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
    const submission = await prisma.eligibilitySubmission.create({
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
          sendLeadToCrm({
            submissionId: submission.id,
            form: "eligibility",
            name: data.fullName,
            phone: data.phoneNumber,
            email: data.email,
            qualification: data.qualification,
            industry: data.industry,
            experience: getExperienceLabel(data.yearsOfExperience),
            state: data.stateLivedIn,
            message: data.message,
            sourceDetail: "Eligibility form",
            submittedAt: submission.createdAt.toISOString(),
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
