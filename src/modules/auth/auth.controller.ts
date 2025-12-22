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
  const token = authService.generateJWT(req.user?.id);

  res.cookie("chiah_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "logged in successfully" });
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId! },
      select: [
        "id",
        "firstname",
        "lastname",
        "email",
        "username",
        "role",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "doctor") {
      const doctor = await AppDataSource.getRepository(Doctor).findOne({
        where: { user: { id: userId! } },
        relations: ["user"],
      });

      return res.json({ ...user, doctor });
    }
    res.json(user);
  } catch (error) {
    handleError(error);
  }
};
