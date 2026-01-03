import { AxiosInstace } from "@/constants";
import type { AxiosResponse } from "axios";
import type { IDoctor } from "./doctor";
import type { IStudy } from "./study";
import { handleError } from "@/lib/utils";

interface IAuthResponse {
  message: string;
  code: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  doctor?: IDoctor;
  receivedStudies?: IStudy[];
  email: string;
  password: string;
  role: "patient" | "doctor";
  createdAt: Date;
  updatedAt: Date;
}

export const Login = async (email: string, password: string) => {
  try {
    const res: AxiosResponse<IAuthResponse> = await AxiosInstace.post(
      "auth/login",
      {
        email,
        password,
      }
    );

    if (res.status !== 200)
      throw new Error(res.data.message || "invalid email or password");
  } catch (error) {
    handleError(error);
  }
};

export const Logout = async () => {
  try {
    const res: AxiosResponse<IAuthResponse> = await AxiosInstace.post(
      "auth/logout"
    );

    if (res.status !== 200)
      throw new Error(res.data.message || "Error logging out");
  } catch (error) {
    handleError(error);
  }
};

export const Register = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    const res: AxiosResponse<IAuthResponse> = await AxiosInstace.post(
      "auth/register",
      {
        firstname,
        lastname,
        username,
        email,
        password,
      }
    );

    if (res.status !== 201)
      throw new Error(
        res.data.message || "something went wrong while registering"
      );
  } catch (error) {
    handleError(error);
  }
};

export const GetStatus = async () => {
  try {
    const res: AxiosResponse = await AxiosInstace.get("auth/status", {
      withCredentials: true,
    });

    if (res.status !== 200) throw new Error("something went wrong");

    return res?.data;
  } catch (error) {
    handleError(error);
  }
};
