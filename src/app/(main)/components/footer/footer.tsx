import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FacebookIcon } from "@/components/icon/facebook-icon";
import { contactInfo } from "@/config/contact";
import { socialLinks } from "@/config/social";
import { listSections } from "@/features/courses/queries";

const COMPANY_LINKS = [
  { label: "How RPL works", href: "/about-rpl" },
  { label: "RPL guides", href: "/guides" },
  { label: "About us", href: "/about-us" },
  { label: "All qualifications", href: "/courses" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const linkClass = "block py-1.5 text-sm text-slate-300 transition-colors hover:text-white";

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-3 text-sm font-semibold tracking-wider text-brand-bright uppercase">
      {children}
    </h3>
  );
}

/**
 * Site footer: brand + contact, industries, popular qualifications, company links.
 * Industry and qualification links give every page a crawlable path to the money pages.
 * Server component; the section list is the same cached read used by the navbar.
 */
export default async function Footer() {
  const sections = await listSections();
  const popular = sections.flatMap((section) => section.courses?.slice(0, 1) ?? []).slice(0, 6);
  const year = new Date().getFullYear();

  // max-md:pb-20 keeps the sticky mobile CTA bar from covering the bottom row
  return (
    <footer className="bg-ink text-slate-300 max-md:pb-20">
      <div className="container mx-auto px-4 pt-14 pb-8 md:px-8 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1.3fr_1fr] lg:gap-12">
          {/* Brand + contact */}
          <div>
            <Link prefetch={false} href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/fav.png"
                sizes="40px"
                alt=""
                width={512}
                height={512}
                className="h-10 w-auto object-contain"
              />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                RPL FAST TRACK
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm">
              We help Australians turn their work experience into a nationally recognised
              qualification through Recognition of Prior Learning (RPL), 100% online.
            </p>

            <ul className="mt-5 space-y-1 text-sm">
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="flex min-h-10 items-center gap-3 hover:text-white"
                >
                  <Phone aria-hidden className="size-4 shrink-0 text-brand-bright" />
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.emailHref}
                  className="flex min-h-10 items-center gap-3 hover:text-white"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-brand-bright" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2">
                <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-bright" />
                Mon–Fri 9am–5pm, Sat 10am–2pm
              </li>
              <li className="flex items-start gap-3 py-2">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-bright" />
                {contactInfo.address}
              </li>
            </ul>

            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RPL Fast Track on Facebook"
              className="mt-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>

          {/* Industries + Company side by side on mobile */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            <nav aria-label="Industries">
              <FooterHeading>Industries</FooterHeading>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link prefetch={false} href={`/section/${section.link}`} className={linkClass}>
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Placed after Company on mobile via order, third column on desktop */}
            <nav aria-label="Company" className="lg:order-last">
              <FooterHeading>Company</FooterHeading>
              <ul>
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link prefetch={false} href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <nav aria-label="Popular qualifications" className="lg:order-3">
            <FooterHeading>Popular qualifications</FooterHeading>
            <ul>
              {popular.map((course) => (
                <li key={course.id}>
                  <Link prefetch={false} href={`/courses/${course.link}`} className={linkClass}>
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-4xl text-xs text-slate-400">
            RPL Fast Track is an independent referral partner. Qualifications are assessed and
            issued by registered training organisations (RTOs).
          </p>
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    prefetch={false}
                    href={link.href}
                    className="inline-block py-1.5 text-slate-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-xs text-slate-400 md:text-right">
              <p>&copy; {year} RPL Fast Track. All rights reserved.</p>
              <p className="mt-1">
                Designed by{" "}
                <Link
                  prefetch={false}
                  href="https://www.webngraphic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-bright hover:text-white"
                >
                  WebNGraphic
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
