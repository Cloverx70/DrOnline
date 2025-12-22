export const patientMessageEmail = ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Patient Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;"
          >
            <tr>
              <td style="background:#2563eb;padding:20px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;font-size:22px;">
                  New Patient Message
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:25px;">
                <p style="font-size:15px;color:#333;margin-bottom:15px;">
                  You have received a new message from a patient.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                  <tr>
                    <td style="padding:8px 0;color:#555;"><strong>Name:</strong></td>
                    <td style="padding:8px 0;color:#333;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#555;"><strong>Email:</strong></td>
                    <td style="padding:8px 0;color:#333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#555;"><strong>Subject:</strong></td>
                    <td style="padding:8px 0;color:#333;">${subject}</td>
                  </tr>
                </table>

                <div
                  style="background:#f1f5f9;border-radius:6px;padding:15px;color:#333;font-size:14px;line-height:1.6;"
                >
                  ${message.replace(/\n/g, "<br />")}
                </div>
              </td>
            </tr>

            <tr>
              <td style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#777;">
                This message was sent via DrOnline platform.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
