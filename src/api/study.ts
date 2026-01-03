import { AxiosInstace } from "@/constants";
import type { AxiosResponse } from "axios";
import type { User } from "./auth";
import { handleError } from "@/lib/utils";

export const StudyStatus = {
  ASSIGNED: "assigned",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  REVIEWED: "reviewed",
} as const;

export type StudyStatus = (typeof StudyStatus)[keyof typeof StudyStatus];

export interface IStudy {
  id: string;
  doctor: User;
  patient: User;
  title: string;
  description: string;
  instructions?: string;
  attachmentUrl?: string;
  status: StudyStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudyResponse {
  data: IStudy;
  message: string;
  code: number;
}

export interface ICreateStudyDto {
  title: string;
  description: string;
  instructions?: string;
}

export interface IUpdateStudyDto {
  title: string;
  description: string;
  instructions?: string;
  patient: string;
  status: string;
}

export const createStudy = async (pid: string, studyDto: ICreateStudyDto) => {
  try {
    console.log(studyDto);
    const res = await AxiosInstace.post(`/studies/create/${pid}`, studyDto);

    if (res.status !== 201)
      throw new Error(res.data.message || "something went wrong");
  } catch (error) {
    handleError(error);
  }
};

export const UpdateStudy = async (sid: string, studyDto: IUpdateStudyDto) => {
  try {
    const res = await AxiosInstace.put(`/studies/update/${sid}`, studyDto);

    if (res.status !== 201)
      throw new Error(res.data.message || "something went wrong");
  } catch (error) {
    handleError(error);
  }
};

export const DeleteStudy = async (sid: string) => {
  try {
    const res = await AxiosInstace.delete(`/studies/delete/${sid}`);

    if (res.status !== 204)
      throw new Error(res.data.message || "something went wrong");
  } catch (error) {
    handleError(error);
  }
};

export const GetStudyById = async (sid: string) => {
  try {
    const res: AxiosResponse<IStudyResponse> = await AxiosInstace.get(
      `/studies/get/${sid}`
    );

    if (res.status !== 200)
      throw new Error(res.data.message || "something went wrong");

    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};
