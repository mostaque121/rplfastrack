/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";

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
import { saveEligibilityData } from "@/features/leads/actions";
import { getAttribution } from "@/lib/attribution";
import { experienceYears } from "@/lib/experience-years";
import { trackLead } from "@/lib/track-lead";

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
      const result = await saveEligibilityData(formData, getAttribution());

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }

      trackLead("eligibility", formData.qualification);

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
        className={`sm:max-w-[500px] ${className} h-[100dvh] overflow-y-auto pb-48 md:max-h-[90vh] md:pb-6`}
      >
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Progress indicator */}
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-green-600 transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              ></div>
            </div>
            <div className="mb-4 text-sm text-muted-foreground">
              Step {step} of 2 • {step === 1 ? "50%" : "100%"} Complete
            </div>

            {/* Error display */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="w-full space-y-2">
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
                        className="h-auto min-h-[40px] w-full py-2 text-sm ring-ring focus:ring-2"
                      >
                        <SelectValue
                          placeholder="Select your industry"
                          className="text-left break-words whitespace-normal"
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
                            className="cursor-pointer px-3 py-2 text-sm whitespace-normal"
                          >
                            <span className="block break-words whitespace-normal">
                              {industry.title}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Qualification Select - With text wrapping */}
                  <div className="w-full space-y-2">
                    <Label htmlFor="qualification" className="text-sm font-medium">
                      Desired Qualification <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.qualification}
                      onValueChange={(value) => handleChange("qualification", value)}
                      disabled={!formData.industry}
                    >
                      <SelectTrigger
                        id="qualification"
                        className="h-auto min-h-[40px] w-full py-2 text-sm ring-ring focus:ring-2 disabled:opacity-50"
                      >
                        <SelectValue
                          placeholder={
                            formData.industry
                              ? "Select desired qualification"
                              : "Select industry first"
                          }
                          className="text-left break-words whitespace-normal"
                        />
                      </SelectTrigger>
                      <SelectContent
                        className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]"
                        position="popper"
                        sideOffset={4}
                      >
                        {formData.industry &&
                          sections
                            .find((section) => section.title === formData.industry)
                            ?.courses?.map((course) => (
                              <SelectItem
                                key={course.id}
                                value={course.title}
                                className="cursor-pointer px-3 py-2 text-sm whitespace-normal"
                              >
                                <span className="block break-words whitespace-normal">
                                  {course.title}
                                </span>
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Years of Experience <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.yearsOfExperience}
                      onValueChange={(value) => handleChange("yearsOfExperience", value)}
                    >
                      <SelectTrigger id="experience" className="w-full ring-ring focus:ring-2">
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
                      onValueChange={(value) => handleChange("stateLivedIn", value)}
                    >
                      <SelectTrigger id="state" className="w-full ring-ring focus:ring-2">
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
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
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
                    <Button type="button" variant="outline" onClick={handleBack}>
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
            <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="text-center text-2xl font-bold">Thank You!</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Your eligibility check has been submitted successfully. We&apos;ll review your
              information and get back to you shortly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
