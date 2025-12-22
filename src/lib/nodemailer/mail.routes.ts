import { Router } from "express";
import { sendPatientMessage } from "./mail.controller.js";

const router = Router();

router.post("/patient-message", sendPatientMessage);

export default router;
