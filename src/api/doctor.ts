import { AxiosInstace } from "@/constants";
import type { AxiosResponse } from "axios";
import type { IStudy } from "./study";
import type { User } from "./auth";
import { handleError } from "@/lib/utils";

interface IDoctor {
  id: string;
  user: User;
  pfpURL: string;
  specialization: string;
  bio?: string;
  yearsOfExperience?: number;
  clinicName?: string;
  studies: IStudy[];
  createdAt: Date;
}

interface IDoctorsResponse {
  data: IDoctor[];
  message: string;
  code: number;
}

interface IDoctorResponse {
  data: IDoctor;
  message: string;
  code: number;
}
interface IAuthResponse {
  message: string;
  data: User[];
  code: string;
}

export const GetAllDoctors = async () => {
  try {
    const res: AxiosResponse<IDoctorsResponse> = await AxiosInstace.get(
      "doctor/all"
    );

    if (res.status !== 200)
      throw new Error(res.data.message || "something wrong happened");

    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetDoctorById = async (did: string) => {
  try {
    const res: AxiosResponse<IDoctorResponse> = await AxiosInstace.get(
      `/doctor/${did}`
    );

    if (res.status !== 200)
      throw new Error(res.data.message || "something wrong happened");

    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetAllPatients = async () => {
  try {
    const res: AxiosResponse<IAuthResponse> = await AxiosInstace.get(
      `/doctor/get-all-patients`
    );

    if (res.status !== 200)
      throw new Error(res.data.message || "something went wrong");
    return res.data.data;
  } catch (error) {
    handleError(error);
  }
};
