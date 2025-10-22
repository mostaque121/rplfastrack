"use server";

import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import ExcelJS from "exceljs";

export async function exportResponsesToExcel() {
  try {
    const responses = await prisma.response.findMany({
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Responses");

    // Add headers
    worksheet.columns = [
      { header: "No.", key: "no", width: 6 },
      { header: "Date", key: "date", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Phone Number", key: "phone", width: 20 },
      { header: "Email Address", key: "email", width: 25 },
      { header: "Interest", key: "interest", width: 25 },
      { header: "Stage", key: "stage", width: 15 },
      { header: "Message", key: "message", width: 50 },
      { header: "Latest Note", key: "latestNote", width: 50 },
    ];

    // Add rows
    responses.forEach((response, index) => {
      worksheet.addRow({
        no: index + 1,
        date: response.createdAt
          ? format(response.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "",
        name: response.name || "",
        phone: response.phone || "",
        email: response.email || "",
        interest: response.interest || "",
        stage: response.stage || "",
        message: response.message || "",
        latestNote: response.notes.length > 0 ? response.notes[0].content : "",
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      success: true,
      data: base64,
      filename: `responses-${format(new Date(), "yyyy-MM-dd")}.xlsx`,
    };
  } catch (error) {
    console.error("Export error:", error);
    return {
      success: false,
      error: "Failed to export responses",
    };
  }
}

export async function exportEligibilityToExcel() {
  try {
    const submissions = await prisma.eligibilitySubmission.findMany({
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Eligibility Submissions");

    worksheet.columns = [
      { header: "No.", key: "no", width: 6 },
      { header: "Date", key: "date", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email Address", key: "email", width: 25 },
      { header: "Phone Number", key: "phone", width: 20 },
      { header: "Industry", key: "industry", width: 20 },
      { header: "Qualification", key: "qualification", width: 25 },
      { header: "Years of Experience", key: "experience", width: 10 },
      { header: "State Lived In", key: "state", width: 20 },
      { header: "Message", key: "message", width: 50 },
      { header: "Latest Note", key: "latestNote", width: 50 },
    ];

    submissions.forEach((submission, index) => {
      worksheet.addRow({
        no: index + 1,
        date: submission.createdAt
          ? format(submission.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "",
        name: submission.fullName || "",
        email: submission.email || "",
        phone: submission.phoneNumber || "",
        industry: submission.industry || "",
        qualification: submission.qualification || "",
        experience: submission.yearsOfExperience ?? "",
        state: submission.stateLivedIn || "",
        message: submission.message || "",
        latestNote:
          submission.notes.length > 0 ? submission.notes[0].content : "",
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      success: true,
      data: base64,
      filename: `eligibility-${format(new Date(), "yyyy-MM-dd")}.xlsx`,
    };
  } catch (error) {
    console.error("Export error:", error);
    return {
      success: false,
      error: "Failed to export eligibility submissions",
    };
  }
}
