import { Mail, MapPin, Phone } from "lucide-react";

import ContactCommonForm from "@/components/contact-common-form";

export default function ContactSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#F5F7FA] dark:bg-gray-950">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get In Touch <span className="text-emerald-600">With Us</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Reach out via the options below or fill out the form—we’ll reply
              shortly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 dark:bg-emerald-900">
                  <Mail className="h-6 w-6 text-white dark:text-emerald-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@rplfastrack.com"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    info@rplfastrack.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 dark:bg-emerald-900">
                  <Phone className="h-6 w-6 text-white dark:text-emerald-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Call Us
                  </h3>
                  <a
                    href="tel:+61483921139"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    +61 483 921 139
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 dark:bg-emerald-900">
                  <MapPin className="h-6 w-6 text-white  dark:text-emerald-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    41 Hilton Way, Melton West VIC 3337, Australia
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6  border-emerald-200 border-2 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Business Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Monday - Friday
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    9:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Saturday
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    10:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sunday
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Closed
                  </span>
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
