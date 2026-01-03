import { getStatus, login, logout, register } from "./auth.controller.js";

import { Router } from "express";
import passport from "passport";
import { registerDto } from "./dtos/register.dto.js";
import { validateDto } from "../../validators/validateDto.js";

const router = Router();

router.post("/register", validateDto(registerDto), register);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.post("/logout", logout);

router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  getStatus
);

export default router;
