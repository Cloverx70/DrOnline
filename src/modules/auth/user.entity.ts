import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Doctor } from "../doctors/doctor.entity.js";
import { Study } from "../studies/study.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Study, (study) => study.doctor)
  assignedStudies: Study[];

  @OneToMany(() => Study, (study) => study.patient)
  receivedStudies: Study[];

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["patient", "doctor"],
    default: "patient",
    nullable: false,
  })
  role: "patient" | "doctor";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
