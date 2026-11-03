/**
 * lib/invoice.constants.ts
 *
 * Static company-level defaults.
 * Change your details here once; every form and PDF picks them up.
 */

import { absoluteUrl } from "@/lib/url";
import type { InvoiceFormValues } from "./schema";

export const COMPANY_DEFAULTS: Pick<
  InvoiceFormValues,
  | "companyName"
  | "companyAddress"
  | "companyCity"
  | "companyCountry"
  | "companyMobile"
  | "companyWebsite"
  | "companyABN"
  | "bankAccountName"
  | "bankBSB"
  | "bankAccountNumber"
  | "extraNotes"
  | "gstIncluded"
  | "logoUrl"
> = {
  companyName: "RPL Fast Track",
  companyAddress: "41 HiltonWay, Melton West",
  companyCity: "Melbourne, VIC 3337",
  companyCountry: "Australia",
  companyMobile: "+61 483 921 139",
  companyWebsite: "www.rplfastrack.com",
  companyABN: "67 700 873 632",
  bankAccountName: "Fast Track Group Australia Pty Ltd",
  bankBSB: "033121",
  bankAccountNumber: "754088",
  extraNotes: "Please write your full name in the payment description.",
  gstIncluded: true,
  logoUrl: absoluteUrl("/invoice-logo.png"),
};
