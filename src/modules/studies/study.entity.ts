import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import type { Doctor } from "../doctors/doctor.entity";
import { User } from "../auth/user.entity.js";

export enum StudyStatus {
  ASSIGNED = "assigned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  REVIEWED = "reviewed",
}

@Entity("studies")
export class Study {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.assignedStudies, { eager: true })
  doctor: User;

  @ManyToOne(() => User, (user) => user.receivedStudies, { eager: true })
  patient: User;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", nullable: true })
  instructions?: string;

  @Column({ nullable: true })
  attachmentUrl?: string;

  @Column({
    type: "enum",
    enum: StudyStatus,
    default: StudyStatus.ASSIGNED,
  })
  status: StudyStatus;

  @Column({ type: "timestamp", nullable: true })
  dueDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
