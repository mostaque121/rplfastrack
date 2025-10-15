/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { saveEligibilityData } from "@/app/(main)/action/eligibility";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRPL } from "@/contexts/rpl-context";
import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";

const experienceYears = [
  { id: "1", name: "Less than 1 year" },
  { id: "1-3", name: "1-3 years" },
  { id: "3-5", name: "3-5 years" },
  { id: "5-10", name: "5-10 years" },
  { id: "10+", name: "More than 10 years" },
];

const australianStates = [
  { id: "nsw", name: "New South Wales" },
  { id: "vic", name: "Victoria" },
  { id: "qld", name: "Queensland" },
  { id: "wa", name: "Western Australia" },
  { id: "sa", name: "South Australia" },
  { id: "tas", name: "Tasmania" },
  { id: "act", name: "Australian Capital Territory" },
  { id: "nt", name: "Northern Territory" },
];

interface EligibilityFormProps {
  trigger?: React.ReactNode;
  onSubmitSuccess?: (data: any) => void;
  className?: string;
  title?: string;
  description?: string;
}

export function EligibilityForm({
  trigger,
  onSubmitSuccess,
  className = "",
  title = "RPL Eligibility Check",
  description = "Complete this form to check your eligibility for Recognition of Prior Learning.",
}: EligibilityFormProps) {
  const { sections } = useRPL();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    industry: "",
    qualification: "",
    yearsOfExperience: "",
    stateLivedIn: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      // If industry changes, reset qualification
      if (field === "industry") {
        return { ...prev, [field]: value, qualification: "" };
      }
      return { ...prev, [field]: value };
    });

    // Clear error when user makes changes
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.industry) {
      setError("Please select an industry");
      return false;
    }
    if (!formData.qualification) {
      setError("Please select a qualification");
      return false;
    }
    if (!formData.yearsOfExperience) {
      setError("Please select years of experience");
      return false;
    }
    if (!formData.stateLivedIn) {
      setError("Please select your state");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.fullName || formData.fullName.length < 2) {
      setError("Please enter your full name");
      return false;
    }
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phoneNumber || formData.phoneNumber.length < 8) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setError("");
    }
    handleScrollToTop();
  };

  const handleBack = () => {
    setStep(1);
    setError("");
    handleScrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Call the server action to save the data
      const result = await saveEligibilityData(formData);

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }

      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setStep(1);
        resetForm();
        setOpen(false);
      }, 10000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      industry: "",
      qualification: "",
      yearsOfExperience: "",
      stateLivedIn: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
    setError("");
    setIsSubmitted(false);
  };

  const defaultTrigger = (
    <Button size="lg" className="font-semibold">
      Check Your RPL Eligibility
    </Button>
  );
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    if (scrollSectionRef.current) {
      scrollSectionRef.current.scrollTop = 0;
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent
        ref={scrollSectionRef}
        className={`sm:max-w-[500px] ${className} h-[100dvh] md:max-h-[90vh] pb-48 md:pb-6 overflow-y-auto`}
      >
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Progress indicator */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              ></div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Step {step} of 2 • {step === 1 ? "50%" : "100%"} Complete
            </div>

            {/* Error display */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="industry" className="text-sm font-medium">
                      Industry <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => {
                        handleChange("industry", value);
                        handleChange("qualification", ""); // Reset qualification on industry change
                      }}
                    >
                      <SelectTrigger
                        id="industry"
                        className="w-full min-h-[40px] h-auto py-2 text-sm focus:ring-2 ring-ring"
                      >
                        <SelectValue
                          placeholder="Select your industry"
                          className="whitespace-normal break-words text-left"
                        />
                      </SelectTrigger>
                      <SelectContent
                        className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
                        position="popper"
                        sideOffset={4}
                      >
                        {sections.map((industry) => (
                          <SelectItem
                            key={industry.id}
                            value={industry.title}
                            className="text-sm py-2 px-3 cursor-pointer whitespace-normal"
                          >
                            <span className="block whitespace-normal break-words">
                              {industry.title}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Qualification Select - With text wrapping */}
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="qualification"
                      className="text-sm font-medium"
                    >
                      Desired Qualification{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.qualification}
                      onValueChange={(value) =>
                        handleChange("qualification", value)
                      }
                      disabled={!formData.industry}
                    >
                      <SelectTrigger
                        id="qualification"
                        className="w-full min-h-[40px] h-auto py-2 text-sm focus:ring-2 ring-ring disabled:opacity-50"
                      >
                        <SelectValue
                          placeholder={
                            formData.industry
                              ? "Select desired qualification"
                              : "Select industry first"
                          }
                          className="whitespace-normal break-words text-left"
                        />
                      </SelectTrigger>
                      <SelectContent
                        className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
                        position="popper"
                        sideOffset={4}
                      >
                        {formData.industry &&
                          sections
                            .find(
                              (section) => section.title === formData.industry
                            )
                            ?.courses?.map((course) => (
                              <SelectItem
                                key={course.id}
                                value={course.title}
                                className="text-sm py-2 px-3 cursor-pointer whitespace-normal"
                              >
                                <span className="block whitespace-normal break-words">
                                  {course.title}
                                </span>
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Years of Experience{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.yearsOfExperience}
                      onValueChange={(value) =>
                        handleChange("yearsOfExperience", value)
                      }
                    >
                      <SelectTrigger
                        id="experience"
                        className="w-full focus:ring-2 ring-ring"
                      >
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceYears.map((exp) => (
                          <SelectItem key={exp.id} value={exp.id}>
                            {exp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.stateLivedIn}
                      onValueChange={(value) =>
                        handleChange("stateLivedIn", value)
                      }
                    >
                      <SelectTrigger
                        id="state"
                        className="w-full focus:ring-2 ring-ring"
                      >
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {australianStates.map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end pt-4">
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Any additional information you'd like to share"
                      className="min-h-[100px]"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-center">Thank You!</h2>
            <p className="text-center text-muted-foreground mt-2">
              Your eligibility check has been submitted successfully. We&apos;ll
              review your information and get back to you shortly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
