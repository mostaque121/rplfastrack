"use server";
import { prisma } from "@/lib/prisma";

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

export async function saveEligibilityData(data: EligibilityFormData) {
  try {
    // Validate the data
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

    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving eligibility data:", error);
    return { error: "Failed to save data. Please try again." };
  }
}
