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
      console.log("no dcotor email");
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
