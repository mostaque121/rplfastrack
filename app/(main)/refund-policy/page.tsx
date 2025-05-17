import Link from "next/link";
export const metadata = {
  title: "Refund Policy",
  description:
    "Review RPL Fast Track’s refund policy to understand the terms and conditions regarding cancellations, eligibility, and refund procedures.",
  alternates: {
    canonical: "https://rplfastrack.com/refund-policy",
  },
};

export default function RefundPolicy() {
  const email = process.env.NEXT_PUBLIC_EMAIL || "info@rplfasttrack.com";

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+61 123 456 789";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS || "123 Education Street, Sydney NSW 2000";
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Refund Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last Updated: May 10, 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p>
              This Refund Policy outlines the terms and conditions for refunds
              for services provided by RPL Fast Track. We strive to ensure
              complete satisfaction with our services, and this policy is
              designed to be fair and transparent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Eligibility for Refunds
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              2.1 Cancellation Before Assessment
            </h3>
            <p>
              If you cancel your RPL application before we begin the assessment
              process:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Within 7 days of payment: Full refund minus a $100
                administration fee
              </li>
              <li>Between 8-14 days of payment: 75% refund</li>
              <li>Between 15-30 days of payment: 50% refund</li>
              <li>After 30 days of payment: No refund</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              2.2 Cancellation After Assessment Begins
            </h3>
            <p>
              Once we have begun the assessment process (including initial
              review of your documentation):
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                No refund will be provided as resources have been allocated to
                your application
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              2.3 Unsuccessful Applications
            </h3>
            <p>If your RPL application is unsuccessful:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                No refund will be provided as the assessment service has been
                delivered
              </li>
              <li>
                We will provide feedback on why the application was unsuccessful
              </li>
              <li>
                We may offer guidance on additional evidence or training needed
                for a future application
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Special Circumstances
            </h2>
            <p>
              We understand that exceptional circumstances may arise. In cases
              of:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Serious illness or injury (with medical documentation)</li>
              <li>Bereavement of an immediate family member</li>
              <li>Natural disaster or severe unforeseen circumstances</li>
            </ul>
            <p>
              We will review requests for refunds on a case-by-case basis.
              Please contact our support team with relevant documentation to
              discuss your situation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. How to Request a Refund
            </h2>
            <p>To request a refund:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>
                Contact our support team at{" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {email}
                </Link>
              </li>
              <li>
                Include your full name, contact information, and
                order/transaction ID
              </li>
              <li>Clearly state the reason for your refund request</li>
              <li>Provide any supporting documentation if applicable</li>
            </ol>
            <p>
              We will acknowledge your request within 2 business days and aim to
              process eligible refunds within 10 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Refund Processing
            </h2>
            <p>
              Approved refunds will be processed using the original payment
              method whenever possible:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Credit/debit card refunds typically take 5-10 business days to
                appear on your statement
              </li>
              <li>Bank transfers may take 3-5 business days</li>
              <li>
                Alternative refund methods may be arranged in special
                circumstances
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Changes to This Policy
            </h2>
            <p>
              We reserve the right to modify this Refund Policy at any time.
              Changes will be effective immediately upon posting to our website.
              It is your responsibility to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have questions about this Refund Policy, please contact us
              at:
            </p>
            <div className="mt-4">
              <p>
                <strong>RPL Fast Track</strong>
              </p>
              <p>
                Email:{" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {email}
                </Link>
              </p>
              <p>
                Phone:{" "}
                <Link
                  href={`tel:${phoneNumber}`}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {phoneNumber}
                </Link>
              </p>
              <p>Address: {address}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
