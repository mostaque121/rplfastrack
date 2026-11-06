import { Clock, Mail, Phone } from "lucide-react";

import { businessHours, contactInfo } from "@/config/contact";

import ContactCommonForm from "./form/contact-common-form";

const DETAILS = [
  { icon: Mail, label: "Email us", value: contactInfo.email, href: contactInfo.emailHref },
  { icon: Phone, label: "Call us", value: contactInfo.phone, href: contactInfo.phoneHref },
];

/**
 * Contact section: one rounded card. Navy panel with the contact details on the left,
 * the form on the right. Stacks on mobile.
 */
export default function ContactSection() {
  return (
    <section className="w-full bg-white py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 shadow-xl lg:grid-cols-[2fr_3fr]">
          <div className="bg-gradient-to-br from-ink to-brand-deep p-6 text-white sm:p-8 lg:p-10">
            <p className="text-sm font-semibold tracking-wider text-brand-bright uppercase">
              Contact us
            </p>
            <h2 className="mt-2 text-3xl leading-tight font-bold text-white">
              Get in touch <span className="text-brand-bright">with us</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Call, email or fill out the form. We will reply shortly.
            </p>

            <ul className="mt-8 space-y-3">
              {DETAILS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-bright">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-wide text-slate-300 uppercase">
                        {label}
                      </span>
                      <span className="block font-semibold break-words text-white">{value}</span>
                    </span>
                  </>
                );
                const cls =
                  "flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3";
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className={`${cls} hover:bg-white/10`}>
                        {content}
                      </a>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Clock aria-hidden className="size-4 text-brand-bright" />
                Business hours
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                {businessHours.map(([day, time]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <dt className="text-slate-300">{day}</dt>
                    <dd className="font-medium text-white">{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ContactCommonForm />
        </div>
      </div>
    </section>
  );
}
