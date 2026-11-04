import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { contactInfo } from "@/config/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text bg-ink pb-10 text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="mb-2 border-b border-slate-700 pb-1 text-base font-semibold text-white">
              About Us
            </h3>
            <Image
              src="/fav.png"
              sizes="40px"
              alt="RPL Fast Track Logo"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
            <p className="mb-2 text-sm text-slate-300">
              We help professionals get recognized for their skills through the RPL process,
              empowering career advancement.
            </p>
            <Link
              prefetch={false}
              href="/about-us"
              className="inline-flex items-center text-sm text-brand-bright transition-colors hover:text-white"
            >
              Learn More <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 border-b border-slate-700 pb-1 text-base font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>
                <Link
                  prefetch={false}
                  href="/"
                  className="transition-colors hover:text-brand-bright"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/courses"
                  className="transition-colors hover:text-brand-bright"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/about-us"
                  className="transition-colors hover:text-brand-bright"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/faq"
                  className="transition-colors hover:text-brand-bright"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/contact"
                  className="transition-colors hover:text-brand-bright"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-2 border-b border-slate-700 pb-1 text-base font-semibold text-white">
              Legal
            </h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>
                <Link
                  prefetch={false}
                  href="/terms-of-service"
                  className="transition-colors hover:text-brand-bright"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/privacy-policy"
                  className="transition-colors hover:text-brand-bright"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/refund-policy"
                  className="transition-colors hover:text-brand-bright"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/cookie-policy"
                  className="transition-colors hover:text-brand-bright"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-2 border-b border-slate-700 pb-1 text-base font-semibold text-white">
              Contact Us
            </h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-center">
                <Phone className="mt-0.5 mr-1 h-3 w-3 flex-shrink-0 text-brand-bright" />
                <Link
                  prefetch={false}
                  href={contactInfo.phoneHref}
                  className="transition-colors hover:text-brand-bright"
                >
                  {contactInfo.phone}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="mt-0.5 mr-1 h-3 w-3 flex-shrink-0 text-brand-bright" />
                <Link
                  prefetch={false}
                  href={contactInfo.emailHref}
                  className="transition-colors hover:text-brand-bright"
                >
                  {contactInfo.email}
                </Link>
              </li>
              <li className="flex items-center">
                <MapPin className="mt-0.5 mr-1 h-3 w-3 flex-shrink-0 text-brand-bright" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Clock className="mt-0.5 mr-1 h-3 w-3 flex-shrink-0 text-brand-bright" />
                <span>Mon-Fri: 9AM-5PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="mt-8 text-center text-xs text-slate-400 sm:text-center">
          <p>&copy; {currentYear} RPL Fast Track. All Rights Reserved.</p>
        </div>
      </div>
      <p className="text-center text-sm">
        Designed by:{" "}
        <Link
          prefetch={false}
          href="https://www.webngraphic.com"
          className="font-semibold text-brand-bright transition-colors hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          WebNGraphic
        </Link>
      </p>
    </footer>
  );
}
