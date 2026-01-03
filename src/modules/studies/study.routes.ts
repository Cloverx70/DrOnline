// src/modules/doctors/study.routes.ts

import {
  createStudyController,
  deleteStudyController,
  getStudyById,
  updateStudyController,
} from "./study.controller.js";

import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/create/:pid",
  passport.authenticate("jwt", { session: false }),
  createStudyController
);
router.put(
  "/update/:sid",
  passport.authenticate("jwt", { session: false }),
  updateStudyController
);
router.get("/get/:sid", getStudyById);

router.delete("/delete/:sid", deleteStudyController);

export default router;
