/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { bookMeeting } from "./action";
import { type BookingData, bookingSchema, validateStep } from "./validation";

export default function MeetingBooking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [bookingResult, setBookingResult] = useState<{
    bookingId: string;
    meetingLink: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const link =
      bookingResult?.meetingLink || "https://meet.google.com/abc-defg-hij";
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
  };
  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-AU", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        fullDate: date.toLocaleDateString("en-AU", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    }
    return dates;
  };

  // Generate time slots (9 AM to 5 PM Australian time)
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString(
          "en-AU",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        );
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const availableDates = getAvailableDates();
  const timeSlots = getTimeSlots();

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, bookingData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0 && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when going back
      setSubmitError(""); // Clear submit errors
    }
  };

  const handleDateSelect = (date: string) => {
    setBookingData({ ...bookingData, date });
    setErrors({ ...errors, date: "" }); // Clear date error
  };

  const handleTimeSelect = (time: string) => {
    setBookingData({ ...bookingData, time });
    setErrors({ ...errors, time: "" }); // Clear time error
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData({ ...bookingData, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear field error
  };

  const handleSubmit = () => {
    const stepErrors = validateStep(2, bookingData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      return;
    }

    setSubmitError("");

    startTransition(async () => {
      try {
        // Validate with full schema
        const validatedData = bookingSchema.parse(bookingData);

        const result = await bookMeeting(validatedData);

        if (result.success) {
          setBookingResult({
            bookingId: result.bookingId!,
            meetingLink: result.meetingLink!,
          });
          setCurrentStep(3);
        } else {
          setSubmitError(
            result.error || "Failed to book meeting. Please try again."
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          setSubmitError(error.message);
        } else {
          setSubmitError("An unexpected error occurred. Please try again.");
        }
      }
    });
  };

  const steps = [
    { title: "Select Date", icon: Calendar },
    { title: "Choose Time", icon: Clock },
    { title: "Your Details", icon: User },
    { title: "Confirmation", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Free 30-Minute Meeting
          </h1>
          <p className="text-gray-600">
            Schedule a consultation with our RPL experts
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        index < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep].icon, {
                className: "w-5 h-5",
              })}
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>
              {currentStep === 0 &&
                "Choose your preferred date for the meeting"}
              {currentStep === 1 && "Select a convenient time slot"}
              {currentStep === 2 && "Please provide your contact information"}
              {currentStep === 3 &&
                "Your meeting has been successfully booked!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Submit Error Alert */}
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Sliding Content Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentStep * 100}%)` }}
              >
                {/* Step 1: Date Selection */}
                <div className="w-full flex-shrink-0 space-y-6 pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableDates.map((date) => (
                      <Button
                        key={date.value}
                        variant={
                          bookingData.date === date.value
                            ? "default"
                            : "outline"
                        }
                        className={`h-auto p-4 flex flex-col items-start transition-all duration-200 hover:scale-105 ${
                          errors.date ? "border-red-500" : ""
                        }`}
                        onClick={() => handleDateSelect(date.value)}
                      >
                        <span className="font-semibold">{date.label}</span>
                        <span className="text-sm opacity-70">
                          {date.fullDate}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Time Selection */}
                <div className="w-full flex-shrink-0 space-y-6 px-4">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      Selected Date:{" "}
                      {
                        availableDates.find((d) => d.value === bookingData.date)
                          ?.fullDate
                      }
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.value}
                        variant={
                          bookingData.time === slot.value
                            ? "default"
                            : "outline"
                        }
                        className={`transition-all duration-200 hover:scale-105 ${
                          errors.time ? "border-red-500" : ""
                        }`}
                        onClick={() => handleTimeSelect(slot.value)}
                      >
                        {slot.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Step 3: User Information */}
                <div className="w-full flex-shrink-0 space-y-6 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Badge variant="secondary">
                      Date:{" "}
                      {
                        availableDates.find((d) => d.value === bookingData.date)
                          ?.label
                      }
                    </Badge>
                    <Badge variant="secondary">
                      Time:{" "}
                      {
                        timeSlots.find((t) => t.value === bookingData.time)
                          ?.label
                      }
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={bookingData.name || ""}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter your full name"
                          className={`transition-all duration-200 mt-2 ${
                            errors.name
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                          required
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingData.phone || ""}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                          className={`transition-all duration-200 mt-2 ${
                            errors.phone
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                          required
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email address"
                        className={`transition-all duration-200 mt-2 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="message">
                        Additional Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={bookingData.message || ""}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Tell us about your RPL needs, qualifications you're seeking, or any specific questions you have..."
                        className={`transition-all duration-200 mt-2 ${
                          errors.message
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        rows={4}
                        maxLength={500}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Help us prepare for your consultation by sharing your
                        background and goals. (
                        {(bookingData.message || "").length}/500)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4: Success Page */}
                <div className="w-full flex-shrink-0 space-y-6 pl-4">
                  <div className="text-center space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Meeting Booked Successfully!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Your 30-minute consultation has been scheduled. We'll
                        send you a confirmation email shortly.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 transform transition-all duration-300 hover:scale-105">
                      <h4 className="font-semibold">Meeting Details:</h4>
                      <p>
                        <strong>Name:</strong> {bookingData.name}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {
                          availableDates.find(
                            (d) => d.value === bookingData.date
                          )?.fullDate
                        }
                      </p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {
                          timeSlots.find((t) => t.value === bookingData.time)
                            ?.label
                        }{" "}
                        (Australian Time)
                      </p>
                      <p>
                        <strong>Duration:</strong> 30 minutes
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg transform transition-all duration-300 ">
                      <h4 className="font-semibold mb-2">Google Meet Link:</h4>
                      <div className="flex items-center justify-center gap-2">
                        <code className="bg-white px-3 py-2 rounded text-sm flex-1">
                          {bookingResult?.meetingLink ||
                            "https://meet.google.com/abc-defg-hij"}
                        </code>
                        <Button
                          size="sm"
                          onClick={handleCopy}
                          className="transition-all duration-200 hover:scale-110"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This link will also be sent to your email address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Navigation Buttons - Outside sliding container */}
          <div className="px-6 pb-6">
            <div className="flex justify-between pt-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0 || currentStep === 3}
                className="flex items-center gap-2 bg-transparent transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < 2 && (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}

              {currentStep === 2 && (
                <Button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  {isPending ? "Booking..." : "Book Meeting"}
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  className="transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href="/">Return to Website</Link>
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
