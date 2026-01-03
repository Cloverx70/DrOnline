import type { Request, Response } from "express";

import { AppDataSource } from "../../data-source.js";
import { AuthService } from "./auth.service.js";
import { Doctor } from "../doctors/doctor.entity.js";
import { User } from "./user.entity.js";
import { handleError } from "./../../lib/index.js";
import { sendMail } from "../../lib/nodemailer/mail.service.js";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const response = await authService.register(req.body);

    return res.status(response?.code!).json({ message: response?.message });
  } catch (error) {
    handleError(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const user = req.user as any;

  const token = authService.generateJWT({
    id: user.id,
  });

  res.cookie("chiah_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ message: "logged in successfully" });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("chiah_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logged out" });
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as User;

    return res.status(200).json(user);
  } catch (error) {
    handleError(error);
  }
};
