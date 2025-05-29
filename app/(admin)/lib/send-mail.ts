import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  })
);

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  interest?: string;
}) {
  const mailOptions = {
    from: process.env.SENDER_EMAIL!,
    to: process.env.RECEIVER_EMAIL!,
    subject: "New Response Submitted",
    text: `
------------------------------------------------------------
                New Contact Form Submission
------------------------------------------------------------

Name:     ${data.name}
Email:    ${data.email}
Phone:    ${data.phone}
Interest: ${data.interest || "none"}

Message:
${data.message?.trim() || "No message provided"}

------------------------------------------------------------
Submitted from your website contact form.
------------------------------------------------------------
    `,
  };

  await transporter.sendMail(mailOptions);
}
