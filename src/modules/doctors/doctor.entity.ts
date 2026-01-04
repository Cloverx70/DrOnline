import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Study } from "../studies/study.entity.js";
import { User } from "../auth/user.entity.js";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ nullable: true, type: "varchar" })
  pfpURL: string;

  @Column({ type: "varchar" })
  specialization: string;

  @Column({ nullable: true, type: "varchar" })
  bio?: string;

  @Column({ nullable: true, type: "int" })
  yearsOfExperience?: number;

  @Column({ nullable: true, type: "varchar" })
  clinicName?: string;

  @OneToMany(() => Study, (study) => study.doctor)
  studies: Study[];

  @CreateDateColumn()
  createdAt: Date;
}
