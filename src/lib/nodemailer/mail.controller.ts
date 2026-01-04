import type { Request, Response } from "express";

import { patientMessageEmail } from "./EmailTemplates/PatientMessageEmail.template.js";
import { sendMail } from "./mail.service.js";

export const sendPatientMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, doctorEmail } = req.body;

    if (!name || !email || !subject || !message || !doctorEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendMail({
      to: doctorEmail,
      subject,
      html: patientMessageEmail({ name, email, subject, message }),
    });

    return res
      .status(201)
      .json({ message: "Message sent to doctor successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
};
