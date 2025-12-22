import {
  getAllDoctors,
  getAllPatients,
  getDoctorById,
} from "./doctor.controller.js";

import { Router } from "express";

const router = Router();

router.get("/all", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/get-all-patients", getAllPatients);

export default router;
