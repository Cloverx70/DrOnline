import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

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
      done(null, { id: payload.id });
    }
  )
);

export default passport;
