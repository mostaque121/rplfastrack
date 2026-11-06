import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { businessHours, contactInfo } from "@/config/contact";

const CHANNELS = [
  {
    icon: Phone,
    label: "Call us",
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contactInfo.whatsapp,
    href: contactInfo.whatsappHref,
  },
  {
    icon: Mail,
    label: "Email us",
    value: contactInfo.email,
    href: contactInfo.emailHref,
  },
];

/** Left panel of the contact card: navy, with the ways to reach us, the address and the hours. */
export default function ContactInfo() {
  return (
    <div className="relative isolate overflow-hidden bg-linear-to-br from-ink via-ink to-brand-deep p-6 text-white sm:p-8 lg:p-10">
      {/* Decorative rings. */}
      <div
        aria-hidden
        className="absolute -right-20 -bottom-20 -z-10 size-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute -right-8 -bottom-8 -z-10 size-48 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute -top-16 -left-16 -z-10 size-56 rounded-full bg-brand/25 blur-3xl"
      />

      <p className="text-sm font-semibold tracking-wider text-brand-bright uppercase">
        Get in touch
      </p>
      <h2 className="mt-2 text-3xl leading-tight font-bold">
        Talk to an <span className="text-brand-bright">RPL consultant</span>
      </h2>
      <p className="mt-3 text-slate-300">
        Choose the way that suits you. The first conversation is free, with no obligation.
      </p>

      <ul className="mt-8 space-y-3">
        {CHANNELS.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-brand-bright/40 hover:bg-white/10"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-bright/15 text-brand-bright transition-colors group-hover:bg-brand-bright group-hover:text-ink">
                <Icon aria-hidden className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  {label}
                </span>
                <span className="block font-semibold wrap-break-word text-white">{value}</span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-slate-500 transition-colors group-hover:text-brand-bright"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin aria-hidden className="size-4 text-brand-bright" />
            Our office
          </p>
          <address className="mt-2 text-sm leading-relaxed text-slate-300 not-italic">
            {contactInfo.address}
          </address>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <Clock aria-hidden className="size-4 text-brand-bright" />
            Business hours
          </p>
          <dl className="mt-2 max-w-xs space-y-1 text-sm">
            {businessHours.map(([day, time]) => (
              <div key={day} className="flex justify-between gap-3 whitespace-nowrap">
                <dt className="text-slate-300">{day}</dt>
                <dd className="font-medium text-white">{time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
