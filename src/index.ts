import "./modules/auth/strategies/local.strategy.js";
import "./modules/auth/strategies/jwt.strategy.js";

import { AppDataSource } from "./data-source.js";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import doctorRoutes from "./modules/doctors/doctor.routes.js";
import dotenv from "dotenv";
import express from "express";
import mailRoutes from "./lib/nodemailer/mail.routes.js";
import passport from "passport";
import studyRoutes from "./modules/studies/study.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

AppDataSource.initialize().then(() => {
  console.log("🔥 TypeORM Data Source initialized");
});

app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/studies", studyRoutes);
app.use("/mail", mailRoutes);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
