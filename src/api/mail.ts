import { AxiosInstace } from "@/constants";
import { handleError } from "@/lib/utils";
import { type AxiosResponse } from "axios";

export const SendPatientMessage = async (
  name: string,
  email: string,
  subject: string,
  message: string,
  doctorEmail: string
) => {
  try {
    if (!doctorEmail) {
      return;
    }

    const res: AxiosResponse = await AxiosInstace.post(
      "/mail/patient-message",
      {
        name,
        email,
        subject,
        message,
        doctorEmail,
      },
      { withCredentials: true }
    );

    if (res.status !== 201)
      throw new Error(res.data.message || "something wrong happened");
  } catch (error) {
    handleError(error);
  }
};

export const SendContactUsMessage = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    const res: AxiosResponse = await AxiosInstace.post("/mail/contact-us", {
      name,
      email,
      subject,
      message,
    });

    if (res.status !== 201)
      throw new Error(res.data.message || "something wrong happened");
  } catch (error) {
    handleError(error);
  }
};
