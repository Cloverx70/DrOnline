import { AuthService } from "../auth.service.js";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";

const authService = new AuthService();

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await authService.validate({ email, password });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
