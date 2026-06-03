/**
 * lib/invoice.constants.ts
 *
 * Static company-level defaults.
 * Change your details here once; every form and PDF picks them up.
 */

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
  companyABN: "83 684 384 183",
  bankAccountName:
    process.env.NEXT_PUBLIC_DEFAULT_BANK_NAME || "Your Bank Name",
  bankBSB: process.env.NEXT_PUBLIC_DEFAULT_BANK_BSB || "012257",
  bankAccountNumber:
    process.env.NEXT_PUBLIC_DEFAULT_BANK_ACCOUNT_NUMBER || "669735113",
  extraNotes: "Please write your full name in the payment description.",
  gstIncluded: true,
  logoUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/invoice-logo.png`,
};
