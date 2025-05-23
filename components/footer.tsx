import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const email = process.env.NEXT_PUBLIC_EMAIL || "info@rplfasttrack.com";

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+61 123 456 789";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS || "123 Education Street, Sydney NSW 2000";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pb-10 text-white text">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white border-b border-slate-700 pb-1">
              About Us
            </h3>
            <Image
              src="/fav.png"
              alt="RPL Fast Track Logo"
              width={100}
              height={30}
              className="h-10  w-auto m-3"
            />
            <p className="text-slate-300 mb-2 text-sm">
              We help professionals get recognized for their skills through the
              RPL process, empowering career advancement.
            </p>
            <Link
              href="/about"
              className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs inline-flex items-center"
            >
              Learn More <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white border-b border-slate-700 pb-1">
              Quick Links
            </h3>
            <ul className="text-slate-300 space-y-1 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-emerald-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white border-b border-slate-700 pb-1">
              Legal
            </h3>
            <ul className="text-slate-300 space-y-1 text-sm">
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-white border-b border-slate-700 pb-1">
              Contact Us
            </h3>
            <ul className="text-slate-300 space-y-1 text-sm">
              <li className="flex items-center">
                <Phone className="w-3 h-3 mr-1 text-emerald-400 flex-shrink-0 mt-0.5" />
                <Link
                  href={`tel:${phoneNumber}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {phoneNumber}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="w-3 h-3 mr-1 text-emerald-400 flex-shrink-0 mt-0.5" />
                <Link
                  href={`mailto:${email}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {email}
                </Link>
              </li>
              <li className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-3 h-3 mr-1 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Mon-Fri: 9AM-5PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="text-center sm:text-center text-xs text-slate-400">
          <p>&copy; {currentYear} RPL Fast Track. All Rights Reserved.</p>
        </div>
      </div>
      <p className="text-center text-sm">
        Designed by{" "}
        <Link
          href="https://www.webngraphic.com"
          className="text-emerald-400 hover:text-blue-500 font-semibold transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          WebNGraphic
        </Link>
      </p>
    </footer>
  );
}
