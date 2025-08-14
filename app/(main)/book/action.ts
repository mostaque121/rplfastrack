"use server";

import { bookingSchema, type BookingData } from "./validation";

export async function bookMeeting(data: BookingData) {
  try {
    // Validate the data
    const validatedData = bookingSchema.parse(data);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate occasional server errors for testing (remove in production)
    if (Math.random() < 0.05) {
      throw new Error("Server temporarily unavailable. Please try again.");
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Create calendar event
    // 4. Generate Google Meet link

    console.log("Meeting booked:", validatedData);

    // Generate a unique booking ID
    const bookingId = `RPL-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Generate Google Meet link (in production, use Google Calendar API)
    const meetingLink = `https://meet.google.com/${Math.random()
      .toString(36)
      .substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random()
      .toString(36)
      .substr(2, 3)}`;

    return {
      success: true,
      message: "Meeting booked successfully!",
      bookingId,
      meetingLink,
      data: validatedData,
    };
  } catch (error) {
    console.error("Booking error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
