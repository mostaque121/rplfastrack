import Link from "next/link";

import { contactInfo } from "@/config/contact";
import { absoluteUrl } from "@/lib/url";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read RPL Fast Track's Privacy Policy to understand how we collect, use, and protect your personal information in accordance with Australian laws.",
  alternates: {
    canonical: absoluteUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">Last Updated: May 10, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p>
              At RPL Fast Track (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect
              your privacy and are committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this
              Privacy Policy, please do not access the site or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Information We Collect</h2>

            <h3 className="mb-3 text-xl font-medium text-gray-900">2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Register for an account</li>
              <li>Express interest in obtaining information about our services</li>
              <li>Participate in activities on our website</li>
              <li>Contact us with inquiries or for support</li>
            </ul>
            <p>
              Personal information may include your name, email address, phone number, postal
              address, educational background, employment history, and any other information you
              choose to provide.
            </p>

            <h3 className="mb-3 text-xl font-medium text-gray-900">
              2.2 Automatically Collected Information
            </h3>
            <p>
              When you visit our website, we may automatically collect certain information about
              your device, including:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on those pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              3. How We Use Your Information
            </h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Provide, operate, and maintain our services</li>
              <li>Process and complete transactions</li>
              <li>
                Send administrative information, such as updates, security alerts, and support
                messages
              </li>
              <li>Respond to inquiries and offer support</li>
              <li>Improve our website and services</li>
              <li>Develop new products, services, and features</li>
              <li>Communicate with you about promotions, upcoming events, and other news</li>
              <li>
                Protect, investigate, and deter against fraudulent, unauthorized, or illegal
                activity
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              4. Disclosure of Your Information
            </h2>
            <p>We may share your information in the following situations:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>
                <strong>With Service Providers:</strong> We may share your information with
                third-party vendors, service providers, and other third parties who perform services
                for us.
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share or transfer your information in
                connection with a merger, acquisition, reorganization, or sale of all or a portion
                of our assets.
              </li>
              <li>
                <strong>Legal Obligations:</strong> We may disclose your information where required
                to do so by law or in response to valid requests by public authorities.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your information for any other
                purpose with your consent.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal
              information, including:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the
              &quot;Contact Us&quot; section below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security
              of your personal information. However, please be aware that no method of transmission
              over the internet or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be
              indicated by an updated &quot;Last Updated&quot; date. We encourage you to review this
              Privacy Policy frequently to stay informed about how we are protecting your
              information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our practices, please
              contact us at:
            </p>
            <div className="mt-4">
              <p>
                <strong>RPL Fast Track</strong>
              </p>
              <p>
                Email:{" "}
                <Link
                  prefetch={false}
                  href={contactInfo.emailHref}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {contactInfo.email}
                </Link>
              </p>
              <p>
                Phone:{" "}
                <Link
                  prefetch={false}
                  href={contactInfo.phoneHref}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {contactInfo.phone}
                </Link>
              </p>
              <p>Address: {contactInfo.address}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
