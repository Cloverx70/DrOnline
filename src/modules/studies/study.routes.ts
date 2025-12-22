// src/modules/doctors/study.routes.ts

import {
  createStudyController,
  updateStudyController,
} from "./study.controller.js";

import { Router } from "express";

const router = Router();

router.post("/create/:did/:pid", createStudyController);
router.put("/update/:did/:sid", updateStudyController);

export default router;
