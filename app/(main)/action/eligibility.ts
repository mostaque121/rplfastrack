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

// Email transporter
const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  })
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

    // Send email notification
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

    await transporter.sendMail(mailOptions);
    await createFormSubmissionNotification({
      title: "New Eligibility Form Submitted",
      description: `${data.fullName} has submitted a eligibility form.`,
      type: "eligibility",
    });

    return { success: true, message: "Data saved and email sent successfully" };
  } catch (error) {
    console.error("Error saving eligibility data:", error);
    return { error: "Failed to save data. Please try again." };
  }
}
