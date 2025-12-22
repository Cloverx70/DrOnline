import { DataSource } from "typeorm";
import { Doctor } from "./modules/doctors/doctor.entity.js";
import { Study } from "./modules/studies/study.entity.js";
import { User } from "./modules/auth/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT)!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: true,
  logging: false,
  entities: [User, Study, Doctor],
});
