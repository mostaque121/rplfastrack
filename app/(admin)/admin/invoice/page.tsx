import InvoiceGenerator from "../../components/invoice/invoice-form";
import InvoicePreview from "../../components/invoice/InvoicePreview";

export default function Page() {
  return (
    <div>
      <InvoicePreview
        data={{
          name: "Zadok KIPKEMOI",
          email: "ugshedz@gmail.com",
          invoiceNumber: "28764",
          invoiceDate: "May 22, 2025",
          dueDate: "June 22, 2025",
          course:
            "CHC33021 - Certificate III in Individual Support (Ageing and Disability)",
          price: 1200,
          amountPaid: 350,
        }}
      />
      <InvoiceGenerator />
    </div>
  );
}
