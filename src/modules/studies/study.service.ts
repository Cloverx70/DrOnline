import { NewResponse, handleError } from "../../lib/index.js";

import { AppDataSource } from "../../data-source.js";
import type { CreateStudyDto } from "../doctors/dtos/createStudy.dto.js";
import { Study } from "../studies/study.entity.js";
import { User } from "../auth/user.entity.js";
import { patientMessageEmail } from "../../lib/nodemailer/EmailTemplates/PatientMessageEmail.template.js";
import { sendMail } from "../../lib/nodemailer/mail.service.js";
import type { updateStudyDto } from "../doctors/dtos/updateStudy.dto.js";

export class StudyService {
  private UserRepo = AppDataSource.getRepository(User);
  private StudytRepo = AppDataSource.getRepository(Study);

  async createStudy(uid: string, pid: string, createStudyDto: CreateStudyDto) {
    try {
      const doctor = await this.UserRepo.findOne({
        where: { id: pid, role: "doctor" },
      });
      if (!doctor) return NewResponse(404, "doctor not found");

      let patient = null;

      patient = await this.UserRepo.findOne({
        where: { id: uid, role: "patient" },
      });
      console.log(uid);
      if (!patient) return NewResponse(404, "patient not found");

      const newStudy = this.StudytRepo.create({
        ...createStudyDto,
        patient,
        doctor,
      });

      await sendMail({
        to: patient.email,
        subject: createStudyDto.title,
        html: patientMessageEmail({
          name: patient.username,
          email: patient.email,
          subject: newStudy.title,
          message: newStudy.instructions!,
        }),
      });

      await this.StudytRepo.save(newStudy);

      return NewResponse(201, "study created successfully");
    } catch (error) {
      handleError(error);
    }
  }

  async updateStudy(uid: string, sid: string, updateStudyDto: updateStudyDto) {
    const doctor = await this.UserRepo.findOne({
      where: { id: uid, role: "doctor" },
    });

    if (!doctor) return NewResponse(404, "doctor not found");

    const study = await this.StudytRepo.preload({
      id: sid,
      doctor: { id: doctor.id },
      ...updateStudyDto,
    });

    if (!study) return NewResponse(404, "study not found");

    try {
      await this.StudytRepo.save(study);
      return NewResponse(200, "study updated", study);
    } catch (error) {
      handleError(error);
    }
  }
}
