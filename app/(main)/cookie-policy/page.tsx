import Link from "next/link";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Learn about how RPL Fast Track Australia uses cookies to enhance your browsing experience and protect your privacy.",
};

export default function CookiePolicy() {
  const email = process.env.NEXT_PUBLIC_EMAIL || "info@rplfasttrack.com";

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+61 123 456 789";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS || "123 Education Street, Sydney NSW 2000";
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Cookie Policy
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
              This Cookie Policy explains how RPL Fast Track (&quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) uses cookies and similar
              technologies on our website. This policy provides you with
              information about how we use cookies, what types of cookies we
              use, and how you can control them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile) when you visit a website. They are
              widely used to make websites work more efficiently and provide
              information to the website owners. Cookies enhance user experience
              by:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Remembering your preferences and settings</li>
              <li>Helping you navigate between pages efficiently</li>
              <li>Understanding how you interact with our website</li>
              <li>Enabling certain features and functionalities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Types of Cookies We Use
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              3.1 Essential Cookies
            </h3>
            <p>
              These cookies are necessary for the website to function properly.
              They enable core functionality such as security, network
              management, and account access. You cannot opt out of these
              cookies.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              3.2 Performance and Analytics Cookies
            </h3>
            <p>
              These cookies collect information about how visitors use our
              website, such as which pages they visit most often and if they
              receive error messages. This data helps us improve our website and
              your browsing experience. All information collected is aggregated
              and anonymous.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              3.3 Functional Cookies
            </h3>
            <p>
              These cookies allow the website to remember choices you make (such
              as your username, language, or region) and provide enhanced,
              personalized features. They may also be used to provide services
              you have requested, such as watching a video or commenting on a
              blog.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              3.4 Targeting and Advertising Cookies
            </h3>
            <p>
              These cookies are used to deliver advertisements that are more
              relevant to you and your interests. They are also used to limit
              the number of times you see an advertisement and help measure the
              effectiveness of advertising campaigns. They remember that you
              have visited a website and this information may be shared with
              other organizations, such as advertisers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Third-Party Cookies
            </h2>
            <p>
              Some cookies are placed by third parties on our website. These
              third parties may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Analytics providers (such as Google Analytics)</li>
              <li>
                Social media platforms (such as Facebook, Twitter, LinkedIn)
              </li>
              <li>Advertising networks</li>
              <li>Payment processors</li>
            </ul>
            <p>
              These third parties may use cookies, web beacons, and similar
              technologies to collect information about your use of our website
              and other websites. This information may be used to provide
              analytics, personalized advertising, and to measure the
              effectiveness of advertisements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Managing Cookies
            </h2>
            <p>
              Most web browsers allow you to control cookies through their
              settings. You can:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>View the cookies stored on your device</li>
              <li>Allow, block, or delete cookies</li>
              <li>Set preferences for certain websites</li>
            </ul>
            <p>
              To manage cookies in your browser, please refer to your
              browser&apos;s help section or visit:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <Link
                  href="https://support.google.com/chrome/answer/95647"
                  className="text-sky-600 hover:text-sky-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Chrome
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  className="text-sky-600 hover:text-sky-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mozilla Firefox
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  className="text-sky-600 hover:text-sky-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  className="text-sky-600 hover:text-sky-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Microsoft Edge
                </Link>
              </li>
            </ul>
            <p>
              Please note that restricting cookies may impact your experience on
              our website and limit the functionality we can provide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Changes to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in technology, regulation, or our business practices. Any
              changes will be posted on this page with an updated &quot;Last
              Updated&quot; date. We encourage you to check this page
              periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us at:
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
