import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { contactInfo } from "@/config/contact";
import { absoluteUrl } from "@/lib/url";
export const metadata = {
  title: "Refund Policy",
  description:
    "Review RPL Fast Track’s refund policy to understand the terms and conditions regarding cancellations, eligibility, and refund procedures.",
  alternates: {
    canonical: absoluteUrl("/refund-policy"),
  },
};

export default function RefundPolicy() {
  return (
    <>
      <PageHero
        title="Refund Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]}
        intro={<p>Last Updated: March 13, 2026</p>}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">1. Introduction</h2>
              <p>
                This Refund Policy outlines the terms and conditions for refunds for services
                provided by RPL Fast Track. We strive to ensure complete satisfaction with our
                services, and this policy is designed to be fair and transparent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">2. Eligibility for Refunds</h2>

              <h3 className="mb-3 text-xl font-medium text-ink">
                2.1 Cancellation Before Assessment
              </h3>
              <p>If you cancel your RPL application before we begin the assessment process:</p>
              <ul className="mb-4 list-disc pl-6">
                <li>
                  Within 7 days of payment: A full refund will be issued, less a 10% non-refundable
                  administration fee deducted from the total deposit paid
                </li>
                <li>Between 8-14 days of payment: 75% refund</li>
                <li>Between 15-30 days of payment: 50% refund</li>
                <li>After 30 days of payment: No refund</li>
              </ul>

              <h3 className="mb-3 text-xl font-medium text-ink">
                2.2 Cancellation After Assessment Begins
              </h3>
              <p>
                Once we have begun the assessment process (including initial review of your
                documentation):
              </p>
              <ul className="mb-4 list-disc pl-6">
                <li>
                  No refund will be provided as resources have been allocated to your application
                </li>
              </ul>

              <h3 className="mb-3 text-xl font-medium text-ink">
                2.3 ASQA Decisions &amp; Partner RTO Responsibilities
              </h3>
              <p>
                RPL Fast Track operates solely as a{" "}
                <strong>recruitment and referral partner</strong> of our Registered Training
                Organisation (RTO). We facilitate the RPL process on behalf of the RTO but do not
                issue qualifications or certifications ourselves.
              </p>
              <p className="mt-2">
                Any decision made by ASQA (Australian Skills Quality Authority) — including audits,
                sanctions, suspension, or cancellation of certificates issued by our partner RTO —
                is entirely outside the control and responsibility of RPL Fast Track. In such cases:
              </p>
              <ul className="mt-2 mb-4 list-disc pl-6">
                <li>
                  RPL Fast Track bears <strong>no liability</strong> for any outcome resulting from
                  ASQA&apos;s decisions or actions taken against the RTO
                </li>
                <li>
                  The <strong>RTO is solely responsible</strong> for all matters relating to the
                  issuance, validity, and compliance of certificates under its scope of registration
                </li>
                <li>
                  <strong>No refund will be provided</strong> by RPL Fast Track in relation to any
                  such circumstances
                </li>
              </ul>

              <h3 className="mb-3 text-xl font-medium text-ink">2.4 Unsuccessful Applications</h3>
              <p>If your RPL application is unsuccessful:</p>
              <ul className="mb-4 list-disc pl-6">
                <li>A 100% refund will be provided as the application was not successful</li>
                <li>We will provide feedback on why the application was unsuccessful</li>
                <li>
                  We may offer guidance on additional evidence or training needed for a future
                  application
                </li>
              </ul>

              <h3 className="mb-3 text-xl font-medium text-ink">2.5 Unsuccessful Applications</h3>
              <p>If your RPL application is unsuccessful:</p>
              <ul className="mb-4 list-disc pl-6">
                <li>A 100% refund will be provided as the application was not successful</li>
                <li>We will provide feedback on why the application was unsuccessful</li>
                <li>
                  We may offer guidance on additional evidence or training needed for a future
                  application
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">3. Special Circumstances</h2>
              <p>We understand that exceptional circumstances may arise. In cases of:</p>
              <ul className="mb-4 list-disc pl-6">
                <li>Serious illness or injury (with medical documentation)</li>
                <li>Bereavement of an immediate family member</li>
                <li>Natural disaster or severe unforeseen circumstances</li>
              </ul>
              <p>
                We will review requests for refunds on a case-by-case basis. Please contact our
                support team with relevant documentation to discuss your situation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">4. How to Request a Refund</h2>
              <p>To request a refund:</p>
              <ol className="mb-4 list-decimal pl-6">
                <li>
                  Contact our support team at{" "}
                  <Link href={contactInfo.emailHref} className="text-brand hover:text-brand-strong">
                    {contactInfo.email}
                  </Link>
                </li>
                <li>Include your full name, contact information, and order/transaction ID</li>
                <li>Clearly state the reason for your refund request</li>
                <li>Provide any supporting documentation if applicable</li>
              </ol>
              <p>
                We will acknowledge your request within 2 business days and aim to process eligible
                refunds within 10 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">5. Refund Processing</h2>
              <p>
                Approved refunds will be processed using the original payment method whenever
                possible:
              </p>
              <ul className="mb-4 list-disc pl-6">
                <li>
                  Credit/debit card refunds typically take 5-10 business days to appear on your
                  statement
                </li>
                <li>Bank transfers may take 3-5 business days</li>
                <li>Alternative refund methods may be arranged in special circumstances</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-ink">6. Changes to This Policy</h2>
              <p>
                We reserve the right to modify this Refund Policy at any time. Changes will be
                effective immediately upon posting to our website. It is your responsibility to
                review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-ink">7. Contact Us</h2>
              <p>If you have questions about this Refund Policy, please contact us at:</p>
              <div className="mt-4">
                <p>
                  <strong>RPL Fast Track</strong>
                </p>
                <p>
                  Email:{" "}
                  <Link
                    prefetch={false}
                    href={contactInfo.emailHref}
                    className="text-brand hover:text-brand-strong"
                  >
                    {contactInfo.email}
                  </Link>
                </p>
                <p>
                  Phone:{" "}
                  <Link
                    prefetch={false}
                    href={contactInfo.phoneHref}
                    className="text-brand hover:text-brand-strong"
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
    </>
  );
}
