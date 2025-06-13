"use client";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type React from "react";

interface InvoiceItem {
  description: string;
  price: number;
  amount: number;
}

interface InvoiceData {
  companyName: string;
  abn: string;
  address: string;
  mobile: string;
  website: string;
  billToName: string;
  billToEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  paymentDue: string;
  amountDue: number;
  items: InvoiceItem[];
  bankingDetails: string;
  notes: string;
  total: number;
  amountPaid: number;
  finalAmountDue: number;
}

const emerald = "#059669"; // emerald-600

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: emerald,
    borderRadius: 40,
  },
  taxInvoiceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
    marginBottom: 6,
  },
  companyDetails: {
    fontSize: 9,
    textAlign: "right",
    lineHeight: 1.4,
    color: "#333333",
  },
  billToSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  billTo: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  billToLabel: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#555",
  },
  invoiceDetails: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: "right",
  },
  invoiceDetailsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3,
  },
  invoiceDetailsLabel: {
    width: 100,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 10,
    color: "#444",
  },
  invoiceDetailsValue: {
    width: 80,
    textAlign: "right",
  },
  table: {
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: emerald,
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tableHeaderCell: {
    flex: 1,
  },
  tableHeaderCellPrice: {
    width: 90,
    textAlign: "right",
  },
  tableHeaderCellAmount: {
    width: 90,
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.6,
    borderBottomColor: "#cccccc",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 9,
  },
  tableCell: {
    flex: 1,
  },
  tableCellPrice: {
    width: 90,
    textAlign: "right",
  },
  tableCellAmount: {
    width: 90,
    textAlign: "right",
  },
  totalsSection: {
    alignItems: "flex-end",
    marginTop: 20,
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: "row",
    fontSize: 10,
    marginBottom: 4,
  },
  totalLabel: {
    width: 120,
    textAlign: "right",
    marginRight: 10,
    color: "#000",
  },
  totalValue: {
    width: 90,
    textAlign: "right",
    fontWeight: "bold",
  },
  finalAmountDue: {
    flexDirection: "row",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 6,
  },
  notesSection: {
    marginTop: 10,
    fontSize: 9,
    lineHeight: 1.5,
  },
  notesTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
  },
  gstIncluded: {
    textAlign: "center",
    fontSize: 9,
    marginBottom: 6,
    fontWeight: "bold",
  },
  poweredBy: {
    fontSize: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
});

interface InvoicePDFProps {
  data: InvoiceData;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoPlaceholder} />
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.taxInvoiceTitle}>TAX INVOICE</Text>
          <Text style={styles.companyDetails}>{data.abn}</Text>
          <Text style={styles.companyDetails}>{data.companyName}</Text>
          {data.address.split("\n").map((line, index) => (
            <Text style={styles.companyDetails} key={index}>
              {line}
            </Text>
          ))}
          <Text style={styles.companyDetails}>{data.mobile}</Text>
          <Text style={styles.companyDetails}>{data.website}</Text>
        </View>
      </View>

      {/* Billing Section */}
      <View style={styles.billToSection}>
        <View>
          <Text style={styles.billToLabel}>BILL TO:</Text>
          <Text style={styles.billTo}>{data.billToName}</Text>
          <Text style={styles.billTo}>{data.billToEmail}</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceDetailsRow}>
            <Text style={styles.invoiceDetailsLabel}>Invoice Number:</Text>
            <Text style={styles.invoiceDetailsValue}>{data.invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceDetailsRow}>
            <Text style={styles.invoiceDetailsLabel}>Invoice Date:</Text>
            <Text style={styles.invoiceDetailsValue}>{data.invoiceDate}</Text>
          </View>
          <View style={styles.invoiceDetailsRow}>
            <Text style={styles.invoiceDetailsLabel}>Payment Due:</Text>
            <Text style={styles.invoiceDetailsValue}>{data.paymentDue}</Text>
          </View>
          <View style={styles.invoiceDetailsRow}>
            <Text style={styles.invoiceDetailsLabel}>Amount Due (AUD):</Text>
            <Text style={styles.invoiceDetailsValue}>
              ${data.amountDue.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Items</Text>
          <Text style={styles.tableHeaderCellPrice}>Price</Text>
          <Text style={styles.tableHeaderCellAmount}>Amount</Text>
        </View>
        {data.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCellPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.tableCellAmount}>
              ${item.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${data.total.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Amount Paid (AUD):</Text>
          <Text style={styles.totalValue}>${data.amountPaid.toFixed(2)}</Text>
        </View>
        <View style={styles.finalAmountDue}>
          <Text style={styles.totalLabel}>Amount Due (AUD):</Text>
          <Text style={styles.totalValue}>
            ${data.finalAmountDue.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Notes */}
      <View style={styles.notesSection}>
        <Text style={styles.notesTitle}>Notes / Terms</Text>
        <Text>{data.bankingDetails}</Text>
        <Text style={{ marginTop: 8 }}>{data.notes}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.gstIncluded}>GST Included</Text>
        <View style={styles.poweredBy}>
          <Text>Powered by </Text>
          <Text style={{ fontWeight: "bold" }}>wave</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
