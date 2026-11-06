import { CheckCircle2, Phone } from "lucide-react";

import { contactInfo } from "@/config/contact";

const NEXT_STEPS = [
  "We look at your experience and the qualification you're after.",
  "We call you to talk through your options. It's free and there's no obligation.",
  "If RPL suits you, we help you put your evidence together.",
];

/** Shared "we've got it" state for the enquiry forms (hero card and home contact section). */
export function LeadSuccess({
  name,
  phone,
  onReset,
}: {
  name?: string;
  phone?: string;
  onReset: () => void;
}) {
  const firstName = name?.trim().split(/\s+/)[0];

  return (
    <div className="flex flex-col items-center py-2 text-center" role="status">
      <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-soft">
        <CheckCircle2 aria-hidden className="size-8 text-brand" />
      </span>
      <p className="text-xl font-bold text-ink">
        {firstName ? `Thanks ${firstName}, we've got it` : "Thanks, we've got it"}
      </p>
      <p className="mt-1.5 text-sm text-gray-600">
        An RPL expert will call you
        {phone ? (
          <>
            {" "}
            on <span className="font-semibold text-ink">{phone}</span>
          </>
        ) : null}{" "}
        soon, usually within one business day.
      </p>

      <ol className="mt-5 w-full space-y-2.5 text-left">
        {NEXT_STEPS.map((text, i) => (
          <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
              {i + 1}
            </span>
            {text}
          </li>
        ))}
      </ol>

      <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row">
        <a
          href={contactInfo.phoneHref}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 text-sm font-semibold text-ink hover:bg-gray-50"
        >
          <Phone aria-hidden className="size-4" />
          Can&apos;t wait? Call us
        </a>
        <button
          type="button"
          onClick={onReset}
          className="h-11 flex-1 cursor-pointer rounded-md text-sm font-medium text-brand-strong hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    </div>
  );
}
