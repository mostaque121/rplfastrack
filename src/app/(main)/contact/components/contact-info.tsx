import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { contactInfo } from "@/config/contact";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-ink">Get in Touch</h2>
      <p className="mt-4 text-lg text-gray-500">
        Have questions about RPL or ready to start your assessment? Our team is here to help you
        every step of the way.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8">
        {/* Phone */}
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-brand-subtle">
          <a href={contactInfo.phoneHref} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center px-4 py-5 sm:p-6">
              <div className="rounded-md bg-indigo-500 p-3">
                <FaPhoneAlt className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-lg font-medium text-brand hover:text-brand-strong">
                    {contactInfo.phone}
                  </dd>
                </dl>
              </div>
            </div>
          </a>
        </div>

        {/* Email */}
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-brand-subtle">
          <a href={contactInfo.emailHref} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center px-4 py-5 sm:p-6">
              <div className="rounded-md bg-green-500 p-3">
                <FaEnvelope className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-lg font-medium text-brand hover:text-brand-strong">
                    {contactInfo.email}
                  </dd>
                </dl>
              </div>
            </div>
          </a>
        </div>

        {/* WhatsApp */}
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-brand-subtle">
          <a href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center px-4 py-5 sm:p-6">
              <div className="rounded-md bg-green-400 p-3">
                <FaWhatsapp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">WhatsApp</dt>
                  <dd className="text-lg font-medium text-brand hover:text-brand-strong">
                    {contactInfo.whatsapp}
                  </dd>
                </dl>
              </div>
            </div>
          </a>
        </div>
        {/* Address (No link) */}
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-brand-subtle">
          <div className="flex items-center px-4 py-5 sm:p-6">
            <div className="rounded-md bg-red-600 p-3">
              <FaLocationDot className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">Address</dt>
                <dd className="text-lg font-medium text-ink">{contactInfo.address}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
