/**
 * components/invoice/InvoicePDF.tsx
 *
 * @react-pdf/renderer document.
 * Types come exclusively from lib/invoice.schema — never redefined here.
 */

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { InvoicePayload } from "../schema";

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "$" +
  n.toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Palette ───────────────────────────────────────────────────────────────────

const GREEN = "#2e7d32";
const LIGHT_GREEN = "#e8f5e9";
const DARK = "#1a1a1a";
const GREY = "#666666";
const LIGHT_GREY = "#f7f7f7";
const WHITE = "#ffffff";
const BORDER = "#e8e8e8";

// ── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: DARK,
    paddingTop: 40,
    paddingBottom: 52,
    paddingHorizontal: 44,
    backgroundColor: WHITE,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 50,
    objectFit: "contain",
    objectPositionX: "left",
    objectPositionY: "top",
  },
  logoBadge: {
    width: 110,
    height: 50,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  logoBadgeText: {
    color: GREEN,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  headerRight: { alignItems: "flex-end" },
  invoiceTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    letterSpacing: 2,
    marginBottom: 6,
  },
  companyName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    marginBottom: 3,
  },
  companyDetail: { fontSize: 8, color: GREY, marginBottom: 1.5 },

  // Divider
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginVertical: 14,
  },

  // Bill-to / Meta
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  billBlock: { flex: 1 },
  metaBlock: { width: 200 },
  billLabel: {
    fontSize: 7,
    color: GREY,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  billName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 2,
  },
  billEmail: { fontSize: 8, color: GREY },
  metaLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingVertical: 4.5,
  },
  metaKey: { fontSize: 8, color: GREY },
  metaVal: { fontSize: 8, color: DARK },
  amountDueBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
    marginTop: 5,
  },
  amountDueLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: GREEN },
  amountDueVal: { fontSize: 9, fontFamily: "Helvetica-Bold", color: GREEN },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 2,
  },
  thText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: WHITE },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowAlt: { backgroundColor: LIGHT_GREY },
  colItem: { flex: 5 },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 2, textAlign: "right" },
  colAmount: { flex: 2, textAlign: "right" },

  // Totals — Flex alignment exactly matching table columns above
  totalsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10, // Matches tableRow horizontal padding perfectly
    marginTop: 10,
    marginBottom: 18,
  },
  totalsSpacer: {
    flex: 6, // Skips exactly the width of colItem(5) + colQty(1)
  },
  totalsContent: {
    flex: 4, // Wraps exactly under colPrice(2) + colAmount(2)
  },
  totalRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  totalRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  totalRowGrand: {
    flexDirection: "row",
    paddingVertical: 6,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 3,
    marginTop: 4,
  },
  totalLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: DARK },
  totalVal: { fontSize: 9, color: DARK },
  grandLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: GREEN },
  grandVal: { fontSize: 9, fontFamily: "Helvetica-Bold", color: GREEN },

  // Notes
  notesBox: {
    backgroundColor: LIGHT_GREY,
    borderLeftWidth: 3,
    borderLeftColor: GREEN,
    padding: 11,
    borderRadius: 2,
    marginBottom: 14,
  },
  notesTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 6,
  },
  notesText: { fontSize: 9, color: DARK, marginBottom: 2, lineHeight: 1.5 },
  policyText: { fontSize: 9, color: GREY, marginBottom: 2, lineHeight: 1.5 },
  notesBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginTop: 5,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    alignItems: "center",
  },
  gstBadge: {
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  gstText: { fontSize: 7, color: GREEN, fontFamily: "Helvetica-Bold" },
});

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  invoice: InvoicePayload;
}

