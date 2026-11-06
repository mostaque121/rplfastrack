"use client";

import {
  Briefcase,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  User,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { useRPL } from "@/contexts/rpl-context";
import { createContact } from "@/features/leads/actions";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track-lead";

import type { ReactNode } from "react";

const EMPTY = { name: "", email: "", phone: "", industry: "", qualification: "", message: "" };

const FIELD =
  "block h-12 w-full rounded-xl border border-gray-200 bg-surface pr-3.5 pl-11 text-base text-ink transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 focus:outline-none";
const LABEL = "mb-1.5 block text-sm font-semibold text-ink";

/** Label + input with a leading icon. */
function Field({
  id,
  label,
  icon: Icon,
  optional,
  children,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional ? (
          <span className="font-normal text-gray-500"> (optional)</span>
        ) : (
          <span className="text-red-600"> *</span>
        )}
      </label>
      <div className="relative">
        <Icon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-gray-400"
        />
        {children}
      </div>
    </div>
  );
}

/** Right panel of the contact card. */
export default function ContactForm() {
  const { sections } = useRPL();
  const [formData, setFormData] = useState(EMPTY);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "industry" && { qualification: "" }), // Reset qualification if industry changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const result = await createContact(formData, getAttribution());

      if (result.success) {
        trackLead("contact", formData.qualification || formData.industry);
        setFormStatus("success");
        setFormData(EMPTY);
      } else {
        setFormStatus("error");
        console.error("Submission failed:", result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFormStatus("error");
    }
  };

  const selectedIndustry = sections.find((section) => section.title === formData.industry);
  const hasCourses = !!selectedIndustry?.courses && selectedIndustry.courses.length > 0;

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl font-bold text-ink md:text-3xl">Send us a message</h2>
      <p className="mt-2 text-gray-600">
        Tell us a little about your work history and we will come back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Field id="name" label="Full name" icon={User}>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className={FIELD}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="email" label="Email" icon={Mail}>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={FIELD}
            />
          </Field>
          <Field id="phone" label="Phone" icon={Phone}>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              placeholder="04xx xxx xxx"
              value={formData.phone}
              onChange={handleChange}
              required
              className={FIELD}
            />
          </Field>
        </div>

        <div className={hasCourses ? "grid gap-5 sm:grid-cols-2" : undefined}>
          <Field id="industry" label="Industry" icon={Briefcase} optional>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={FIELD}
            >
              <option value="">Select an industry</option>
              {sections.map((section) => (
                <option key={section.title} value={section.title}>
                  {section.title}
                </option>
              ))}
            </select>
          </Field>

          {hasCourses && (
            <Field id="qualification" label="Qualification" icon={Briefcase} optional>
              <select
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className={FIELD}
              >
                <option value="">Select a qualification</option>
                {selectedIndustry!.courses!.map((course) => (
                  <option key={course.title} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>

        <div>
          <label htmlFor="message" className={LABEL}>
            Message <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="e.g. I have 5 years of experience in aged care and want a Certificate III."
            className="block w-full rounded-xl border border-gray-200 bg-surface px-3.5 py-3 text-base text-ink transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={formStatus === "submitting"}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-6 text-base font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-cta-strong focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {formStatus === "submitting" ? (
            <>
              <Loader2 aria-hidden className="size-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send aria-hidden className="size-5" />
              Send message
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-sm text-gray-500">
          <ShieldCheck aria-hidden className="size-4 text-brand" />
          Free, no obligation. We never share your details.
        </p>

        <div aria-live="polite">
          {formStatus === "success" && (
            <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
              <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
              <p className="text-sm font-medium">
                Thank you for your message! We will get back to you shortly.
              </p>
            </div>
          )}
          {formStatus === "error" && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
              <XCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
              <p className="text-sm font-medium">
                There was an error sending your message. Please try again or call us.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
