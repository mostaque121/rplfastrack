"use server";

import { prisma } from "@/lib/prisma"; // Adjust path as needed
import { format } from "date-fns";
import * as XLSX from "xlsx";

export async function exportResponsesToExcel() {
  try {
    const responses = await prisma.response.findMany({
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" }, // latest first
    });

    const workbook = XLSX.utils.book_new();

    // Map with friendly headings & preferred order
    const excelData = responses.map((response, index) => ({
      "No.": index + 1, // auto index
      Date: response.createdAt
        ? format(response.createdAt, "yyyy-MM-dd HH:mm:ss")
        : "",
      Name: response.name || "",
      "Phone Number": response.phone || "",
      "Email Address": response.email || "",
      Interest: response.interest || "",
      Stage: response.stage || "",
      Message: response.message || "",
      "Latest Note": response.notes.length > 0 ? response.notes[0].content : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths based on content
    const colWidths = Object.keys(excelData[0] || {}).map((key) => ({
      wch: Math.max(key.length, 20),
    }));
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const base64 = Buffer.from(excelBuffer).toString("base64");

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
      orderBy: { createdAt: "desc" }, // latest first
    });

    const workbook = XLSX.utils.book_new();

    // Map with friendly headings & preferred order
    const excelData = submissions.map((submission, index) => ({
      "No.": index + 1, // auto index
      Date: submission.createdAt
        ? format(submission.createdAt, "yyyy-MM-dd HH:mm:ss")
        : "",
      Name: submission.fullName || "",
      "Email Address": submission.email || "",
      "Phone Number": submission.phoneNumber || "",
      Industry: submission.industry || "",
      Qualification: submission.qualification || "",
      "Years of Experience": submission.yearsOfExperience ?? "",
      "State Lived In": submission.stateLivedIn || "",
      Message: submission.message || "",
      "Latest Note":
        submission.notes.length > 0 ? submission.notes[0].content : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths (at least 20 chars, or header length)
    const colWidths = Object.keys(excelData[0] || {}).map((key) => ({
      wch: Math.max(key.length, 20),
    }));
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Eligibility Submissions"
    );

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const base64 = Buffer.from(excelBuffer).toString("base64");

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
