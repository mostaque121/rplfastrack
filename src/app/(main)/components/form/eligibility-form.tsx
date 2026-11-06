/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRPL } from "@/contexts/rpl-context";
import { saveEligibilityData } from "@/features/leads/actions";
import { getAttribution } from "@/lib/attribution";
import {
  OTHER_INDUSTRY,
  OTHER_QUALIFICATION,
  australianStates,
  existingQualifications,
  workStatuses,
} from "@/lib/eligibility-options";
import { experienceYears } from "@/lib/experience-years";
import { trackLead } from "@/lib/track-lead";
import { cn } from "@/lib/utils";

/* ---------------- small building blocks ---------------- */

/** Full-width row for long lists (industry, qualification). Tapping it moves on. */
function OptionCard({
  selected,
  onSelect,
  children,
  compact,
  dashed,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  compact?: boolean;
  dashed?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white px-4 text-left font-medium text-ink transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        compact ? "py-2.5 text-sm" : "py-3 text-[15px]",
        dashed && "border-dashed",
        selected
          ? "border-brand bg-brand-soft"
          : "border-gray-300 hover:border-brand hover:bg-brand-soft/60",
      )}
    >
      <span>{children}</span>
      <ChevronRight
        aria-hidden
        className="size-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
      />
    </button>
  );
}

