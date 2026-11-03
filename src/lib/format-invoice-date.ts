import { format } from "date-fns";

export function formatInvoiceDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return String(value);
  }

  return format(date, "dd MMMM yyyy");
}
