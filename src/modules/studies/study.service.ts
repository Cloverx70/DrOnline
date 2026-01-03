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
        where: { id: uid, role: "doctor" },
      });
      if (!doctor) return NewResponse(404, "doctor not found");

      let patient = null;

      patient = await this.UserRepo.findOne({
        where: { id: pid, role: "patient" },
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
  async updateStudy(uid: string, sid: string, dto: updateStudyDto) {
    const doctor = await this.UserRepo.findOne({
      where: { id: uid, role: "doctor" },
    });

    if (!doctor) return NewResponse(404, "doctor not found");

    const study = await this.StudytRepo.findOne({
      where: { id: sid, doctor: { id: doctor.id } },
    });

    if (!study) return NewResponse(404, "study not found");

    study.title = dto.title;
    study.description = dto.description;
    study.instructions = dto.instructions;
    study.status = dto.status;
    study.dueDate = new Date(dto.dueDate);

    if (dto.patient) {
      study.patient = { id: dto.patient } as any;
    }

    try {
      await this.StudytRepo.save(study);
      return NewResponse(201, "study updated", study);
    } catch (error) {
      handleError(error);
    }
  }

  async DeleteStudy(sid: string) {
    try {
      const study = await this.StudytRepo.findOne({ where: { id: sid } });
      if (!study) return NewResponse(404, "Study not found");

      await this.StudytRepo.remove(study);
      return NewResponse(204, "Successfuly deleted study");
    } catch (error) {
      handleError(error);
    }
  }

  async getStudyById(sid: string) {
    try {
      const study = await this.StudytRepo.findOne({ where: { id: sid } });
      if (!study) return NewResponse(404, "Study not found");

      return NewResponse(200, "Success", study);
    } catch (error) {
      handleError(error);
    }
  }
}
