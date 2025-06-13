import React from "react";

interface InvoiceData {
  name: string;
  email: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  course: string;
  price: number;
  amountPaid: number;
}

interface Props {
  data: InvoiceData;
}

const InvoicePreview: React.FC<Props> = ({ data }) => {
  const amountDue = data.price - data.amountPaid;

  return (
    <div className="bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white w-[794px] h-[1123px] p-10 flex flex-col justify-between shadow-md text-[14px]">
        {/* Header */}
        <div>
          <div className="flex justify-between items-start">
            <img src="/logo.png" alt="Logo" className="h-20 object-contain" />
            <div className="text-right">
              <h2 className="text-xl font-bold m-0">TAX INVOICE</h2>
              <p className="text-sm">ABN: 56627628166</p>
              <p className="mt-2 leading-tight text-sm">
                ITEC - International Training & Education Counsel
                <br />
                Suite 12, Level 1<br />
                87-89 Jones Street
                <br />
                Ultimo, New South Wales 2007
                <br />
                Australia
                <br />
                Mobile: 1300 535 922
                <br />
                www.itecounsel.com
              </p>
            </div>
          </div>

          {/* BILL TO & Invoice Info */}
          <div className="flex justify-between mt-8 border-t border-gray-300 pt-4">
            <div>
              <p className="font-bold text-sm">BILL TO</p>
              <p className="font-bold">{data.name}</p>
              <p>{data.email}</p>
            </div>

            <table className="text-sm">
              <tbody>
                <tr>
                  <td className="font-bold pr-2">Invoice Number:</td>
                  <td>{data.invoiceNumber}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Invoice Date:</td>
                  <td>{data.invoiceDate}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Payment Due:</td>
                  <td>{data.dueDate}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="mt-2 bg-gray-200 font-bold py-1 px-2">
                      Amount Due (AUD): ${amountDue.toFixed(2)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse mt-8 text-sm">
            <thead>
              <tr className="bg-[#7AC943] text-white">
                <th className="text-left p-2 font-medium">Items</th>
                <th className="text-right p-2 font-medium">Price</th>
                <th className="text-right p-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2">{data.course}</td>
                <td className="p-2 text-right">${data.price.toFixed(2)}</td>
                <td className="p-2 text-right">${data.price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="text-right mt-6 space-y-1 text-sm">
            <p>
              <strong>Total:</strong> ${data.price.toFixed(2)}
            </p>
            <p>Amount Paid (AUD): ${data.amountPaid.toFixed(2)}</p>
            <p>
              <strong>Amount Due (AUD):</strong> ${amountDue.toFixed(2)}
            </p>
          </div>

          {/* Notes & Terms */}
          <div className="mt-10 text-sm">
            <p className="font-bold">Notes / Terms</p>
            <p className="mt-2">
              <strong>Banking Details:</strong>
              <br />
              Account Name: Education Group Australia
              <br />
              BSB: 062339
              <br />
              Account number: 11059035
            </p>
            <p className="mt-2">
              Upon payment, customer agrees to ITEC terms and conditions
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-10">
          <p className="mb-2">GST Included</p>
          <p className="flex items-center justify-center gap-2">
            Powered by{" "}
            <img src="/fav.png" alt="Wave" className="h-4 inline-block" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
