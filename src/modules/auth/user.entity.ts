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

import { Study } from "../studies/study.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Study, (study) => study.doctor)
  assignedStudies: Study[];

  @OneToMany(() => Study, (study) => study.patient)
  receivedStudies: Study[];

  @Column({ type: "varchar" })
  firstname: string;

  @Column({ type: "varchar" })
  lastname: string;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
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
