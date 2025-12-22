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

  @Column({ nullable: true })
  pfpURL: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  yearsOfExperience?: number;

  @Column({ nullable: true })
  clinicName?: string;

  @OneToMany(() => Study, (study) => study.doctor)
  studies: Study[];

  @CreateDateColumn()
  createdAt: Date;
}
