import { NewResponse, handleError } from "../../lib/index.js";
import type { Request, Response } from "express";

import { StudyService } from "./study.service.js";

const studyService = new StudyService();

export const createStudyController = async (req: Request, res: Response) => {
  try {
    const uid = req.params.did;
    const pid = req.params.pid;
    const createStudyDto = req.body;
    console.log(uid, pid);
    if (!uid || !pid) return NewResponse(401, "uid and sid are required");

    const response = await studyService.createStudy(uid, pid, createStudyDto);

    return res
      .status(response!.code)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};

export const updateStudyController = async (req: Request, res: Response) => {
  try {
    const uid = req.params.did; // doctor id
    const sid = req.params.sid; // study id
    const updateStudyDto = req.body;

    if (!uid || !sid) return NewResponse(401, "uid and sid are required");

    const response = await studyService.updateStudy(uid, sid, updateStudyDto);

    return res
      .status(response!.code)
      .json({ message: response?.message, data: response?.data });
  } catch (error) {
    handleError(error);
  }
};
