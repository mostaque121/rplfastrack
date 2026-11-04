import { Mail, MapPin, Phone } from "lucide-react";

import { contactInfo } from "@/config/contact";

import ContactCommonForm from "./form/contact-common-form";

export default function ContactSection() {
  return (
    <section className="w-full bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get In Touch <span className="text-brand">With Us</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Reach out via the options below or fill out the form—we’ll reply shortly.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-ink">Email Us</h3>
                  <a
                    href={contactInfo.emailHref}
                    className="text-brand transition-colors hover:text-brand-strong"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-ink">Call Us</h3>
                  <a
                    href={contactInfo.phoneHref}
                    className="text-brand transition-colors hover:text-brand-strong"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-ink">Visit Us</h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-xl border-2 border-brand-subtle bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-ink">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-ink">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-ink">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-ink">Closed</span>
                </div>
              </div>
            </div>
          </div>
          <ContactCommonForm />
        </div>
      </div>
    </section>
  );
}
