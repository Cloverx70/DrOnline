import type { StudyStatus } from "../../studies/study.entity.js";

export class updateStudyDto {
  title: string;
  description: string;
  instructions: string;
  status: StudyStatus;
  patient: string;
  dueDate: Date;
}
