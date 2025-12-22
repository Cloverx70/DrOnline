import { NewResponse, handleError } from "../../lib/index.js";

import { AppDataSource } from "../../data-source.js";
import { Doctor } from "./doctor.entity.js";
import { Study } from "../studies/study.entity.js";
import { User } from "../auth/user.entity.js";

export class DoctorService {
  private DoctorRepo = AppDataSource.getRepository(Doctor);
  private UserRepo = AppDataSource.getRepository(User);
  private StudytRepo = AppDataSource.getRepository(Study);

  async getAllDoctors() {
    try {
      const doctors = await this.DoctorRepo.find({
        relations: ["user", "studies"],
      });

      return NewResponse(200, "Success", doctors);
    } catch (error) {
      handleError(error);
    }
  }

  async getDoctorById(id: string) {
    try {
      const doctor = await this.DoctorRepo.findOne({
        where: { id: id },
        relations: ["user", "studies"],
      });

      if (!doctor) return NewResponse(404, "doctor not found");

      const studies = await this.StudytRepo.find({
        where: { doctor: { id: doctor.user.id } },
      });

      doctor.studies = studies;

      return NewResponse(200, "Success", doctor);
    } catch (error) {
      handleError(error);
    }
  }

  async getAllPatients() {
    try {
      const patients = await this.UserRepo.find({ where: { role: "patient" } });
      console.log(patients);
      return NewResponse(200, "Success", patients);
    } catch (error) {
      handleError(error);
    }
  }
}
