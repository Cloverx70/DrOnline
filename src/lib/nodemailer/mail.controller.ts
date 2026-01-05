import type { Request, Response } from "express";

import { contactUsEmail } from "./EmailTemplates/ContactUsEmail.Template.js";
import dotenv from "dotenv";
import { patientMessageEmail } from "./EmailTemplates/PatientMessageEmail.template.js";
import { sendMail } from "./mail.service.js";

dotenv.config();

export const sendPatientMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, to } = req.body;

    if (!name || !email || !subject || !message || !to) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendMail({
      to: to,
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

export const sendContactUsMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendMail({
      to: process.env.SUPPORT_EMAIL!,
      subject,
      html: contactUsEmail({ name, email, subject, message }),
    });

    return res
      .status(201)
      .json({ message: "Message sent to doctor successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
};
