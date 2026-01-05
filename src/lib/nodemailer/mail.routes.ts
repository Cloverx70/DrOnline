import { sendContactUsMessage, sendPatientMessage } from "./mail.controller.js";

import { Router } from "express";

const router = Router();

router.post("/patient-message", sendPatientMessage);
router.post("/contact-us", sendContactUsMessage);

export default router;
