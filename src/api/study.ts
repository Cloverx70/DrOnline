import { AxiosInstace } from "@/constants";
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

export interface ICreateStudyDto {
  patientId: string;
  title: string;
  description: string;
  instructions?: string;
}

export interface IUpdateStudyDto {
  studyId: string;
  title: string;
  description: string;
  instructions?: string;
}

export const createStudy = async (did: string, studyDto: ICreateStudyDto) => {
  try {
    const res = await AxiosInstace.post(
      `/studies/create/${studyDto.patientId}/${did}`,
      studyDto
    );

    if (res.status !== 201)
      throw new Error(res.data.message || "something went wrong");
  } catch (error) {
    handleError(error);
  }
};

export const UpdateStudy = async (did: string, studyDto: IUpdateStudyDto) => {
  try {
    const res = await AxiosInstace.put(
      `/studies/update/${studyDto.studyId}/${did}`,
      studyDto
    );

    if (res.status !== 201)
      throw new Error(res.data.message || "something went wrong");
  } catch (error) {
    handleError(error);
  }
};
