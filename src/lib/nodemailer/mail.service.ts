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
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `"DrOnline" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      },
      (err, info) => {
        if (err) reject(err);
        resolve(info);
      }
    );
  });
};