/** Compact pill for short answers (years, work status, state). */
function Chip({
  selected,
  onSelect,
  children,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={label}
      onClick={onSelect}
      className={cn(
        "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        selected
          ? "border-brand bg-brand text-white"
          : "border-gray-300 bg-white text-ink hover:border-brand hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-2.5 text-sm font-semibold text-ink">{label}</legend>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {children}
      </div>
    </fieldset>
  );
}

/* ---------------- the quiz ---------------- */

const STEPS = ["industry", "qualification", "experience", "background", "contact"] as const;
type Step = (typeof STEPS)[number];

const STEP_COPY: Record<Step, { title: string; hint: string }> = {
  industry: {
    title: "Which industry do you work in?",
    hint: "Pick the one closest to your experience.",
  },
  qualification: {
    title: "Which qualification do you want?",
    hint: "Choose the one you'd like to be assessed for.",
  },
  experience: {
    title: "Tell us about your experience",
    hint: "This shows how much of your work history can count.",
  },
  background: {
    title: "A little about your background",
    hint: "So we can match you to the right level and the right assessor.",
  },
  contact: {
    title: "Where should we send your result?",
    hint: "We'll email your eligibility result to you.",
  },
};

const emptyForm = {
  industry: "",
  qualification: "",
  yearsOfExperience: "",
  workStatus: "",
  existingQualification: "",
  stateLivedIn: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

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
  title = "Free eligibility check",
  description = "Answer a few quick questions to check your eligibility for Recognition of Prior Learning.",
}: EligibilityFormProps) {
  const { sections } = useRPL();
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const pushedEntry = useRef(false);

  const step = STEPS[stepIndex];
  const section = sections.find((s) => s.title === formData.industry);
  const courses = section?.courses ?? [];
  const filteredCourses = search.trim()
    ? courses.filter((c) => c.title.toLowerCase().includes(search.trim().toLowerCase()))
    : courses;

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [stepIndex, isSubmitted]);

  const set = (field: keyof typeof emptyForm, value: string) => {
    setFormData((prev) =>
      field === "industry"
        ? { ...prev, industry: value, qualification: "" }
        : { ...prev, [field]: value },
    );
    setError("");
  };

  const goTo = (index: number) => {
    setStepIndex(index);
    setError("");
    setSearch("");
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setStepIndex(0);
    setSearch("");
    setError("");
    setIsSubmitted(false);
  };

  // Opening the quiz adds a history entry (same URL, no navigation or refetch),
  // so the phone's Back button closes the quiz instead of leaving the page.
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ eligibilityOpen: true }, "");
    pushedEntry.current = true;

    const onPopState = () => {
      pushedEntry.current = false;
      setOpen(false);
      resetForm();
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      // Closed from the UI (X, overlay, Done): drop the entry we added.
      if (pushedEntry.current) {
        pushedEntry.current = false;
        window.history.back();
      }
    };
  }, [open]);

  const canContinue =
    step === "industry"
      ? !!formData.industry
      : step === "qualification"
        ? !!formData.qualification
        : step === "experience"
          ? !!formData.yearsOfExperience && !!formData.workStatus
          : step === "background"
            ? !!formData.existingQualification && !!formData.stateLivedIn
            : true;

  // "Other industry" has no qualification list, so it skips that step.
  const goNext = () =>
    goTo(stepIndex === 0 && formData.industry === OTHER_INDUSTRY ? 2 : stepIndex + 1);

  const validateContact = () => {
    if (formData.fullName.trim().length < 2) return "Please enter your full name";
    if (!formData.email.includes("@")) return "Please enter a valid email address";
    if (formData.phoneNumber.replace(/\s/g, "").length < 8)
      return "Please enter a valid phone number";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== "contact") return;
    const problem = validateContact();
    if (problem) {
      setError(problem);
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const result = await saveEligibilityData(formData, getAttribution());
      if (result.error) {
        setError(result.error);
        return;
      }
      trackLead("eligibility", formData.qualification);
      onSubmitSuccess?.(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button size="lg" className="font-semibold">
      Check Your RPL Eligibility
    </Button>
  );

  const notListed = formData.qualification === OTHER_QUALIFICATION;
  const summary = [formData.industry, notListed ? "" : formData.qualification]
    .filter(Boolean)
    .join("  ›  ");

  // Someone who picked "Other industry" skips the qualification list entirely.
  const goBack = () =>
    goTo(stepIndex === 2 && formData.industry === OTHER_INDUSTRY ? 0 : stepIndex - 1);

  const firstName = formData.fullName.trim().split(" ")[0];

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "z-60 flex w-full max-w-full flex-col gap-0 overflow-hidden rounded-none p-0 max-sm:inset-0 max-sm:h-auto max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-2xl",
          className,
        )}
      >
        {isSubmitted ? (
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center">
            <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-brand-soft">
              <CheckCircle2 className="size-9 text-brand" />
            </span>
            <DialogTitle className="text-2xl font-bold text-ink">
              {firstName ? `Thanks ${firstName}, you're all set` : "You're all set"}
            </DialogTitle>
            <DialogDescription className="mt-2 max-w-sm text-gray-600">
              We&apos;re preparing your eligibility result
              {notListed ? "" : " for "}
              {!notListed && (
                <span className="font-semibold text-ink">{formData.qualification}</span>
              )}{" "}
              and will email it to <span className="font-semibold text-ink">{formData.email}</span>{" "}
              shortly.
            </DialogDescription>

            <ol className="mt-6 w-full max-w-sm space-y-3 text-left">
              {[
                "We review your answers.",
                "Your eligibility result lands in your inbox. Check your spam folder if you can't see it.",
                "A team member contacts you to talk through the next steps.",
              ].map((text, i) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ol>

            <Button
              className="mt-8 bg-brand px-8 text-white hover:bg-brand-strong"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* Header: progress + question */}
            <div className="shrink-0 border-b border-gray-100 bg-brand-soft px-5 pt-5 pb-4 sm:px-6">
              <div className="flex items-center justify-between pr-8">
                <p className="text-xs font-semibold tracking-wide text-brand-strong uppercase">
                  {title}
                </p>
                <p className="text-xs font-medium text-gray-600">
                  Step {stepIndex + 1} of {STEPS.length}
                </p>
              </div>
              <div className="mt-2 flex gap-1.5" aria-hidden>
                {STEPS.map((s, i) => (
                  <span
                    key={s}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i <= stepIndex ? "bg-brand" : "bg-brand-subtle",
                    )}
                  />
                ))}
              </div>
              <DialogTitle className="mt-4 text-xl leading-tight font-bold text-ink sm:text-2xl">
                {STEP_COPY[step].title}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-gray-600">
                {STEP_COPY[step].hint}
                <span className="sr-only"> {description}</span>
              </DialogDescription>
              {summary && (
                <p className="mt-3 truncate text-xs font-medium text-brand-strong" title={summary}>
                  {summary}
                </p>
              )}
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
              <div
                ref={bodyRef}
                className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6"
              >
                {step === "industry" && (
                  <div
                    role="radiogroup"
                    aria-label="Industry"
                    className="grid gap-2 sm:grid-cols-2"
                  >
                    {sections.map((s) => (
                      <OptionCard
                        key={s.id}
                        selected={formData.industry === s.title}
                        onSelect={() => {
                          set("industry", s.title);
                          goTo(1);
                        }}
                      >
                        {s.title}
                      </OptionCard>
                    ))}
                    <OptionCard
                      dashed
                      selected={formData.industry === OTHER_INDUSTRY}
                      onSelect={() => {
                        setFormData((prev) => ({
                          ...prev,
                          industry: OTHER_INDUSTRY,
                          qualification: OTHER_QUALIFICATION,
                        }));
                        goTo(2);
                      }}
                    >
                      My industry isn&apos;t listed
                    </OptionCard>
                  </div>
                )}

                {step === "qualification" && (
                  <>
                    {courses.length > 8 && (
                      <div className="relative">
                        <Search
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search qualifications"
                          aria-label="Search qualifications"
                          className="h-11 pl-9"
                        />
                      </div>
                    )}
                    <div role="radiogroup" aria-label="Qualification" className="grid gap-2">
                      {filteredCourses.map((c) => (
                        <OptionCard
                          key={c.id}
                          compact
                          selected={formData.qualification === c.title}
                          onSelect={() => {
                            set("qualification", c.title);
                            goTo(2);
                          }}
                        >
                          {c.title}
                        </OptionCard>
                      ))}
                      {filteredCourses.length === 0 && (
                        <p className="py-6 text-center text-sm text-gray-600">
                          No match. Try a different word, or choose &quot;not listed&quot; below.
                        </p>
                      )}
                      <OptionCard
                        compact
                        dashed
                        selected={notListed}
                        onSelect={() => {
                          set("qualification", OTHER_QUALIFICATION);
                          goTo(2);
                        }}
                      >
                        My qualification isn&apos;t listed / I&apos;m not sure
                      </OptionCard>
                    </div>
                  </>
                )}

                {step === "experience" && (
                  <>
                    <Question label="How many years have you worked in this field?">
                      {experienceYears.map((exp) => (
                        <Chip
                          key={exp.id}
                          selected={formData.yearsOfExperience === exp.id}
                          onSelect={() => set("yearsOfExperience", exp.id)}
                        >
                          {exp.name}
                        </Chip>
                      ))}
                    </Question>
                    <Question label="What best describes your work right now?">
                      {workStatuses.map((w) => (
                        <Chip
                          key={w.id}
                          selected={formData.workStatus === w.id}
                          onSelect={() => set("workStatus", w.id)}
                        >
                          {w.name}
                        </Chip>
                      ))}
                    </Question>
                  </>
                )}

                {step === "background" && (
                  <>
                    <Question label="Do you already hold a qualification?">
                      {existingQualifications.map((q) => (
                        <Chip
                          key={q.id}
                          selected={formData.existingQualification === q.id}
                          onSelect={() => set("existingQualification", q.id)}
                        >
                          {q.name}
                        </Chip>
                      ))}
                    </Question>
                    <Question label="Which state or territory do you live in?">
                      {australianStates.map((st) => (
                        <Chip
                          key={st.id}
                          label={st.name}
                          selected={formData.stateLivedIn === st.id}
                          onSelect={() => set("stateLivedIn", st.id)}
                        >
                          {st.id.toUpperCase()}
                        </Chip>
                      ))}
                    </Question>
                  </>
                )}

                {step === "contact" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full name <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        placeholder="Your full name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="Where we'll send your result"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">
                        Mobile number <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => set("phoneNumber", e.target.value)}
                        placeholder="04xx xxx xxx"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {notListed
                          ? "Which qualification are you after? (optional)"
                          : "Anything else we should know? (optional)"}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder={
                          notListed
                            ? "e.g. Certificate III in …, or describe the work you do"
                            : "Roles you've held, licences, questions…"
                        }
                        className="min-h-20"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="shrink-0 space-y-3 border-t border-gray-100 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {step === "contact" && (
                  <p className="text-xs text-gray-600">
                    By submitting you agree to our{" "}
                    <Link href="/terms-of-service" className="underline" target="_blank">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="underline" target="_blank">
                      Privacy Policy
                    </Link>{" "}
                    and that we may contact you about RPL.
                  </p>
                )}

                <div className="flex items-center justify-between gap-3">
                  {stepIndex > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => goBack()}
                      className="text-gray-700"
                    >
                      <ArrowLeft className="mr-1.5 size-4" />
                      Back
                    </Button>
                  ) : (
                    <span className="text-xs text-gray-600">Tap an answer to continue</span>
                  )}

                  {step !== "contact" ? (
                    <Button
                      key="continue"
                      type="button"
                      disabled={!canContinue}
                      onClick={goNext}
                      className="bg-brand px-6 text-white hover:bg-brand-strong"
                    >
                      Continue
                      <ArrowRight className="ml-1.5 size-4" />
                    </Button>
                  ) : step === "contact" ? (
                    <Button
                      key="submit"
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 bg-cta px-6 text-white hover:bg-cta-strong"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Get my eligibility result"
                      )}
                    </Button>
                  ) : null}
                </div>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
