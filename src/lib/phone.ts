/**
 * Formats an Australian phone number as E.164 (+61…) for the CRM.
 * The Lead row keeps what the visitor typed; only the CRM copy is normalised.
 * Anything that doesn't look Australian is returned trimmed but unchanged,
 * so overseas numbers aren't mangled.
 *
 *   "0412 345 678"    → "+61412345678"
 *   "(02) 9876 5432"  → "+61298765432"
 *   "61 412 345 678"  → "+61412345678"
 *   "+61 0412 345 678"→ "+61412345678"
 *   "412345678"       → "+61412345678"
 */
export function formatAuPhone(raw: string): string {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith("+");
  let digits = trimmed.replace(/\D/g, "");

  if (plus && !digits.startsWith("61")) return `+${digits}`; // another country
  if (!plus && digits.startsWith("0061")) digits = digits.slice(2);

  let national: string | undefined;
  if (digits.startsWith("61") && (digits.length === 11 || digits.length === 12)) {
    national = digits.slice(2).replace(/^0/, ""); // "+61 04…" → drop the trunk 0
  } else if (!plus && digits.length === 10 && digits.startsWith("0")) {
    national = digits.slice(1);
  } else if (!plus && digits.length === 9 && /^[23478]/.test(digits)) {
    national = digits; // trunk 0 left off
  }

  return national && national.length === 9 ? `+61${national}` : trimmed;
}
