import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  }),
);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableEmailError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeError = error as { message?: string; code?: string };
  const code = (maybeError.code || "").toUpperCase();
  const message = (maybeError.message || "").toLowerCase();

  if (code === "ECONNRESET" || code === "ETIMEDOUT" || code === "EAI_AGAIN") {
    return true;
  }

  return (
    message.includes("socket hang up") ||
    message.includes("timed out") ||
    message.includes("temporary")
  );
}

async function sendMailWithRetry(mailOptions: {
  from: string;
  to: string;
  subject: string;
  text: string;
}) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await transporter.sendMail(mailOptions);
      return;
    } catch (error) {
      const canRetry = attempt < maxAttempts && isRetryableEmailError(error);

      if (!canRetry) {
        throw error;
      }

      const delay = 500 * 2 ** (attempt - 1);
      console.warn(
        `[sendContactNotificationEmail] Attempt ${attempt} failed. Retrying in ${delay}ms.`,
      );
      await sleep(delay);
    }
  }
}

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

  if (process.env.NODE_ENV !== "development") {
    await sendMailWithRetry(mailOptions);
  }
}
