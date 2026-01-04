import { NewResponse, handleError } from "../../lib/index.js";
import type { Request, Response } from "express";

import { StudyService } from "./study.service.js";

const studyService = new StudyService();

export const createStudyController = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.id;
    const patientId = req.params.pid;
    const createStudyDto = req.body;

    if (!uid || !patientId)
      return res.status(401).json(NewResponse(401, "uid and sid are required"));

    const response = await studyService.createStudy(
      uid,
      patientId,
      createStudyDto
    );

    return res
      .status(response!.code)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};

export const deleteStudyController = async (req: Request, res: Response) => {
  try {
    const sid = req.params.sid;

    if (!sid) return res.status(401).json({ message: "Study id required" });

    const response = await studyService.DeleteStudy(sid);

    return res
      .status(response!.code)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};

export const updateStudyController = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.id!;
    const sid = req.params.sid;
    const updateStudyDto = req.body;

    if (!sid) return NewResponse(401, "uid and sid are required");

    const response = await studyService.updateStudy(uid, sid, updateStudyDto);

    return res
      .status(response!.code)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};

export const getStudyById = async (req: Request, res: Response) => {
  try {
    const sid = req.params.sid; // study id

    if (!sid) return NewResponse(401, "sid is required");

    const response = await studyService.getStudyById(sid);

    return res
      .status(response!.code)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};
