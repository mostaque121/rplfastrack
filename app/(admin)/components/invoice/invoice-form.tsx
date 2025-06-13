/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import InvoicePDF from "./invoice-pdf";

interface InvoiceItem {
  description: string;
  price: number;
  amount: number;
}

interface InvoiceData {
  // Company details
  companyName: string;
  abn: string;
  address: string;
  mobile: string;
  website: string;

  // Bill to
  billToName: string;
  billToEmail: string;

  // Invoice details
  invoiceNumber: string;
  invoiceDate: string;
  paymentDue: string;
  amountDue: number;

  // Items
  items: InvoiceItem[];

  // Banking details
  bankingDetails: string;

  // Notes
  notes: string;

  // Totals
  total: number;
  amountPaid: number;
  finalAmountDue: number;
}

export default function InvoiceGenerator() {
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: "ITEC - International Training & Education Counsel",
    abn: "ABN: 50 625 622 105",
    address: "87-89 Jones Street\nUltimo, New South Wales 2007\nAustralia",
    mobile: "Mobile: 1300 535 922",
    website: "www.itecourselist.com",
    billToName: "Zadok KIPKEMOI",
    billToEmail: "ugztech@gmail.com",
    invoiceNumber: "28764",
    invoiceDate: "May 22, 2025",
    paymentDue: "June 22, 2025",
    amountDue: 1200.0,
    items: [
      {
        description:
          "CHC33021 - Certificate III in Individual Support (Ageing and Disability)",
        price: 1200.0,
        amount: 1200.0,
      },
    ],
    bankingDetails:
      "Banking Details:\nAccount Name: Education Group Australia\nBSB: 062320\nAccount Number: 11059035",
    notes: "Upon payment, customer agrees to ITEC terms and conditions",
    total: 1200.0,
    amountPaid: 350.0,
    finalAmountDue: 850.0,
  });

  const handleInputChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: any
  ) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", price: 0, amount: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={invoiceData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="abn">ABN</Label>
                    <Input
                      id="abn"
                      value={invoiceData.abn}
                      onChange={(e) => handleInputChange("abn", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={invoiceData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      id="mobile"
                      value={invoiceData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={invoiceData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bill To */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bill To</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="billToName">Name</Label>
                    <Input
                      id="billToName"
                      value={invoiceData.billToName}
                      onChange={(e) =>
                        handleInputChange("billToName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="billToEmail">Email</Label>
                    <Input
                      id="billToEmail"
                      type="email"
                      value={invoiceData.billToEmail}
                      onChange={(e) =>
                        handleInputChange("billToEmail", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Invoice Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Invoice Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) =>
                        handleInputChange("invoiceNumber", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoiceDate">Invoice Date</Label>
                    <Input
                      id="invoiceDate"
                      value={invoiceData.invoiceDate}
                      onChange={(e) =>
                        handleInputChange("invoiceDate", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentDue">Payment Due</Label>
                    <Input
                      id="paymentDue"
                      value={invoiceData.paymentDue}
                      onChange={(e) =>
                        handleInputChange("paymentDue", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="amountDue">Amount Due (AUD)</Label>
                    <Input
                      id="amountDue"
                      type="number"
                      step="0.01"
                      value={invoiceData.amountDue}
                      onChange={(e) =>
                        handleInputChange(
                          "amountDue",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Items</h3>
                  <Button onClick={addItem} size="sm">
                    Add Item
                  </Button>
                </div>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Item {index + 1}</span>
                      {invoiceData.items.length > 1 && (
                        <Button
                          onClick={() => removeItem(index)}
                          variant="destructive"
                          size="sm"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`description-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`price-${index}`}>Price</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "price",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`amount-${index}`}>Amount</Label>
                        <Input
                          id={`amount-${index}`}
                          type="number"
                          step="0.01"
                          value={item.amount}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "amount",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Totals</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="total">Total</Label>
                    <Input
                      id="total"
                      type="number"
                      step="0.01"
                      value={invoiceData.total}
                      onChange={(e) =>
                        handleInputChange(
                          "total",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="amountPaid">Amount Paid (AUD)</Label>
                    <Input
                      id="amountPaid"
                      type="number"
                      step="0.01"
                      value={invoiceData.amountPaid}
                      onChange={(e) =>
                        handleInputChange(
                          "amountPaid",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="finalAmountDue">
                      Final Amount Due (AUD)
                    </Label>
                    <Input
                      id="finalAmountDue"
                      type="number"
                      step="0.01"
                      value={invoiceData.finalAmountDue}
                      onChange={(e) =>
                        handleInputChange(
                          "finalAmountDue",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Banking Details and Notes */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bankingDetails">Banking Details</Label>
                  <Textarea
                    id="bankingDetails"
                    value={invoiceData.bankingDetails}
                    onChange={(e) =>
                      handleInputChange("bankingDetails", e.target.value)
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes / Terms</Label>
                  <Textarea
                    id="notes"
                    value={invoiceData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1"
                >
                  {showPreview ? "Hide Preview" : "Generate Preview"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PDF Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[800px] border rounded-lg overflow-hidden">
                  <PDFViewer width="100%" height="100%">
                    <InvoicePDF data={invoiceData} />
                  </PDFViewer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
