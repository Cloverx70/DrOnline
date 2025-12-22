import { transporter } from "./mailer.js";

export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({
    from: `"DrOnline" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
