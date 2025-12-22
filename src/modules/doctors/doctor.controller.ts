import type { Request, Response } from "express";

import { DoctorService } from "./doctor.service.js";
import { handleError } from "../../lib/index.js";

const doctorService = new DoctorService();

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const response = await doctorService.getAllDoctors();

    return res
      .status(response?.code!)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await doctorService.getDoctorById(id!);

    return res
      .status(response?.code!)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const response = await doctorService.getAllPatients();
    return res
      .status(response?.code!)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};
