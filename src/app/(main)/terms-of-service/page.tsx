import Link from "next/link";

import { contactInfo } from "@/config/contact";
import { absoluteUrl } from "@/lib/url";

export const metadata = {
  title: "Terms of Service - RPL Fast Track",
  description:
    "Read the Terms of Service for RPL Fast Track to understand your rights, responsibilities, and the conditions of using our RPL services.",
  alternates: {
    canonical: absoluteUrl("/terms-of-service"),
  },
};

export default function TermsOfService() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-600">Last Updated: March 13, 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p>
              Welcome to RPL Fast Track. These Terms of Service (&quot;Terms&quot;) govern your use
              of our website and services. By accessing our website or using our services, you agree
              to be bound by these Terms. If you disagree with any part of these Terms, you may not
              access our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Definitions</h2>
            <p>Throughout these Terms, the following definitions apply:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>
                <strong>&quot;RPL&quot;</strong> means Recognition of Prior Learning
              </li>
              <li>
                <strong>&quot;Service&quot;</strong> refers to the RPL assessment and related
                services provided by RPL Fast Track
              </li>
              <li>
                <strong>&quot;Website&quot;</strong> refers to the RPL Fast Track website
              </li>
              <li>
                <strong>&quot;User,&quot; &quot;You,&quot; and &quot;Your&quot;</strong> refer to
                the individual accessing the Website or using the Service
              </li>
              <li>
                <strong>&quot;We,&quot; &quot;Us,&quot; and &quot;Our&quot;</strong> refer to RPL
                Fast Track
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Services</h2>
            <p>
              RPL Fast Track provides Recognition of Prior Learning assessment services to help
              individuals obtain formal qualifications based on their existing skills, knowledge,
              and experience. Our services include:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>Initial consultation and eligibility assessment</li>
              <li>Guidance on evidence collection and documentation</li>
              <li>Assessment of skills and knowledge against qualification standards</li>
              <li>Processing of RPL applications</li>
              <li>Issuance of qualifications or statements of attainment (where applicable)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. User Responsibilities</h2>
            <p>When using our services, you agree to:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Provide accurate, truthful, and complete information</li>
              <li>Submit authentic evidence and documentation</li>
              <li>Participate in assessment activities as required</li>
              <li>Respond to requests for additional information in a timely manner</li>
              <li>Pay all applicable fees as outlined in our pricing structure</li>
              <li>Comply with all relevant laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, audio clips,
              digital downloads, data compilations, and software, is the property of RPL Fast Track
              or its content suppliers and is protected by Australian and international copyright
              laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly
              display, publicly perform, republish, download, store, or transmit any of the material
              on our website without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Privacy</h2>
            <p>
              Your privacy is important to us. Our Privacy Policy, which is incorporated into these
              Terms by reference, explains how we collect, use, and protect your personal
              information. By using our services, you consent to the collection and use of
              information as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Payment Terms</h2>
            <p>
              Payment for our services must be made according to the pricing and payment terms
              specified at the time of engagement. All fees are in Australian Dollars (AUD) unless
              otherwise stated.
            </p>
            <p>
              We reserve the right to change our prices at any time, but changes will not affect
              services for which you have already paid.
            </p>
            <p>
              Refunds are subject to our{" "}
              <Link
                href="/refund-policy"
                className="font-medium text-emerald-600 hover:text-emerald-800"
              >
                Refund Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Refund Policy</h2>
            <p>
              RPL Fast Track maintains a clear and transparent Refund Policy that governs all refund
              requests in relation to our services. By engaging our services and making payment, you
              acknowledge that you have read and agreed to the terms outlined in our Refund Policy.
            </p>
            <p className="mt-2">Key points of our Refund Policy include:</p>
            <ul className="mt-2 mb-4 list-disc pl-6">
              <li>
                Cancellations made within 7 days of payment are eligible for a full refund, less a
                10% non-refundable administration fee deducted from the total deposit paid
              </li>
              <li>
                Once the assessment process has commenced, no refund will be issued as resources
                have been allocated to your application
              </li>
              <li>
                RPL Fast Track operates solely as a recruitment and referral partner of our
                Registered Training Organisation (RTO). We are not responsible for any decisions
                made by ASQA or outcomes related to certificates issued by our partner RTO, and no
                refund will be provided in such circumstances
              </li>
              <li>
                Special circumstances such as serious illness or bereavement may be considered on a
                case-by-case basis
              </li>
            </ul>
            <p>
              For full details, please review our{" "}
              <Link
                href="/refund-policy"
                className="font-medium text-emerald-600 hover:text-emerald-800"
              >
                Refund Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, RPL Fast Track shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly, or any loss of data,
              use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>Your use or inability to use our services</li>
              <li>
                Any unauthorized access to or use of our servers and/or any personal information
                stored therein
              </li>
              <li>Any interruption or cessation of transmission to or from our website</li>
              <li>
                Any bugs, viruses, trojan horses, or the like that may be transmitted to or through
                our website
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless RPL Fast Track, its officers,
              directors, employees, and agents, from and against any claims, liabilities, damages,
              losses, and expenses, including, without limitation, reasonable legal and accounting
              fees, arising out of or in any way connected with your access to or use of our
              services or your violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">11. Termination</h2>
            <p>
              We may terminate or suspend your access to our services immediately, without prior
              notice or liability, for any reason whatsoever, including, without limitation, if you
              breach these Terms.
            </p>
            <p>
              Upon termination, your right to use our services will immediately cease. If you wish
              to terminate your account, you may simply discontinue using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              Australia. Any dispute arising under these Terms shall be subject to the exclusive
              jurisdiction of the courts of Australia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any
              significant changes by posting the new Terms on our website and updating the
              &quot;Last Updated&quot; date. Your continued use of our services after any such
              changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">14. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
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
