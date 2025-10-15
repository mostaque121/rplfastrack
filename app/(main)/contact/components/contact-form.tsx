"use client";

import { useRPL } from "@/contexts/rpl-context";
import { Send } from "lucide-react";
import { useState } from "react";
import { createContact } from "../../action/response";

export default function ContactForm() {
  const { sections } = useRPL();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    qualification: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      const result = await createContact(formData);

      if (result.success) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          industry: "",
          qualification: "",
          message: "",
        });
      } else {
        setFormStatus("error");
        console.error("Submission failed:", result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFormStatus("error");
    }
  };

  const selectedIndustry = sections.find(
    (section) => section.title === formData.industry
  );

  return (
    <div className="bg-gray-50 p-4 md:p-8 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Industry */}
        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700"
          >
            Industry (optional)
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          >
            <option value="">Select an industry</option>
            {sections.map((section) => (
              <option key={section.title} value={section.title}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {/* Qualification (based on selected industry) */}
        {selectedIndustry?.courses && selectedIndustry.courses.length > 0 && (
          <div>
            <label
              htmlFor="qualification"
              className="block text-sm font-medium text-gray-700"
            >
              Qualification (optional)
            </label>
            <select
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              <option value="">Select a qualification</option>
              {selectedIndustry.courses.map((course) => (
                <option key={course.title} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={formStatus === "submitting"}
            className="w-full inline-flex cursor-pointer items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {formStatus === "submitting" ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>

        {/* Feedback */}
        {formStatus === "success" && (
          <AlertBox
            type="success"
            message="Thank you for your message! We'll get back to you shortly."
          />
        )}
        {formStatus === "error" && (
          <AlertBox
            type="error"
            message="There was an error sending your message. Please try again."
          />
        )}
      </form>
    </div>
  );
}

// Alert component
function AlertBox({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const Icon = type === "success" ? CheckCircleIcon : XCircleIcon;

  return (
    <div
      className={`rounded-md ${
        type === "success" ? "bg-green-50" : "bg-red-50"
      } p-4 mt-4`}
    >
      <div className="flex">
        <Icon
          className={`h-5 w-5  ${
            type === "success" ? "bg-green-400" : "bg-red-400"
          }`}
          aria-hidden="true"
        />
        <div className="ml-3">
          <p
            className={`text-sm font-medium ${
              type === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

// Icons
const XCircleIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
