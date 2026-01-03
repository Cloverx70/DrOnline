import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { AppDataSource } from "../../../data-source.js";
import { Doctor } from "../../doctors/doctor.entity.js";
import { User } from "../user.entity.js";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.chiah_token,
      ]),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (payload, done) => {
      try {
        const user = await AppDataSource.getRepository(User).findOne({
          where: { id: payload.id },
          select: [
            "id",
            "firstname",
            "lastname",
            "email",
            "username",
            "role",
            "createdAt",
            "updatedAt",
          ],
          relations: ["receivedStudies"],
        });

        if (!user) return done(null, false);

        if (user.role === "doctor") {
          const doctor = await AppDataSource.getRepository(Doctor).findOne({
            where: { user: { id: user.id } },
            relations: ["user"],
          });

          return done(null, { ...user, doctor });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
