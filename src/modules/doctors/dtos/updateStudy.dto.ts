import type { StudyStatus } from "../../studies/study.entity.js";

export class updateStudyDto {
  title: string;
  description: string;
  instructions?: string;
  attachmentUrl?: string;
  status: StudyStatus;
}