export function InvoicePDF({ invoice }: Props) {
  const hasAmountPaid = invoice.amountPaid > 0;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* HEADER */}
        <View style={s.header}>
          {invoice.logoUrl ? (
            <Image style={s.logo} src={invoice.logoUrl} />
          ) : (
            <View style={s.logoBadge}>
              <Text style={s.logoBadgeText}>{invoice.companyName}</Text>
            </View>
          )}
          <View style={s.headerRight}>
            <Text style={s.invoiceTitle}>INVOICE</Text>
            <Text style={s.companyName}>{invoice.companyName}</Text>
            <Text style={s.companyDetail}>{invoice.companyAddress}</Text>
            <Text style={s.companyDetail}>{invoice.companyCity}</Text>
            <Text style={s.companyDetail}>{invoice.companyCountry}</Text>
            <Text style={s.companyDetail}>Mobile: {invoice.companyMobile}</Text>
            <Text style={s.companyDetail}>{invoice.companyWebsite}</Text>
            {invoice.companyABN && invoice.companyABN.trim() && (
              <Text style={s.companyDetail}>ABN: {invoice.companyABN}</Text>
            )}
          </View>
        </View>

        <View style={s.divider} />

        {/* BILL TO + META */}
        <View style={s.metaRow}>
          <View style={s.billBlock}>
            <Text style={s.billLabel}>Bill To</Text>
            <Text style={s.billName}>{invoice.billToName}</Text>
            <Text style={s.billEmail}>{invoice.billToEmail}</Text>
          </View>
          <View style={s.metaBlock}>
            {(
              [
                { k: "Invoice Number:", v: invoice.invoiceNumber, bold: true },
                { k: "Invoice Date:", v: invoice.invoiceDate, bold: false },
                { k: "Payment Due:", v: invoice.paymentDue, bold: false },
              ] as const
            ).map(({ k, v, bold }) => (
              <View key={k} style={s.metaLine}>
                <Text style={s.metaKey}>{k}</Text>
                <Text
                  style={[
                    s.metaVal,
                    bold ? { fontFamily: "Helvetica-Bold" } : {},
                  ]}
                >
                  {v}
                </Text>
              </View>
            ))}
            <View style={s.amountDueBanner}>
              <Text style={s.amountDueLabel}>Amount Due (AUD):</Text>
              <Text style={s.amountDueVal}>{fmt(invoice.amountDue)}</Text>
            </View>
          </View>
        </View>

        {/* TABLE */}
        <View style={s.tableHeader}>
          <Text style={[s.thText, s.colItem]}>Items</Text>
          <Text style={[s.thText, s.colQty]}>Qty</Text>
          <Text style={[s.thText, s.colPrice]}>Price</Text>
          <Text style={[s.thText, s.colAmount]}>Amount</Text>
        </View>
        {invoice.items.map((item, i) => (
          <View key={i} style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
            <Text style={[s.colItem, { fontSize: 9, color: DARK }]}>
              {item.description}
            </Text>
            <Text style={[s.colQty, { fontSize: 9, color: GREY }]}>
              {item.quantity}
            </Text>
            <Text style={[s.colPrice, { fontSize: 9, color: GREY }]}>
              {fmt(item.price)}
            </Text>
            <Text style={[s.colAmount, { fontSize: 9, color: DARK }]}>
              {fmt(item.price * item.quantity)}
            </Text>
          </View>
        ))}

        {/* TOTALS */}
        <View style={s.totalsContainer}>
          <View style={s.totalsSpacer} />
          <View style={s.totalsContent}>
            {/* Total Row: gets border ONLY if no amount was paid */}
            <View style={[s.totalRow, !hasAmountPaid ? s.totalRowBorder : {}]}>
              <Text style={[s.colPrice, s.totalLabel]}>Total:</Text>
              <Text style={[s.colAmount, s.totalVal]}>
                {fmt(invoice.totalAmount)}
              </Text>
            </View>

            {/* Amount Paid Row: gets border permanently when rendered */}
            {hasAmountPaid && (
              <View style={[s.totalRow, s.totalRowBorder]}>
                <Text style={[s.colPrice, s.totalLabel]}>Amount Paid:</Text>
                <Text style={[s.colAmount, s.totalVal]}>
                  -{fmt(invoice.amountPaid)}
                </Text>
              </View>
            )}

            {/* Grand Total Banner */}
            <View style={s.totalRow}>
              <Text style={[s.colPrice, s.totalLabel]}>Amount Due (AUD):</Text>
              <Text style={[s.colAmount, s.totalLabel]}>
                {fmt(invoice.amountDue)}
              </Text>
            </View>
          </View>
        </View>

        {/* NOTES */}
        <View style={s.notesBox}>
          <Text style={s.notesTitle}>Notes / Terms</Text>
          <Text style={s.notesText}>Banking Details:</Text>
          <Text style={s.notesText}>
            Account Name: {invoice.bankAccountName}
          </Text>
          <Text style={s.notesText}>BSB: {invoice.bankBSB}</Text>
          <Text style={s.notesText}>
            Account number: {invoice.bankAccountNumber}
          </Text>
          {invoice.extraNotes && (
            <Text style={s.notesBold}>{invoice.extraNotes}</Text>
          )}
          <Text style={[s.policyText, { marginTop: 7, fontStyle: "italic" }]}>
            Upon payment, customer agrees to {invoice.companyName} terms and
            conditions
          </Text>
        </View>

        {/* FOOTER */}
        <View style={s.footer}>
          {invoice.gstIncluded && (
            <View style={s.gstBadge}>
              <Text style={s.gstText}>GST Included</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
