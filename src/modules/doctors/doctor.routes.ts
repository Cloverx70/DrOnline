import {
  getAllDoctors,
  getAllPatients,
  getDoctorById,
} from "./doctor.controller.js";

import { Router } from "express";

const router = Router();

router.get("/all", getAllDoctors);
router.get("/get-all-patients", getAllPatients);
router.get("/:id", getDoctorById);

export default router;
