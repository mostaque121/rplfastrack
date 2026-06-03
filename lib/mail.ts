import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  }),
);

export async function sendInvoiceEmail(input: {
  to: string;
  invoiceNumber: string;
  qualification: string;
  pdfLink: string;
  pdfBuffer: Buffer;
  messageHtml?: string;
}) {
  if (!transporter) {
    throw new Error(
      "Mail transport is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, and MAIL_FROM.",
    );
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Add baseline styles for the email client here */
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; }
  </style>
</head>
<body>
  ${input.messageHtml || `<p>Dear Customer,</p><p>Please find attached the invoice for your recent purchase.</p><p>Best regards,<br/>RPL FastTrack Team</p>`}
</body>
</html>`;

  await transporter.sendMail({
    from: process.env.ADMIN_SENDER_EMAIL,
    to: input.to,
    subject: `Invoice for ${input.qualification}`,
    html,
    attachments: [
      {
        filename: `invoice-${input.invoiceNumber}.pdf`,
        content: input.pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}
